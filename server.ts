import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { EXAMS_SEED_DATA, CURRENT_AFFAIRS_DATA, NOTIFICATIONS_DATA } from './src/data/examsData';
import { Exam, NotificationItem, StudyPlan, Quiz, ApplicationTracker } from './src/types';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'MOCK_KEY',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// JSON parsing middleware (increase limits for potential image/PDF uploads)
app.use(express.json({ limit: '50mb' }));

// File-based state management
const DB_FILE = path.join(process.cwd(), 'data_db.json');

const JWT_SECRET = process.env.JWT_SECRET || 'examverse_secret_key_2026_super_secure';

interface UserDBRecord {
  id: string;
  fullName: string;
  email: string;
  mobileNumber?: string;
  passwordHash: string;
  country: string;
  state: string;
  qualification: string;
  preferredCategory: string;
  role: 'student' | 'admin';
  isVerified: boolean;
  verificationToken?: string | null;
  resetToken?: string | null;
  resetTokenExpires?: number | null;
  createdAt: string;
  profilePicture?: string;
  preferences?: {
    darkMode?: boolean;
    notificationsEnabled?: boolean;
  };
  bookmarks?: string[];
  trackers?: ApplicationTracker[];
  studyPlans?: StudyPlan[];
  quizzes?: Quiz[];
}

interface LocalDB {
  exams: Exam[];
  notifications: NotificationItem[];
  bookmarks: string[];
  trackers: ApplicationTracker[];
  studyPlans: StudyPlan[];
  quizzes: Quiz[];
  users: UserDBRecord[];
}

function loadDB(): LocalDB {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(data) as LocalDB;
      let modified = false;

      // Ensure users array exists
      if (!parsed.users) {
        parsed.users = [];
        modified = true;
      }

      // Automatically sync any missing seed exams
      if (parsed && Array.isArray(parsed.exams)) {
        EXAMS_SEED_DATA.forEach(seed => {
          if (!parsed.exams.some((e) => e.id === seed.id)) {
            parsed.exams.push(seed);
            modified = true;
          }
        });
      }

      // Automatically sync any missing notifications
      if (parsed && Array.isArray(parsed.notifications)) {
        NOTIFICATIONS_DATA.forEach(notif => {
          if (!parsed.notifications.some((n) => n.id === notif.id)) {
            parsed.notifications.unshift(notif);
            modified = true;
          }
        });
      }

      if (modified) {
        try {
          fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
        } catch (saveErr) {
          console.error('Failed to auto-update DB file:', saveErr);
        }
      }

      return parsed;
    }
  } catch (err) {
    console.error('Failed to read database, using default seeds:', err);
  }
  return {
    exams: EXAMS_SEED_DATA,
    notifications: NOTIFICATIONS_DATA,
    bookmarks: [],
    trackers: [],
    studyPlans: [],
    quizzes: [],
    users: [],
  };
}

function saveDB(db: LocalDB) {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save database:', err);
  }
}

// Initialize database
let db = loadDB();

// ----------------------------------------------------
// AUTHENTICATION MIDDLEWARE & HELPERS
// ----------------------------------------------------
function authenticateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired authentication token' });
    }
    (req as any).user = decoded;
    next();
  });
}

function getOptionalUser(req: express.Request): UserDBRecord | null {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    const user = db.users?.find(u => u.id === decoded.id);
    return user || null;
  } catch (err) {
    return null;
  }
}


// ----------------------------------------------------
// EXAMS CRUD API
// ----------------------------------------------------
app.get('/api/exams', (req, res) => {
  res.json(db.exams);
});

app.get('/api/exams/:id', (req, res) => {
  const exam = db.exams.find((e) => e.id === req.params.id);
  if (exam) {
    res.json(exam);
  } else {
    res.status(404).json({ error: 'Exam not found' });
  }
});

app.post('/api/exams', (req, res) => {
  const newExam: Exam = req.body;
  if (!newExam.id || !newExam.name) {
    return res.status(400).json({ error: 'Missing required exam fields (id, name)' });
  }
  db.exams.push(newExam);
  saveDB(db);
  res.status(201).json(newExam);
});

app.put('/api/exams/:id', (req, res) => {
  const index = db.exams.findIndex((e) => e.id === req.params.id);
  if (index !== -1) {
    db.exams[index] = { ...db.exams[index], ...req.body };
    saveDB(db);
    res.json(db.exams[index]);
  } else {
    res.status(404).json({ error: 'Exam not found' });
  }
});

app.delete('/api/exams/:id', (req, res) => {
  const index = db.exams.findIndex((e) => e.id === req.params.id);
  if (index !== -1) {
    const deleted = db.exams.splice(index, 1);
    saveDB(db);
    res.json({ success: true, deleted: deleted[0] });
  } else {
    res.status(404).json({ error: 'Exam not found' });
  }
});

// ----------------------------------------------------
// NOTIFICATIONS API
// ----------------------------------------------------
app.get('/api/notifications', (req, res) => {
  res.json(db.notifications);
});

app.post('/api/notifications', (req, res) => {
  const newNotif: NotificationItem = {
    id: 'notif-' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    ...req.body,
  };
  db.notifications.unshift(newNotif);
  saveDB(db);
  res.status(201).json(newNotif);
});

// ----------------------------------------------------
// CURRENT AFFAIRS API
// ----------------------------------------------------
app.get('/api/current-affairs', (req, res) => {
  res.json(CURRENT_AFFAIRS_DATA);
});

// ----------------------------------------------------
// AUTHENTICATION APIs
// ----------------------------------------------------
app.post('/api/auth/register', (req, res) => {
  const { fullName, email, mobileNumber, password, country, state, qualification, preferredCategory } = req.body;

  if (!fullName || !email || !password || !country || !state || !qualification || !preferredCategory) {
    return res.status(400).json({ error: 'All fields except mobile number are required' });
  }

  const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ error: 'An account with this email address already exists' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const isVerified = false;
  const verificationToken = crypto.randomBytes(32).toString('hex');

  // Bootstrapped Admin
  const role = email.toLowerCase() === 'laxmipriyamarndi21@gmail.com' ? 'admin' : 'student';

  const newUser: UserDBRecord = {
    id: 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
    fullName,
    email,
    mobileNumber,
    passwordHash,
    country,
    state,
    qualification,
    preferredCategory,
    role,
    isVerified,
    verificationToken,
    createdAt: new Date().toISOString(),
    bookmarks: [],
    trackers: [],
    studyPlans: [],
    quizzes: []
  };

  db.users.push(newUser);
  saveDB(db);

  // Exclude passwordHash in response
  const { passwordHash: _, ...profile } = newUser;
  res.status(201).json({
    user: profile,
    verificationToken,
    message: 'Registration successful! Verification token generated.'
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid email address or password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  const { passwordHash: _, ...profile } = user;

  res.json({
    user: profile,
    token
  });
});

app.post('/api/auth/google', (req, res) => {
  const { email, fullName, profilePicture } = req.body;
  if (!email || !fullName) {
    return res.status(400).json({ error: 'Google email and name are required' });
  }

  let user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    // Auto register google user
    const role = email.toLowerCase() === 'laxmipriyamarndi21@gmail.com' ? 'admin' : 'student';
    user = {
      id: 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      fullName,
      email,
      passwordHash: bcrypt.hashSync(crypto.randomBytes(16).toString('hex'), 10), // Random password
      country: 'India',
      state: 'Delhi',
      qualification: 'Graduate',
      preferredCategory: 'UPSC',
      role,
      isVerified: true, // Google accounts are auto-verified
      createdAt: new Date().toISOString(),
      profilePicture,
      bookmarks: [],
      trackers: [],
      studyPlans: [],
      quizzes: []
    };
    db.users.push(user);
    saveDB(db);
  } else if (profilePicture && !user.profilePicture) {
    user.profilePicture = profilePicture;
    saveDB(db);
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  const { passwordHash: _, ...profile } = user;

  res.json({
    user: profile,
    token
  });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const userId = (req as any).user.id;
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User session not found' });
  }
  const { passwordHash: _, ...profile } = user;
  res.json(profile);
});

app.post('/api/auth/verify-email', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Verification token is required' });
  }

  const user = db.users.find(u => u.verificationToken === token);
  if (!user) {
    return res.status(400).json({ error: 'Invalid or expired verification token' });
  }

  user.isVerified = true;
  user.verificationToken = null;
  saveDB(db);

  const { passwordHash: _, ...profile } = user;
  res.json({
    success: true,
    message: 'Email verified successfully!',
    user: profile
  });
});

app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'No account found with this email' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  user.resetTokenExpires = Date.now() + 3600000; // 1 hour
  saveDB(db);

  res.json({
    success: true,
    message: 'Reset link generated! For development, use this reset token.',
    resetToken
  });
});

app.post('/api/auth/reset-password', (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  const user = db.users.find(u => u.resetToken === token && u.resetTokenExpires && u.resetTokenExpires > Date.now());
  if (!user) {
    return res.status(400).json({ error: 'Invalid or expired password reset token' });
  }

  user.passwordHash = bcrypt.hashSync(password, 10);
  user.resetToken = null;
  user.resetTokenExpires = null;
  saveDB(db);

  res.json({
    success: true,
    message: 'Password has been reset successfully'
  });
});

app.put('/api/auth/profile', authenticateToken, (req, res) => {
  const userId = (req as any).user.id;
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { fullName, mobileNumber, country, state, qualification, preferredCategory, profilePicture, preferences } = req.body;

  if (fullName) user.fullName = fullName;
  if (mobileNumber !== undefined) user.mobileNumber = mobileNumber;
  if (country) user.country = country;
  if (state) user.state = state;
  if (qualification) user.qualification = qualification;
  if (preferredCategory) user.preferredCategory = preferredCategory;
  if (profilePicture !== undefined) user.profilePicture = profilePicture;
  if (preferences) user.preferences = { ...user.preferences, ...preferences };

  saveDB(db);

  const { passwordHash: _, ...profile } = user;
  res.json(profile);
});

app.post('/api/auth/change-password', authenticateToken, (req, res) => {
  const userId = (req as any).user.id;
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new passwords are required' });
  }

  if (!bcrypt.compareSync(currentPassword, user.passwordHash)) {
    return res.status(400).json({ error: 'Incorrect current password' });
  }

  user.passwordHash = bcrypt.hashSync(newPassword, 10);
  saveDB(db);

  res.json({ success: true, message: 'Password changed successfully' });
});

app.delete('/api/auth/delete-account', authenticateToken, (req, res) => {
  const userId = (req as any).user.id;
  const index = db.users.findIndex(u => u.id === userId);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  db.users.splice(index, 1);
  saveDB(db);

  res.json({ success: true, message: 'Account deleted successfully' });
});

app.get('/api/auth/export-data', authenticateToken, (req, res) => {
  const userId = (req as any).user.id;
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { passwordHash: _, verificationToken: __, resetToken: ___, resetTokenExpires: ____, ...profile } = user;
  res.json({
    exportedAt: new Date().toISOString(),
    profile,
    bookmarks: user.bookmarks || [],
    trackers: user.trackers || [],
    studyPlans: user.studyPlans || [],
    quizzes: user.quizzes || []
  });
});

app.post('/api/auth/refresh-token', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true }) as any;
    const user = db.users.find(u => u.id === decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const newToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token: newToken });
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
});

// ----------------------------------------------------
// ADMIN ONLY APIs
// ----------------------------------------------------
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  authenticateToken(req, res, () => {
    if ((req as any).user?.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admin privileges required' });
    }
    next();
  });
}

app.get('/api/admin/users', requireAdmin, (req, res) => {
  const sanitizedUsers = db.users.map(({ passwordHash, ...user }) => user);
  res.json(sanitizedUsers);
});

app.put('/api/admin/users/:id', requireAdmin, (req, res) => {
  const user = db.users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { role, isVerified } = req.body;
  if (role) user.role = role;
  if (isVerified !== undefined) user.isVerified = isVerified;
  saveDB(db);
  const { passwordHash, ...sanitized } = user;
  res.json(sanitized);
});

app.delete('/api/admin/users/:id', requireAdmin, (req, res) => {
  const index = db.users.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  db.users.splice(index, 1);
  saveDB(db);
  res.json({ success: true });
});

app.get('/api/admin/analytics', requireAdmin, (req, res) => {
  const totalUsers = db.users.length;
  const verifiedUsers = db.users.filter(u => u.isVerified).length;
  
  // Group by category
  const categoryCounts: Record<string, number> = {};
  db.users.forEach(u => {
    categoryCounts[u.preferredCategory] = (categoryCounts[u.preferredCategory] || 0) + 1;
  });

  // Group by qualification
  const qualificationCounts: Record<string, number> = {};
  db.users.forEach(u => {
    qualificationCounts[u.qualification] = (qualificationCounts[u.qualification] || 0) + 1;
  });

  // Daily growth (simple stats)
  const registeredToday = db.users.filter(u => {
    const today = new Date().toISOString().split('T')[0];
    return u.createdAt && u.createdAt.startsWith(today);
  }).length;

  res.json({
    totalUsers,
    verifiedUsers,
    registeredToday,
    categoryDistribution: categoryCounts,
    qualificationDistribution: qualificationCounts,
    totalExams: db.exams.length,
    totalNotifications: db.notifications.length
  });
});

// ----------------------------------------------------
// BOOKMARKS API
// ----------------------------------------------------
app.get('/api/bookmarks', (req, res) => {
  const user = getOptionalUser(req);
  if (user) {
    res.json(user.bookmarks || []);
  } else {
    res.json(db.bookmarks || []);
  }
});

app.post('/api/bookmarks/toggle', (req, res) => {
  const { examId } = req.body;
  if (!examId) {
    return res.status(400).json({ error: 'examId is required' });
  }
  const user = getOptionalUser(req);
  if (user) {
    if (!user.bookmarks) user.bookmarks = [];
    const index = user.bookmarks.indexOf(examId);
    if (index === -1) {
      user.bookmarks.push(examId);
    } else {
      user.bookmarks.splice(index, 1);
    }
    saveDB(db);
    res.json(user.bookmarks);
  } else {
    const index = db.bookmarks.indexOf(examId);
    if (index === -1) {
      db.bookmarks.push(examId);
    } else {
      db.bookmarks.splice(index, 1);
    }
    saveDB(db);
    res.json(db.bookmarks);
  }
});

// ----------------------------------------------------
// APPLICATION TRACKER API
// ----------------------------------------------------
app.get('/api/tracker', (req, res) => {
  const user = getOptionalUser(req);
  if (user) {
    res.json(user.trackers || []);
  } else {
    res.json(db.trackers || []);
  }
});

app.post('/api/tracker/update', (req, res) => {
  const trackerUpdate: ApplicationTracker = req.body;
  if (!trackerUpdate.examId) {
    return res.status(400).json({ error: 'examId is required' });
  }
  const user = getOptionalUser(req);
  if (user) {
    if (!user.trackers) user.trackers = [];
    const index = user.trackers.findIndex((t) => t.examId === trackerUpdate.examId);
    if (index !== -1) {
      user.trackers[index] = { ...user.trackers[index], ...trackerUpdate };
    } else {
      user.trackers.push({
        id: 'track-' + Date.now(),
        status: 'planning',
        ...trackerUpdate,
      });
    }
    saveDB(db);
    res.json(user.trackers);
  } else {
    const index = db.trackers.findIndex((t) => t.examId === trackerUpdate.examId);
    if (index !== -1) {
      db.trackers[index] = { ...db.trackers[index], ...trackerUpdate };
    } else {
      db.trackers.push({
        id: 'track-' + Date.now(),
        status: 'planning',
        ...trackerUpdate,
      });
    }
    saveDB(db);
    res.json(db.trackers);
  }
});

app.delete('/api/tracker/:examId', (req, res) => {
  const examId = req.params.examId;
  const user = getOptionalUser(req);
  if (user) {
    if (user.trackers) {
      const index = user.trackers.findIndex((t) => t.examId === examId);
      if (index !== -1) {
        user.trackers.splice(index, 1);
        saveDB(db);
        return res.json({ success: true });
      }
    }
    res.status(404).json({ error: 'Tracker not found' });
  } else {
    const index = db.trackers.findIndex((t) => t.examId === examId);
    if (index !== -1) {
      db.trackers.splice(index, 1);
      saveDB(db);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Tracker not found' });
    }
  }
});

// ----------------------------------------------------
// STUDY PLANS API
// ----------------------------------------------------
app.get('/api/study-plans', (req, res) => {
  const user = getOptionalUser(req);
  if (user) {
    res.json(user.studyPlans || []);
  } else {
    res.json(db.studyPlans || []);
  }
});

app.post('/api/study-plans', (req, res) => {
  const newPlan: StudyPlan = {
    id: 'plan-' + Date.now(),
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  const user = getOptionalUser(req);
  if (user) {
    if (!user.studyPlans) user.studyPlans = [];
    user.studyPlans.unshift(newPlan);
    saveDB(db);
    res.status(201).json(newPlan);
  } else {
    db.studyPlans.unshift(newPlan);
    saveDB(db);
    res.status(201).json(newPlan);
  }
});

app.delete('/api/study-plans/:id', (req, res) => {
  const planId = req.params.id;
  const user = getOptionalUser(req);
  if (user) {
    if (user.studyPlans) {
      const index = user.studyPlans.findIndex((p) => p.id === planId);
      if (index !== -1) {
        user.studyPlans.splice(index, 1);
        saveDB(db);
        return res.json({ success: true });
      }
    }
    res.status(404).json({ error: 'Study plan not found' });
  } else {
    const index = db.studyPlans.findIndex((p) => p.id === planId);
    if (index !== -1) {
      db.studyPlans.splice(index, 1);
      saveDB(db);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Study plan not found' });
    }
  }
});

// ----------------------------------------------------
// QUIZZES API
// ----------------------------------------------------
app.get('/api/quizzes', (req, res) => {
  const user = getOptionalUser(req);
  if (user) {
    res.json(user.quizzes || []);
  } else {
    res.json(db.quizzes || []);
  }
});

app.post('/api/quizzes', (req, res) => {
  const newQuiz: Quiz = {
    ...req.body,
    id: 'quiz-' + Date.now(),
    dateCompleted: new Date().toISOString(),
  };
  const user = getOptionalUser(req);
  if (user) {
    if (!user.quizzes) user.quizzes = [];
    user.quizzes.unshift(newQuiz);
    saveDB(db);
    res.status(201).json(newQuiz);
  } else {
    db.quizzes.unshift(newQuiz);
    saveDB(db);
    res.status(201).json(newQuiz);
  }
});


// ----------------------------------------------------
// GEMINI AI INTEGRATION API
// ----------------------------------------------------
app.post('/api/gemini/chat', async (req, res) => {
  const { prompt, chatHistory, type, optionData } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' });
  }

  // Check for mock key
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
    return res.json({
      text: "👋 Hello! I am your ExamVerse AI Assistant. Please configure your actual `GEMINI_API_KEY` under the Settings panel to enable real AI responses. For now, here is an interactive preview response: You can utilize our rich set of resources, structure your studies, and use Google Workspace tools to schedule your exams!"
    });
  }

  try {
    let systemInstruction = `You are ExamVerse AI, an elite, highly supportive AI Coach and Counselor for competitive examinations across various streams like UPSC, SSC, Banking, Railways, Engineering (JEE, GATE), Medical (NEET), IT certifications, and International tests (GRE, GMAT).
    Provide structural, highly informative responses. Highlight clear bullet points, suggest excellent resources, and answer questions accurately. If asked to translate or reply in another language, adapt accordingly.
    
    Here is the catalog of currently supported exams for context:
    ${JSON.stringify(db.exams.map(e => ({ id: e.id, name: e.name, category: e.category, short: e.shortDescription, eligibility: e.eligibility })))}
    `;

    if (type === 'study_plan') {
      systemInstruction += `\nSPECIAL TASK: You must generate a highly personalized study plan in JSON format.
      The output must strictly be a JSON object adhering to this structure:
      {
        "examId": "exam-id-here",
        "examName": "Exam Name",
        "title": "Study Plan Title",
        "durationWeeks": 4,
        "weeklySchedule": [
          {
            "week": 1,
            "focus": "Core focus of Week 1",
            "topics": ["Topic A", "Topic B"],
            "tasks": ["Read book X", "Take Mock Test Y"]
          }
        ]
      }`;
    } else if (type === 'quiz') {
      systemInstruction += `\nSPECIAL TASK: You must generate an interactive quiz with exactly 5 multiple choice questions on the requested subject/exam.
      The output must strictly be a JSON object adhering to this structure:
      {
        "title": "Quiz Title",
        "examName": "Exam Name",
        "questions": [
          {
            "question": "Question text here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswerIndex": 0,
            "explanation": "Detailed explanation of why Option A is correct."
          }
        ]
      }`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: (type === 'study_plan' || type === 'quiz') ? 'application/json' : undefined,
      },
    });

    const replyText = response.text || '';
    if (type === 'study_plan' || type === 'quiz') {
      try {
        const parsedJson = JSON.parse(replyText.trim());
        res.json(parsedJson);
      } catch (parseErr) {
        console.error('Failed to parse Gemini JSON output, falling back to text:', parseErr);
        res.json({ text: replyText });
      }
    } else {
      res.json({ text: replyText });
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

// ----------------------------------------------------
// OCR FOR NOTIFICATION PDFS / IMAGES
// ----------------------------------------------------
app.post('/api/gemini/ocr', async (req, res) => {
  const { fileBase64, mimeType } = req.body;

  if (!fileBase64 || !mimeType) {
    return res.status(400).json({ error: 'fileBase64 and mimeType are required' });
  }

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
    return res.json({
      text: "📄 [OCR Preview] UPSC Notification PDF processed successfully. Extracted details: Application starts Feb 14, 2026. Age limit: 21-32 years. Vacancies: 1,050. Check dates in the interactive portal!"
    });
  }

  try {
    const imagePart = {
      inlineData: {
        mimeType,
        data: fileBase64,
      },
    };

    const textPart = {
      text: 'Analyze this official exam notification document. Extract key highlights such as: Exam Name, Application Start Date, Last Date, Vacancies, Age Limits, Educational Qualification, and Important Instructions. Provide a very clear, executive markdown summary.',
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: { parts: [imagePart, textPart] },
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error('OCR analysis error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

// ----------------------------------------------------
// AI CAREER COUNSELOR API
// ----------------------------------------------------
app.post('/api/gemini/career-counsel', async (req, res) => {
  const { qualification, stream, age, preference, interest } = req.body;

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY' || process.env.GEMINI_API_KEY === 'MOCK_KEY') {
    return res.status(200).json({
      summary: `Based on your profile as a ${age}-year-old with a ${qualification} in ${stream} preferring ${preference} sectors, we recommend focusing on administrative leadership and technical specialization positions.`,
      recommendedExams: [
        { name: 'UPSC Civil Services Examination (CSE)', match: '95% Match', suitability: `Directly aligns with your interest in ${interest}. Perfect fit for public service leadership.`, vacancy: 'Approx. 1,050 annual openings', salary: 'Starting base of ₹56,100 + executive benefits.' },
        { name: 'GATE / PSU Recruitments', match: '88% Match', suitability: `Leverages your background to secure technical officer posts at IOCL, NTPC, or ONGC.`, vacancy: 'Over 2,500 PSU posts via GATE', salary: 'Scale of ₹60,000 to ₹1,80,000/month.' },
        { name: 'SSC CGL Examination', match: '85% Match', suitability: `Excellent administrative fit as Assistant Section Officer in ministries.`, vacancy: 'Over 12,000 vacancies', salary: 'Approx. ₹72,000 gross monthly salary.' }
      ],
      roadmap: [
        { phase: 'Phase 1: Foundation (Months 1-3)', focus: 'Core Syllabus & General Awareness', details: 'Establish base concepts. Read fundamental NCERT books, start daily newspaper habit, and identify core options.' },
        { phase: 'Phase 2: Aggressive Cover (Months 4-6)', focus: 'Subject Coverage & Writing Drills', details: 'Engage in dedicated writing drills, compile current affairs, and cover 70% of the syllabus.' },
        { phase: 'Phase 3: Ultimate Prep (Months 7-9)', focus: 'Mock Tests & PYQ Resolution', details: 'Solve 20+ years of previous papers, take full-length mock tests weekly, and build personality answers.' }
      ]
    });
  }

  try {
    const prompt = `Analyze this profile: Age: ${age}, Qualification: ${qualification}, Academic Stream: ${stream}, Sector Preference: ${preference}, Core Interests: ${interest}. Recommend 3 suitable examinations and prepare a 3-phase preparation roadmap.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an elite AI Career Counselor. Analyze the user profile and output a JSON object strictly matching this schema:
        {
          "summary": "Executive summary of the candidate's career alignment",
          "recommendedExams": [
            { "name": "Exam Name", "match": "90% Match", "suitability": "Why this matches", "vacancy": "Approx vacancies", "salary": "Salary details" }
          ],
          "roadmap": [
            { "phase": "Phase title", "focus": "Core focus", "details": "Detailed instructions" }
          ]
        }`,
        responseMimeType: 'application/json',
      }
    });

    res.json(JSON.parse(response.text?.trim() || '{}'));
  } catch (err) {
    console.error('Career counsel error:', err);
    res.status(500).json({ error: String(err) });
  }
});

// ----------------------------------------------------
// AI RESUME BUILDER API
// ----------------------------------------------------
app.post('/api/gemini/resume-builder', async (req, res) => {
  const { name, email, targetRole, skills, education, strengths } = req.body;

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY' || process.env.GEMINI_API_KEY === 'MOCK_KEY') {
    return res.json({
      professionalSummary: `Highly motivated and results-oriented professional with a strong foundation in ${education}. Expert in ${skills}, possessing proven strengths as a ${strengths}. Aligned to drive operational excellence in a ${targetRole} capacity.`,
      optimizedSkills: [
        { category: 'Technical & Core Skills', items: skills.split(',').map((s: string) => s.trim()) },
        { category: 'Soft Skills & Strengths', items: ['Analytical Problem Solving', 'Strategic Team Collaboration', 'Public Administration Awareness'] }
      ],
      experienceBullets: [
        `Led project coordination for collegiate academic teams, enhancing procedural compliance by 25%.`,
        `Drafted structured reports and executive briefs, ensuring high clarity and error-free metrics.`,
        `Coordinated with external stakeholders to manage event logistics and timeline parameters.`
      ],
      certifications: [
        'Advanced Certificate in Strategic Project Management',
        'Professional Communication Excellence'
      ]
    });
  }

  try {
    const prompt = `Construct an optimized professional resume draft for: Name: ${name}, Email: ${email}, Target Exam/Job: ${targetRole}, Education: ${education}, Skills: ${skills}, Strengths/Experiences: ${strengths}.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert resume writer. Structure and optimize the candidate's credentials into a professional JSON resume format matching this schema:
        {
          "professionalSummary": "A punchy, administrative summary",
          "optimizedSkills": [
            { "category": "Core / Admin Skills", "items": ["Skill A", "Skill B"] }
          ],
          "experienceBullets": ["Bullet 1 with quantitative outcomes", "Bullet 2"],
          "certifications": ["Certification 1", "Certification 2"]
        }`,
        responseMimeType: 'application/json',
      }
    });

    res.json(JSON.parse(response.text?.trim() || '{}'));
  } catch (err) {
    console.error('Resume build error:', err);
    res.status(500).json({ error: String(err) });
  }
});

// ----------------------------------------------------
// AI INTERVIEW PANEL QUESTIONS API
// ----------------------------------------------------
app.post('/api/gemini/interview-question', async (req, res) => {
  const { exam, type, difficulty } = req.body;

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY' || process.env.GEMINI_API_KEY === 'MOCK_KEY') {
    return res.json({
      question: `Imagine you are the chief of administrative affairs for a regional hub of ${exam}. An urgent regulatory contradiction threatens to stall public development files worth millions. A senior politician orders you to expedite approval without standard audit verification. How do you respond, maintaining integrity and civil code?`
    });
  }

  try {
    const prompt = `Generate 1 realistic, challenging interview question for an examination: ${exam}, Type of Question: ${type}, Difficulty Grade: ${difficulty}. Ask a deep situational, ethics, or core knowledge question.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are the chairman of a civil service interview board or executive recruitment panel. Output a JSON object containing exactly one question matching this schema:
        {
          "question": "Question text"
        }`,
        responseMimeType: 'application/json',
      }
    });

    res.json(JSON.parse(response.text?.trim() || '{}'));
  } catch (err) {
    console.error('Interview question error:', err);
    res.status(500).json({ error: String(err) });
  }
});

app.post('/api/gemini/interview-grade', async (req, res) => {
  const { exam, question, answer } = req.body;

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY' || process.env.GEMINI_API_KEY === 'MOCK_KEY') {
    return res.json({
      grade: 'A-',
      critique: 'Very strong ethics demonstration. You prioritized rule of law and official audits, refusing political pressure while maintaining high administrative etiquette. Excellent structure.',
      modelAnswer: 'A model answer should reiterate that rule-based governance and audit mechanisms are non-negotiable. One should politely request written executive directives while flagging regulatory risks, immediately raising a formal report to departmental audit logs.'
    });
  }

  try {
    const prompt = `Board Question: "${question}"\nCandidate Answer: "${answer}"\nEvaluate this candidate response for the exam board ${exam}.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are the chief evaluator of a civil service board. Critically analyze the candidate's answer for structure, logic, administrative values, and language. Output a JSON matching this schema:
        {
          "grade": "Grade from A+ to D",
          "critique": "Detailed constructive evaluation highlighting strengths and improvements",
          "modelAnswer": "How an ideal candidate would frame this response"
        }`,
        responseMimeType: 'application/json',
      }
    });

    res.json(JSON.parse(response.text?.trim() || '{}'));
  } catch (err) {
    console.error('Interview grade error:', err);
    res.status(500).json({ error: String(err) });
  }
});

// ----------------------------------------------------
// AI NOTES GENERATOR API
// ----------------------------------------------------
app.post('/api/gemini/notes', async (req, res) => {
  const { topic, exam, depth } = req.body;

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY' || process.env.GEMINI_API_KEY === 'MOCK_KEY') {
    return res.json({
      text: `# Study Notes: ${topic}\n\n**Exam Syllabus Context:** ${exam} | **Note Style:** ${depth}\n\n---\n\n## 1. Core Structural Fundamentals\nThis topic covers essential frameworks, formulas, and historical rulings governing the topic. Ensure deep retention of core concepts.\n\n## 2. Dynamic Highlights & Examples\n- **Fact A:** Historical datasets show recurring patterns of administrative reform linked to this core topic.\n- **Formula/Rule B:** Systematic tracking requires applying direct methodology and verifying criteria rules.\n\n## 3. High-Yield Practice Tip\nAlways write active briefs. When answering mains or tier exams, use structured bullet lists to fetch higher scores.`
    });
  }

  try {
    const prompt = `Generate exhaustive, beautifully formatted markdown notes covering: Topic: "${topic}" for the exam syllabus: "${exam}". Style / Depth: "${depth}". Include headings, lists, landmark facts, and clear highlight blocks.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (err) {
    console.error('Notes generator error:', err);
    res.status(500).json({ error: String(err) });
  }
});

// ----------------------------------------------------
// AI FLASHCARDS GENERATOR API
// ----------------------------------------------------
app.post('/api/gemini/flashcards', async (req, res) => {
  const { topic } = req.body;

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY' || process.env.GEMINI_API_KEY === 'MOCK_KEY') {
    return res.json({
      cards: [
        { front: 'What is the primary governing principle of this subject?', back: 'It ensures structural balance, administrative accountability, and rules compliance across core chapters.' },
        { front: 'Mention the landmark article or formula associated with this topic.', back: 'The regulatory guidelines state that Articles 14 to 32 establish core compliance parameters.' },
        { front: 'How do you revise this topic effectively for exams?', back: 'Create bulleted cheat sheets, solve past 15-year questions, and test active recall weekly.' }
      ]
    });
  }

  try {
    const prompt = `Generate exactly 5 high-yield active-recall flashcards for: Topic: "${topic}". Ask challenging questions on the front and provide comprehensive answers on the back.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an elite academic tutor. Output a JSON object containing exactly 5 flashcards matching this schema:
        {
          "cards": [
            { "front": "A clear, challenging question or prompt", "back": "A structured, rich answer explanation" }
          ]
        }`,
        responseMimeType: 'application/json',
      }
    });

    res.json(JSON.parse(response.text?.trim() || '{}'));
  } catch (err) {
    console.error('Flashcards error:', err);
    res.status(500).json({ error: String(err) });
  }
});

// ----------------------------------------------------
// GMAIL INTEGRATION API
// ----------------------------------------------------
app.post('/api/gmail/send', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Google OAuth Access Token in Authorization header.' });
  }

  const token = authHeader.split(' ')[1];
  const { to, subject, htmlContent } = req.body;

  if (!to || !subject || !htmlContent) {
    return res.status(400).json({ error: 'Missing required email parameters (to, subject, htmlContent)' });
  }

  try {
    // Construct Raw MIME message
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
      `To: ${to}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      '',
      htmlContent,
    ];
    const message = messageParts.join('\n');

    // Base64url encode the message
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Call official Google Gmail API
    const gmailResponse = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: encodedMessage }),
    });

    if (!gmailResponse.ok) {
      const errorText = await gmailResponse.text();
      throw new Error(`Gmail API responded with code ${gmailResponse.status}: ${errorText}`);
    }

    const result = await gmailResponse.json();
    res.json({ success: true, messageId: result.id });
  } catch (err) {
    console.error('Gmail sending failed:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

// ----------------------------------------------------
// VITE DEV / PRODUCTION HANDLING
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ExamVerse AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
