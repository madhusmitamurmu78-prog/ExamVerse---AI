import React, { useState, useEffect } from 'react';
import {
  Trophy,
  BookOpen,
  Calendar,
  Sparkles,
  Award,
  Settings,
  Bell,
  Search,
  CheckCircle,
  HelpCircle,
  Moon,
  Sun,
  MapPin,
  Menu,
  X,
  FileText,
  Clock,
  Send,
  Users,
  Brain,
  Scale
} from 'lucide-react';
import { Exam, NotificationItem, ApplicationTracker, StudyPlan, Quiz } from './types';
import { EXAMS_SEED_DATA } from './data/examsData';

// Component imports
import Hero from './components/Hero';
import ExamCard from './components/ExamCard';
import ExamDetails from './components/ExamDetails';
import CompareExams from './components/CompareExams';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import AIChat from './components/AIChat';
import QuizPlayer from './components/QuizPlayer';
import AIPortal from './components/AIPortal';
import SocialHubContainer from './components/SocialHubContainer';
import LawHub from './components/LawHub';
import { AuthScreens } from './components/AuthScreens';
import { AuthService } from './lib/authService';
import { UserProfile } from './types';

// Preloaded Quizzes for the Quiz Player
const PRELOADED_QUIZZES: Quiz[] = [
  {
    id: 'pre-quiz-upsc',
    examName: 'UPSC Civil Services Examination',
    title: 'High-Yield Polity & Indian Constitution Mock',
    questions: [
      {
        question: 'Which article of the Indian Constitution empowers the President to impose President\'s Rule in a state?',
        options: ['Article 352', 'Article 356', 'Article 360', 'Article 368'],
        correctAnswerIndex: 1,
        explanation: 'Article 356 of the Constitution of India provides for the imposition of President\'s Rule in a state in case of the failure of constitutional machinery.'
      },
      {
        question: 'The Fundamental Rights in the Indian Constitution are inspired by which country\'s constitution?',
        options: ['United Kingdom', 'USSR', 'United States of America', 'Ireland'],
        correctAnswerIndex: 2,
        explanation: 'The Fundamental Rights contained in Part III of the Constitution are inspired by the Bill of Rights of the USA Constitution.'
      },
      {
        question: 'Who is the ex-officio Chairman of the Rajya Sabha in India?',
        options: ['The President of India', 'The Prime Minister of India', 'The Vice-President of India', 'The Speaker of Lok Sabha'],
        correctAnswerIndex: 2,
        explanation: 'The Vice-President of India acts as the ex-officio Chairman of the Rajya Sabha as per Article 89 of the constitution.'
      }
    ],
    score: 0,
    dateCompleted: ''
  },
  {
    id: 'pre-quiz-ssc',
    examName: 'SSC Combined Graduate Level (CGL)',
    title: 'Quantitative Aptitude Practice - Speed Math',
    questions: [
      {
        question: 'A can complete a piece of work in 12 days, and B can complete it in 24 days. Working together, in how many days can they finish the work?',
        options: ['6 days', '8 days', '10 days', '12 days'],
        correctAnswerIndex: 1,
        explanation: 'Together rate = 1/12 + 1/24 = 3/24 = 1/8. Thus, they will complete the entire work in 8 days.'
      },
      {
        question: 'Find the single discount equivalent to two successive discounts of 20% and 10%:',
        options: ['30%', '28%', '25%', '32%'],
        correctAnswerIndex: 1,
        explanation: 'Net Discount = x + y - (xy/100) = 20 + 10 - (200/100) = 30 - 2 = 28%.'
      }
    ],
    score: 0,
    dateCompleted: ''
  }
];

export default function App() {
  // Navigation and Filtering State
  const [activeTab, setActiveTab] = useState<'home' | 'exams' | 'current-affairs' | 'quiz' | 'student-dashboard' | 'admin' | 'ai-coach' | 'ai-portal' | 'social-hub' | 'law-hub'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  // Authenticated User State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(AuthService.getUser());

  // Core synchronized server-side DB States
  const [exams, setExams] = useState<Exam[]>(EXAMS_SEED_DATA);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [currentAffairs, setCurrentAffairs] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [trackers, setTrackers] = useState<ApplicationTracker[]>([]);
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  // Appearance & Loading
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-login session syncing on boot
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      AuthService.getProfile()
        .then((profile) => {
          setCurrentUser(profile);
        })
        .catch((err) => {
          console.error('Session expired or handshake failed:', err);
          setCurrentUser(null);
        });
    }
  }, []);

  // Fetch all initial data from express backend APIs, reactive to currentUser
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = AuthService.getAuthHeaders();
        const [examsRes, notifRes, caRes, bookmarksRes, trackerRes, plansRes, quizRes] = await Promise.all([
          fetch('/api/exams'),
          fetch('/api/notifications'),
          fetch('/api/current-affairs'),
          fetch('/api/bookmarks', { headers }),
          fetch('/api/tracker', { headers }),
          fetch('/api/study-plans', { headers }),
          fetch('/api/quizzes', { headers })
        ]);

        if (examsRes.ok) setExams(await examsRes.json());
        if (notifRes.ok) setNotifications(await notifRes.json());
        if (caRes.ok) setCurrentAffairs(await caRes.json());
        if (bookmarksRes.ok) setBookmarks(await bookmarksRes.json());
        if (trackerRes.ok) setTrackers(await trackerRes.json());
        if (plansRes.ok) setStudyPlans(await plansRes.json());
        if (quizRes.ok) setQuizzes(await quizRes.json());
      } catch (err) {
        console.error('Failed to query backend API endpoints. Operating with fallback seeds.', err);
      }
    };

    fetchData();
  }, [currentUser]);

  // Sync dark mode style attribute
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Bookmark toggle API syncing
  const handleToggleBookmark = async (examId: string, e?: any) => {
    if (e && e.stopPropagation) e.stopPropagation();
    try {
      const response = await fetch('/api/bookmarks/toggle', {
        method: 'POST',
        headers: AuthService.getAuthHeaders(),
        body: JSON.stringify({ examId }),
      });
      if (response.ok) {
        const updatedBookmarks = await response.json();
        setBookmarks(updatedBookmarks);
      }
    } catch (err) {
      console.error(err);
      // Local fallback
      setBookmarks((prev) =>
        prev.includes(examId) ? prev.filter((id) => id !== examId) : [...prev, examId]
      );
    }
  };

  // Handle Application Tracker update API syncing
  const handleUpdateTracker = async (examId: string, status: ApplicationTracker['status']) => {
    try {
      const exam = exams.find((e) => e.id === examId);
      const trackerBody: Partial<ApplicationTracker> = {
        examId,
        status,
        examName: exam?.name || examId,
      };

      const response = await fetch('/api/tracker/update', {
        method: 'POST',
        headers: AuthService.getAuthHeaders(),
        body: JSON.stringify(trackerBody),
      });

      if (response.ok) {
        const updatedTrackers = await response.json();
        setTrackers(updatedTrackers);
      }
    } catch (err) {
      console.error(err);
      // Local fallback
      setTrackers((prev) => {
        const existing = prev.find((t) => t.examId === examId);
        if (existing) {
          return prev.map((t) => (t.examId === examId ? { ...t, status } : t));
        } else {
          return [...prev, { id: 'fallback-' + Date.now(), examId, status, examName: examId }];
        }
      });
    }
  };

  const handleRemoveTracker = async (examId: string) => {
    try {
      const response = await fetch(`/api/tracker/${examId}`, {
        method: 'DELETE',
        headers: AuthService.getAuthHeaders(),
      });
      if (response.ok) {
        setTrackers((prev) => prev.filter((t) => t.examId !== examId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Admin Exam Addition
  const handleAddExam = async (newExam: Exam) => {
    try {
      const response = await fetch('/api/exams', {
        method: 'POST',
        headers: AuthService.getAuthHeaders(),
        body: JSON.stringify(newExam),
      });
      if (response.ok) {
        const added = await response.json();
        setExams((prev) => [...prev, added]);
      }
    } catch (err) {
      console.error(err);
      setExams((prev) => [...prev, newExam]);
    }
  };

  const handleDeleteExam = async (id: string) => {
    try {
      const response = await fetch(`/api/exams/${id}`, {
        method: 'DELETE',
        headers: AuthService.getAuthHeaders(),
      });
      if (response.ok) {
        setExams((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditExam = async (id: string, updatedExam: Partial<Exam>) => {
    try {
      const response = await fetch(`/api/exams/${id}`, {
        method: 'PUT',
        headers: AuthService.getAuthHeaders(),
        body: JSON.stringify(updatedExam),
      });
      if (response.ok) {
        const saved = await response.json();
        setExams((prev) => prev.map((e) => (e.id === id ? { ...e, ...saved } : e)));
      }
    } catch (err) {
      console.error(err);
      setExams((prev) => prev.map((e) => (e.id === id ? { ...e, ...updatedExam } : e)));
    }
  };

  // Handle Admin Notification addition
  const handleAddNotification = async (notif: Partial<NotificationItem>) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: AuthService.getAuthHeaders(),
        body: JSON.stringify(notif),
      });
      if (response.ok) {
        const added = await response.json();
        setNotifications((prev) => [added, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // AI-Generated callbacks
  const handleSaveStudyPlan = async (plan: StudyPlan) => {
    try {
      const response = await fetch('/api/study-plans', {
        method: 'POST',
        headers: AuthService.getAuthHeaders(),
        body: JSON.stringify(plan),
      });
      if (response.ok) {
        const saved = await response.json();
        setStudyPlans((prev) => [saved, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveQuiz = async (quiz: Quiz) => {
    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: AuthService.getAuthHeaders(),
        body: JSON.stringify(quiz),
      });
      if (response.ok) {
        const saved = await response.json();
        setQuizzes((prev) => [saved, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  const triggerToast = (title: string, message: string) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Filtering Logic
  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || exam.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(exams.map((e) => e.category))) as string[];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-slate-950 text-white' : 'bg-[#F4F7FA] text-slate-800'}`}>
      
      {/* 1. TOP GLOBAL NAVIGATION HEADER */}
      <nav className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-white rounded-xs rotate-45"></div>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Exam<span className="text-blue-600 dark:text-blue-400 font-extrabold">Verse</span> AI
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {[
                { id: 'home', label: 'Explore Hub', icon: BookOpen },
                { id: 'exams', label: 'Directory Matrix', icon: Trophy },
                { id: 'current-affairs', label: 'Current Affairs', icon: FileText },
                { id: 'quiz', label: 'Mock Portal', icon: Award },
                { id: 'student-dashboard', label: 'Student Command', icon: Clock },
                { id: 'ai-portal', label: 'AI Studio', icon: Sparkles },
                { id: 'ai-coach', label: 'AI Coach Chat', icon: Brain },
                { id: 'social-hub', label: 'Social & Jobs', icon: Users },
                { id: 'law-hub', label: 'Law Students Hub', icon: Scale },
                { id: 'admin', label: 'Admin Desk', icon: Settings },
              ].map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => {
                      setActiveTab(link.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold tracking-wide transition flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-750 dark:text-blue-450 font-extrabold shadow-xs shadow-blue-500/5'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-850 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-850/40'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Appearance Utilities */}
            <div className="flex items-center gap-3">
              <button
                id="darkmode-toggle"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white bg-white dark:bg-slate-900 shadow-2xs transition-all hover:scale-105 active:scale-95"
                title="Toggle Dark Mode"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              {currentUser ? (
                <button
                  id="nav-user-profile"
                  onClick={() => setActiveTab('student-dashboard')}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition flex items-center gap-2"
                  title="View Student Command"
                >
                  <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-extrabold text-[10px] flex items-center justify-center shadow-xs">
                    {currentUser.fullName[0].toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-slate-700 dark:text-slate-200">{currentUser.fullName.split(' ')[0]}</span>
                </button>
              ) : (
                <button
                  id="nav-signin"
                  onClick={() => setActiveTab('student-dashboard')}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs transition shadow-xs"
                >
                  Sign In
                </button>
              )}

              {/* Mobile Menu Icon */}
              <button
                id="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-850 dark:hover:text-white"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1.5 shadow-xl">
            {[
              { id: 'home', label: 'Explore Hub', icon: BookOpen },
              { id: 'exams', label: 'Directory Matrix', icon: Trophy },
              { id: 'current-affairs', label: 'Current Affairs', icon: FileText },
              { id: 'quiz', label: 'Mock Portal', icon: Award },
              { id: 'student-dashboard', label: 'Student Command', icon: Clock },
              { id: 'ai-portal', label: 'AI Studio', icon: Sparkles },
              { id: 'ai-coach', label: 'AI Coach Chat', icon: Brain },
              { id: 'social-hub', label: 'Social & Jobs', icon: Users },
              { id: 'law-hub', label: 'Law Students Hub', icon: Scale },
              { id: 'admin', label: 'Admin Desk', icon: Settings },
            ].map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => {
                    setActiveTab(link.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-750 dark:text-blue-455 font-extrabold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* 2. MAIN HUB CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* TAB 1: EXPLORE HUB */}
        {activeTab === 'home' && (
          <div className="space-y-10 animate-fade-in">
            {/* Elegant Hero and Search Panel */}
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={uniqueCategories}
            />

            {/* Side-by-Side Content Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Exams list */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Trending Examinations</h2>
                  <span className="text-xs font-semibold text-slate-400">Showing {filteredExams.length} matches</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredExams.map((exam) => (
                    <ExamCard
                      key={exam.id}
                      exam={exam}
                      onSelect={(e) => setSelectedExam(e)}
                      isBookmarked={bookmarks.includes(exam.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                  {filteredExams.length === 0 && (
                    <div className="col-span-2 text-center py-12 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                      <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <h4 className="font-bold text-slate-700 dark:text-slate-300">No Exams Found</h4>
                      <p className="text-xs text-slate-400">We couldn't find matches for "{searchQuery}". Try using other categories or simpler search terms.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Latest Updates */}
              <div className="space-y-8">
                {/* Official Notification Updates */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3">
                    <h3 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-600 animate-swing" /> Official Notification Feed
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-[9px] font-black tracking-widest uppercase">Latest</span>
                  </div>

                  <div className="space-y-4">
                    {notifications.slice(0, 4).map((notif) => (
                      <div key={notif.id} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1 hover:brightness-98 transition">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase ${
                            notif.type === 'admit_card'
                              ? 'bg-blue-50 text-blue-750 font-extrabold'
                              : notif.type === 'result'
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-amber-50 text-amber-600'
                          }`}>
                            {notif.type.replace('_', ' ')}
                          </span>
                          <span className="text-[9px] text-slate-400 font-semibold">{notif.date}</span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-800 dark:text-slate-250 leading-snug">{notif.title}</h4>
                        <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{notif.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI quick feature helper card */}
                <div className="bg-linear-to-br from-blue-600 via-blue-700 to-sky-700 text-white rounded-3xl p-6 shadow-md relative overflow-hidden space-y-4">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="space-y-1.5 relative z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 text-blue-100 text-[10px] font-black uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> ExamVerse Counselor
                    </span>
                    <h3 className="font-bold text-base leading-snug">Personalized Career Counseling</h3>
                    <p className="text-xs text-blue-100 leading-relaxed">
                      Consult our AI Counselor to discover suitable examination programs, analyze syllabi, and construct weekly preparation schedules.
                    </p>
                  </div>
                  <button
                    id="home-ai-consult-btn"
                    onClick={() => setActiveTab('ai-coach')}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 text-blue-600 font-extrabold text-xs transition shadow-md relative z-10 block text-center"
                  >
                    Initiate AI Consultation
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: DIRECTORY MATRIX (COMPARE & FILTER) */}
        {activeTab === 'exams' && (
          <div className="space-y-8 animate-fade-in">
            <CompareExams exams={exams} />

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Catalog Matrix</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {exams.map((exam) => (
                  <ExamCard
                    key={exam.id}
                    exam={exam}
                    onSelect={(e) => setSelectedExam(e)}
                    isBookmarked={bookmarks.includes(exam.id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CURRENT AFFAIRS BULLETIN */}
        {activeTab === 'current-affairs' && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase">
                <FileText className="w-4 h-4" /> Daily Affairs Gazette
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">High-Yield Knowledge Bulletins</h2>
              <p className="text-slate-400 text-xs md:text-sm">Stay ahead in general knowledge. Extracted monthly highlights essential for UPSC GS-III and Banking Awareness sections.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentAffairs.map((ca) => (
                <div key={ca.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4 shadow-2xs hover:shadow-xs transition">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                      {ca.category}
                    </span>
                    <span className="text-slate-400 text-[10px] font-semibold">{ca.date}</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-800 dark:text-white">{ca.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{ca.summary}</p>
                  
                  {/* Expansion or detail read */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-[11px] text-slate-650 dark:text-slate-300 leading-relaxed italic border-l-2 border-blue-500">
                    {ca.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MCQ QUIZ PLAYER */}
        {activeTab === 'quiz' && (
          <div className="animate-fade-in">
            <QuizPlayer
              exams={exams}
              preloadedQuizzes={PRELOADED_QUIZZES}
              customQuizzes={quizzes}
              onQuizComplete={handleSaveQuiz}
              onNavigateToAI={() => setActiveTab('ai-coach')}
            />
          </div>
        )}

        {/* TAB 5: STUDENT COMMAND */}
        {activeTab === 'student-dashboard' && (
          <div className="animate-fade-in">
            {currentUser ? (
              <StudentDashboard
                exams={exams}
                bookmarks={bookmarks}
                trackers={trackers}
                studyPlans={studyPlans}
                quizzes={quizzes}
                user={currentUser}
                onLogout={() => {
                  AuthService.clearSession();
                  setCurrentUser(null);
                  setActiveTab('home');
                }}
                onUpdateUser={(updated) => {
                  setCurrentUser(updated);
                }}
                onToggleBookmark={handleToggleBookmark}
                onUpdateTracker={handleUpdateTracker}
                onRemoveTracker={handleRemoveTracker}
                onStartQuiz={(exam) => {
                  setSelectedExam(exam);
                  setActiveTab('quiz');
                }}
              />
            ) : (
              <div className="py-12">
                <AuthScreens
                  onSuccess={(user) => {
                    setCurrentUser(user);
                    triggerToast('Authentication Success! 🔒', `Welcome back to your workspace, ${user.fullName}!`);
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 6: AI COUNSELOR */}
        {activeTab === 'ai-coach' && (
          <div className="animate-fade-in">
            <AIChat
              exams={exams}
              onSaveStudyPlan={handleSaveStudyPlan}
              onSaveQuiz={handleSaveQuiz}
              onNavigateToDashboard={() => setActiveTab('student-dashboard')}
            />
          </div>
        )}

        {/* TAB 7: ADMINISTRATIVE PORTAL */}
        {activeTab === 'admin' && (
          <div className="animate-fade-in">
            {!currentUser ? (
              <div className="py-12">
                <AuthScreens
                  onSuccess={(user) => {
                    setCurrentUser(user);
                    triggerToast('Administrative Verification! 🛡️', `Database access cleared for administrator ${user.fullName}`);
                  }}
                />
              </div>
            ) : currentUser.role !== 'admin' ? (
              <div className="max-w-md mx-auto text-center p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs space-y-4 text-left">
                <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center mx-auto">
                  <Settings className="w-6 h-6 animate-spin" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base text-center">Administrative Clearance Required</h3>
                <p className="text-xs text-slate-400 leading-relaxed text-center">
                  The Administrative Portal is strictly restricted to verified staff members. Your current account (<strong>{currentUser.email}</strong>) does not possess sufficient privileges.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      AuthService.clearSession();
                      setCurrentUser(null);
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-750 text-white font-bold text-xs rounded-xl transition"
                  >
                    Sign In with Admin Account
                  </button>
                  <button
                    onClick={() => setActiveTab('home')}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition"
                  >
                    Return to Explore Hub
                  </button>
                </div>
              </div>
            ) : (
              <AdminDashboard
                exams={exams}
                onAddExam={handleAddExam}
                onEditExam={handleEditExam}
                onDeleteExam={handleDeleteExam}
                onAddNotification={handleAddNotification}
                trackers={trackers}
              />
            )}
          </div>
        )}

        {/* TAB 8: AI STUDIO PORTAL */}
        {activeTab === 'ai-portal' && (
          <div className="animate-fade-in">
            <AIPortal exams={exams} />
          </div>
        )}

        {/* TAB 9: SOCIAL HUB */}
        {activeTab === 'social-hub' && (
          <div className="animate-fade-in">
            <SocialHubContainer />
          </div>
        )}

        {/* TAB 10: LAW STUDENTS HUB */}
        {activeTab === 'law-hub' && (
          <div className="animate-fade-in">
            <LawHub
              exams={exams}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              trackers={trackers}
              onUpdateTracker={handleUpdateTracker}
              triggerToast={triggerToast}
            />
          </div>
        )}

      </main>

      {/* 3. IMMERSIVE SLIDE-OUT DETAIL PANEL FOR EXAMS */}
      {selectedExam && (
        <ExamDetails
          exam={selectedExam}
          onClose={() => setSelectedExam(null)}
          isBookmarked={bookmarks.includes(selectedExam.id)}
          onToggleBookmark={(id) => handleToggleBookmark(id)}
          trackerStatus={trackers.find((t) => t.examId === selectedExam.id)?.status}
          onUpdateTracker={handleUpdateTracker}
          onGenerateStudyPlan={(exam) => {
            setSelectedExam(null);
            setAiModeForCoach('study_plan', `Generate a detailed 6-week study schedule for ${exam.name}`);
          }}
          onStartQuiz={(exam) => {
            setSelectedExam(null);
            setAiModeForCoach('quiz', `Generate a 5 question multiple choice quiz covering ${exam.name} general knowledge and syllabus topics.`);
          }}
        />
      )}

      {/* GLOBAL TOAST ALERTS */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 shadow-2xl flex items-start gap-3 max-w-sm animate-slide-up">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-xs">{toast.title}</h4>
            <p className="text-[10px] text-slate-400 leading-normal">{toast.message}</p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-8 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <p className="text-xs text-slate-400 font-bold">ExamVerse AI — Unified Examination Intelligence Dashboard</p>
          <p className="text-[10px] text-slate-400 italic">Designed with modern visual hierarchy and powered by Google Gemini 3.5 & Google Workspace Workspace.</p>
        </div>
      </footer>

    </div>
  );

  // Helper function to dynamically boot into AI Chat from exam details
  function setAiModeForCoach(mode: 'study_plan' | 'quiz', presetPrompt: string) {
    setActiveTab('ai-coach');
    setTimeout(() => {
      // Find elements on page and update
      const modeSelect = document.getElementById('ai-mode-select') as HTMLSelectElement | null;
      if (modeSelect) {
        modeSelect.value = mode;
        modeSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const chatInput = document.getElementById('ai-chat-input') as HTMLInputElement | null;
      if (chatInput) {
        chatInput.value = presetPrompt;
        chatInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 200);
  }
}
