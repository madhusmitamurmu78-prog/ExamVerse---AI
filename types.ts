export interface FAQ {
  question: string;
  answer: string;
}

export interface ImportantDate {
  label: string;
  date: string; // ISO format or string
}

export interface Book {
  title: string;
  author: string;
  link?: string;
}

export interface ExamPatternSection {
  subject: string;
  questions: number;
  marks: number;
  duration?: string;
}

export interface SyllabusItem {
  stage: string; // e.g. "Prelims", "Mains", "Tier I"
  topics: string[];
}

export interface PYQPaper {
  year: number;
  title: string;
  downloadUrl: string;
}

export interface MockTest {
  id: string;
  title: string;
  questionsCount: number;
  durationMinutes: number;
}

export interface Exam {
  id: string;
  name: string;
  category: string; // UPSC, SSC, Banking, Railways, Defence, Police, State PSC, Engineering, Medical, Law, Management, CUET, Polytechnic, University, IT Certification, International
  shortDescription: string;
  
  // Eligibility
  eligibility: {
    ageLimit: string;
    educationalQualification: string;
    nationality: string;
    reservationDetails?: string;
  };

  // Process
  selectionProcess: string[];
  examPattern: ExamPatternSection[];
  syllabus: SyllabusItem[];
  importantTopics: string[];
  
  // Strategy & Resources
  preparationStrategy: string;
  bestBooks: Book[];
  pyqPapers: PYQPaper[];
  mockTests: MockTest[];

  // Important Dates & Notifications
  dates: {
    applicationStart: string;
    applicationLastDate: string;
    correctionWindow?: string;
    admitCardRelease?: string;
    examDate: string;
    answerKeyRelease?: string;
    resultDate?: string;
  };

  // Post-Exam
  cutOffDetails?: string;
  counsellingDetails?: string;
  
  // Career Details
  vacancyDetails?: string;
  salary?: string;

  // Administrative
  requiredDocuments: string[];
  applicationFees: {
    general: number;
    reserved: number;
    details?: string;
  };
  howToApply: string[];
  officialWebsite: string;
  officialNotificationPdfUrl?: string;
  officialContactInfo: string;
  faqs: FAQ[];
}

export interface CurrentAffairItem {
  id: string;
  title: string;
  category: string; // National, International, Economy, Science & Tech, Sports, Awards
  summary: string;
  date: string;
  content: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  examId?: string;
  type: 'alert' | 'update' | 'result' | 'admit_card';
  date: string;
  detailsUrl?: string;
  description: string;
}

export interface StudyPlan {
  id: string;
  examId: string;
  examName: string;
  title: string;
  durationWeeks: number;
  weeklySchedule: {
    week: number;
    focus: string;
    topics: string[];
    tasks: string[];
  }[];
  createdAt: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  examId?: string;
  examName?: string;
  title: string;
  questions: QuizQuestion[];
  userAnswers?: number[];
  score?: number;
  dateCompleted?: string;
}

export interface UserBookmark {
  userId: string;
  examId: string;
}

export interface ApplicationTracker {
  id: string;
  examId: string;
  examName: string;
  status: 'planning' | 'applied' | 'admit_card' | 'exam_done' | 'result_announced';
  notes?: string;
  reminderDate?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface UserPreferences {
  darkMode?: boolean;
  notificationsEnabled?: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  mobileNumber?: string;
  country: string;
  state: string;
  qualification: string;
  preferredCategory: string;
  role: 'student' | 'admin';
  isVerified: boolean;
  createdAt: string;
  profilePicture?: string;
  preferences?: UserPreferences;
  bookmarks?: string[];
  trackers?: ApplicationTracker[];
  studyPlans?: StudyPlan[];
  quizzes?: Quiz[];
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

