import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Calendar,
  Clock,
  ListTodo,
  History,
  Download,
  Mail,
  User,
  LogOut,
  Sparkles,
  CheckCircle,
  FileText,
  Hourglass,
  CheckSquare,
  Square,
  AlertCircle,
  BarChart3,
  Flame,
  Plus,
  Trash2,
  Check,
  BellRing,
  Award,
  Lock
} from 'lucide-react';
import { Exam, ApplicationTracker, StudyPlan, Quiz, UserProfile } from '../types';
import { AuthService } from '../lib/authService';

interface StudentDashboardProps {
  exams: Exam[];
  bookmarks: string[];
  trackers: ApplicationTracker[];
  studyPlans: StudyPlan[];
  quizzes: Quiz[];
  onToggleBookmark: (examId: string) => void;
  onUpdateTracker: (examId: string, status: ApplicationTracker['status']) => void;
  onRemoveTracker: (examId: string) => void;
  onStartQuiz: (exam: Exam) => void;
  user: UserProfile | null;
  onLogout: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

// Initial mock custom events for study calendar
const INITIAL_CALENDAR_EVENTS = [
  { id: 'ev-1', title: 'GS-III Environment Lecture', date: new Date().toISOString().split('T')[0], duration: 90, completed: false },
  { id: 'ev-2', title: 'DBMS Transaction Locks Practice', date: new Date().toISOString().split('T')[0], duration: 60, completed: true },
  { id: 'ev-3', title: 'Solve 2024 UPSC Prelims History PYQ', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], duration: 120, completed: false },
];

export default function StudentDashboard({
  exams,
  bookmarks,
  trackers,
  studyPlans,
  quizzes,
  onToggleBookmark,
  onUpdateTracker,
  onRemoveTracker,
  onStartQuiz,
  user,
  onLogout,
  onUpdateUser,
}: StudentDashboardProps) {
  // Sub-Navigation tabs inside dashboard
  const [subTab, setSubTab] = useState<'command' | 'calendar' | 'analytics' | 'notifications' | 'profile'>('command');

  // Profile Form States
  const [profName, setProfName] = useState(user?.fullName || '');
  const [profMobile, setProfMobile] = useState(user?.mobileNumber || '');
  const [profCountry, setProfCountry] = useState(user?.country || 'India');
  const [profState, setProfState] = useState(user?.state || '');
  const [profQual, setProfQual] = useState(user?.qualification || '');
  const [profCategory, setProfCategory] = useState(user?.preferredCategory || 'Law Exams');

  // Password Change State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  // Delete Account Confirmation States
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInputEmail, setDeleteInputEmail] = useState('');

  // Email Notification State
  const [emailTo, setEmailTo] = useState(user?.email || '');
  const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Push notifications simulations
  const [pushEnabled, setPushEnabled] = useState(true);
  const [reminderFrequency, setReminderFrequency] = useState('Daily Morning (8:00 AM)');
  const [activeToast, setActiveToast] = useState<{ show: boolean; title: string; message: string }>({ show: false, title: '', message: '' });

  // Checked/Completed study tasks state from study plans
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  // Study Calendar states
  const [calendarEvents, setCalendarEvents] = useState(INITIAL_CALENDAR_EVENTS);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDuration, setNewEventDuration] = useState('60');

  // Daily Streak Counter
  const [streakCount, setStreakCount] = useState(7);

  // Indian States & Union Territories
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry'
  ];

  const examCategories = [
    'UPSC CSE', 'State PSC', 'Law Exams', 'CLAT UG', 'CLAT PG', 'CUET Law', 'Judiciary Services', 'MBA Entrance', 'Banking & SSC'
  ];

  useEffect(() => {
    if (user) {
      setProfName(user.fullName || '');
      setProfMobile(user.mobileNumber || '');
      setProfCountry(user.country || 'India');
      setProfState(user.state || '');
      setProfQual(user.qualification || '');
      setProfCategory(user.preferredCategory || 'Law Exams');
      setEmailTo(user.email || '');
    }
  }, [user]);

  const handleSendGmailPlan = async (plan: StudyPlan) => {
    if (!user) {
      alert('Please sign in to your ExamVerse account to use the Gmail service!');
      return;
    }
    setIsSendingEmail(true);
    setEmailStatus({ type: '', message: '' });

    // Construct Email HTML content
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #2563eb;">ExamVerse AI Personalized Study Plan</h2>
        <p>Hello <strong>${user.fullName}</strong>,</p>
        <p>Here is your customized weekly preparation syllabus schedule for <strong>${plan.examName}</strong>:</p>
        <h3 style="background-color: #f1f5f9; padding: 10px; border-radius: 6px;">${plan.title}</h3>
        
        ${plan.weeklySchedule.map((week) => `
          <div style="margin-bottom: 15px; border-left: 3px solid #2563eb; padding-left: 10px;">
            <h4 style="margin: 0; color: #1e1b4b;">Week ${week.week}: ${week.focus}</h4>
            <p style="margin: 5px 0; font-size: 13px; color: #475569;"><strong>Topics:</strong> ${week.topics.join(', ')}</p>
            <p style="margin: 5px 0; font-size: 13px; color: #475569;"><strong>Tasks:</strong> ${week.tasks.join(' | ')}</p>
          </div>
        `).join('')}

        <p style="margin-top: 25px; font-size: 12px; color: #94a3b8; border-t: 1px solid #e2e8f0; padding-top: 15px;">
          Generated automatically by ExamVerse AI. Good luck with your preparation!
        </p>
      </div>
    `;

    try {
      const response = await fetch('/api/gmail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders()
        },
        body: JSON.stringify({
          to: emailTo,
          subject: `📚 Your Study Plan for ${plan.examName} - ExamVerse AI`,
          htmlContent,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setEmailStatus({ type: 'success', message: `✉️ Study Plan successfully sent to ${emailTo} via Gmail!` });
        triggerToast('Email Dispatched', `Gmail delivered your weekly schedule blueprint to ${emailTo} successfully!`);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err: any) {
      console.error(err);
      setEmailStatus({
        type: 'error',
        message: `Failed to send email via Gmail: ${err.message}. (Using fallback: Please verify your OAuth integration scopes.)`,
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const toggleTask = (taskId: string) => {
    setCheckedTasks((prev) => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      // Increase streak if completing tasks
      if (updated[taskId]) {
        setStreakCount(s => s + 1);
        triggerToast('Task Completed! 🚀', 'Excellent progress. Keep working to build your consecutive preparation streak.');
      }
      return updated;
    });
  };

  // Toast notifier helper
  const triggerToast = (title: string, message: string) => {
    setActiveToast({ show: true, title, message });
    setTimeout(() => {
      setActiveToast(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  // Calendar Helpers
  const handleAddCalendarEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const newEvent = {
      id: 'ev-' + Date.now(),
      title: newEventTitle,
      date: selectedDate,
      duration: parseInt(newEventDuration) || 60,
      completed: false
    };

    setCalendarEvents([...calendarEvents, newEvent]);
    setNewEventTitle('');
    triggerToast('Study Block Booked 🗓️', `Scheduled "${newEventTitle}" for ${selectedDate}.`);
  };

  const toggleEventCompleted = (id: string) => {
    setCalendarEvents(calendarEvents.map(ev => {
      if (ev.id === id) {
        const nextState = !ev.completed;
        if (nextState) {
          triggerToast('Session Accomplished! 🎯', `Completed "${ev.title}" session. Added ${ev.duration} minutes to your daily study log.`);
          setStreakCount(s => s + 1);
        }
        return { ...ev, completed: nextState };
      }
      return ev;
    }));
  };

  const deleteEvent = (id: string) => {
    setCalendarEvents(calendarEvents.filter(ev => ev.id !== id));
    triggerToast('Session Removed', 'The scheduled study slot has been deleted.');
  };

  // Helper filters
  const bookmarkedExams = exams.filter((e) => bookmarks.includes(e.id));
  const activeTrackers = trackers.map((t) => {
    const exam = exams.find((e) => e.id === t.examId);
    return { ...t, examName: exam?.name || t.examName, examDate: exam?.dates.examDate };
  });

  // Calculate stats for Analytics Dashboard
  const totalStudyMinutes = calendarEvents
    .filter(ev => ev.completed)
    .reduce((acc, curr) => acc + curr.duration, 0);

  const completedQuizzesCount = quizzes.length;
  const averageQuizScore = quizzes.length > 0 
    ? Math.round((quizzes.reduce((acc, q) => acc + (q.score || 0), 0) / quizzes.reduce((acc, q) => acc + q.questions.length, 0)) * 100)
    : 80; // default benchmark

  return (
    <div className="space-y-8 text-left relative">
      
      {/* Toast Alert Banner */}
      {activeToast.show && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 shadow-2xl flex items-start gap-3 animate-fade-in">
          <div className="p-2 bg-blue-600 rounded-xl shrink-0">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-xs text-white leading-tight">{activeToast.title}</h4>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{activeToast.message}</p>
          </div>
        </div>
      )}

      {/* Hero Welcome Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-black flex items-center justify-center shadow-xs text-xl">
            {user ? user.fullName[0].toUpperCase() : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {user ? `Welcome back, ${user.fullName}!` : 'Student Command Console'}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-linear-to-r from-amber-500 to-rose-600 text-white text-[9px] font-black uppercase tracking-wide">
                <Flame className="w-3 h-3 text-amber-200 animate-bounce" /> {streakCount} Day Streak
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              {user 
                ? 'Your secure cloud preparation profile is active. Access custom planners, mock tests, and download syllabus below.'
                : 'Log in to your student account to authorize automatic progress tracking and secure calendar reminders.'}
            </p>
          </div>
        </div>

        {/* Auth Button */}
        {!user ? (
          <div className="text-xs text-slate-500 font-bold bg-slate-100 dark:bg-slate-800 px-3.5 py-2.5 rounded-xl">Guest Mode</div>
        ) : (
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 text-xs font-black rounded-xl transition cursor-pointer"
          >
            Sign Out Profile
          </button>
        )}
      </div>


      {/* SUB-MENU WORKSPACE SWITCHER */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto">
        {[
          { id: 'command', label: 'Liaison Command', icon: ListTodo },
          { id: 'calendar', label: 'Interactive Calendar', icon: Calendar },
          { id: 'analytics', label: 'Study Analytics', icon: BarChart3 },
          { id: 'notifications', label: 'Alert Central', icon: BellRing },
          ...(user ? [{ id: 'profile', label: 'Profile & Security', icon: User }] : [])
        ].map(item => {
          const Icon = item.icon;
          const isActive = subTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSubTab(item.id as any)}
              className={`px-4 py-3 text-xs font-extrabold flex items-center gap-2 whitespace-nowrap border-b-2 transition duration-150 ${
                isActive 
                  ? 'border-blue-600 text-blue-600 dark:text-blue-450' 
                  : 'border-transparent text-slate-500 hover:text-slate-850 dark:hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* ----------------------------------------------------
          SUB-TAB 1: LIAISON COMMAND (Existing Timelines & Bookmarks)
          ---------------------------------------------------- */}
      {subTab === 'command' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Active Application Timeline Tracker */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" /> Active Application Timeline
              </h3>

              {activeTrackers.length > 0 ? (
                <div className="space-y-4">
                  {activeTrackers.map((t) => (
                    <div key={t.id} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-850/60 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-extrabold text-xs text-slate-850 dark:text-slate-100 leading-tight">{t.examName}</h4>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider mt-1">Syllabus Date: {t.examDate}</span>
                        </div>
                        <button
                          onClick={() => onRemoveTracker(t.examId)}
                          className="text-[10px] font-bold text-slate-400 hover:text-rose-500 transition uppercase"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-1">
                        {(['planning', 'applied', 'admit_card', 'exam_done', 'result_announced'] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              onUpdateTracker(t.examId, status);
                              triggerToast('Tracker Status Saved', `Proceeded with application state: ${status.replace('_', ' ')}`);
                            }}
                            className={`px-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-tight border transition ${
                              t.status === status
                                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            {status === 'planning' && '📋 Plan'}
                            {status === 'applied' && '✍️ Applied'}
                            {status === 'admit_card' && '🎟️ Admit'}
                            {status === 'exam_done' && '✅ Done'}
                            {status === 'result_announced' && '🏆 Result'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs font-semibold">
                  No active application tracking workspace. Click "View Details" on any exam to add it to your trackers!
                </div>
              )}
            </div>

            {/* AI-Generated Study Planners Checklists */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-blue-600" /> Syllabus Preparation Blueprints
              </h3>

              {studyPlans.length > 0 ? (
                <div className="space-y-6">
                  {studyPlans.map((plan) => (
                    <div key={plan.id} className="p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-850 pb-3">
                        <div>
                          <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">{plan.title}</h4>
                          <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block">Exam Target: {plan.examName} • {plan.durationWeeks} Weeks</span>
                        </div>
                        
                        <button
                          onClick={() => handleSendGmailPlan(plan)}
                          disabled={isSendingEmail}
                          className="text-[10px] font-black px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition flex items-center gap-1.5 uppercase disabled:opacity-50"
                        >
                          <Mail className="w-3.5 h-3.5" /> Dispatch to Gmail
                        </button>
                      </div>

                      {emailStatus.message && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-200 text-[10px] font-bold rounded-lg">
                          {emailStatus.message}
                        </div>
                      )}

                      <div className="space-y-4">
                        {plan.weeklySchedule.map((w, idx) => (
                          <div key={idx} className="space-y-2 border-l-2 border-blue-400 pl-4 text-left">
                            <h5 className="text-[11px] font-extrabold text-slate-850 dark:text-slate-200">Week {w.week}: {w.focus}</h5>
                            <p className="text-[10px] font-bold text-slate-450 uppercase">Core Subjects: {w.topics.join(', ')}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                              {w.tasks.map((task, tIdx) => {
                                const taskId = `${plan.id}-w${w.week}-t${tIdx}`;
                                const isChecked = !!checkedTasks[taskId];
                                return (
                                  <button
                                    key={tIdx}
                                    onClick={() => toggleTask(taskId)}
                                    className="flex items-center gap-2 text-left text-[11px] bg-white dark:bg-slate-900 p-2.5 rounded-xl hover:border-blue-300 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 font-semibold"
                                  >
                                    {isChecked ? (
                                      <CheckSquare className="w-3.5 h-3.5 text-blue-600 shrink-0 animate-pulse" />
                                    ) : (
                                      <Square className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                                    )}
                                    <span className={isChecked ? 'line-through text-slate-400 italic' : ''}>{task}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs font-semibold">
                  No active preparation blueprint. Head over to any Exam card and click "Generate Study Plan (AI)"!
                </div>
              )}
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Bookmarks */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-rose-500 animate-pulse" /> Saved Programs
              </h3>

              {bookmarkedExams.length > 0 ? (
                <div className="space-y-2">
                  {bookmarkedExams.map((e) => (
                    <div key={e.id} className="p-3 bg-slate-50/70 dark:bg-slate-950/40 rounded-xl border border-slate-150 dark:border-slate-850 flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-[11px] text-slate-800 dark:text-slate-200 leading-snug">{e.name}</h4>
                        <span className="text-[8px] text-slate-400 uppercase font-black tracking-wide">{e.category}</span>
                      </div>
                      <button
                        onClick={() => onToggleBookmark(e.id)}
                        className="text-[9px] font-black text-rose-500 uppercase shrink-0 hover:scale-105 active:scale-95 transition"
                      >
                        Unsave
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs font-semibold">
                  Bookmark checklist empty.
                </div>
              )}
            </div>

            {/* Downloads */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-600" /> Syllabus PDF Downloads
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => alert('Syllabus PDF successfully downloaded.')}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase text-slate-700 dark:text-slate-350 hover:bg-slate-50 transition flex items-center justify-between"
                >
                  <span>📚 UPSC Syllabus (GS 1-4).pdf</span>
                  <Download className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => alert('General Aptitude Syllabus guide successfully downloaded.')}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase text-slate-700 dark:text-slate-350 hover:bg-slate-50 transition flex items-center justify-between"
                >
                  <span>📝 GATE Aptitude Guide.pdf</span>
                  <Download className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          SUB-TAB 2: INTERACTIVE CALENDAR WITH SCHEDULE INTEGRATION
          ---------------------------------------------------- */}
      {subTab === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in text-left">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600 animate-pulse" /> Daily Study Grid & Scheduler
                </h3>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 uppercase">
                  Selected Date: {selectedDate}
                </span>
              </div>

              {/* Monthly Calendar View (Simplified elegant grid for current month) */}
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-1 text-center font-black text-[9px] uppercase text-slate-400 tracking-wider">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
                
                {/* 35-day grid mimicking current month layout */}
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 28 }).map((_, idx) => {
                    const dayNum = idx + 1;
                    const dateStr = `2026-06-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                    const hasEvents = calendarEvents.some(ev => ev.date === dateStr);
                    const isSelected = selectedDate === dateStr;
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`aspect-square p-2 rounded-xl border font-bold text-xs flex flex-col justify-between items-center transition duration-150 ${
                          isSelected 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-150 dark:border-slate-850 text-slate-800 dark:text-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <span>{dayNum}</span>
                        {hasEvents && (
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-blue-600 dark:bg-blue-400'} animate-pulse`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Scheduled slots for selected day */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Study Slots Scheduled for {selectedDate}</h4>
              
              <div className="space-y-3">
                {calendarEvents.filter(ev => ev.date === selectedDate).length > 0 ? (
                  calendarEvents.filter(ev => ev.date === selectedDate).map((ev) => (
                    <div key={ev.id} className="p-4 bg-slate-50/70 dark:bg-slate-950/30 rounded-xl border border-slate-150 dark:border-slate-850/60 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleEventCompleted(ev.id)}
                          className={`p-1.5 rounded-lg border transition ${
                            ev.completed 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : 'border-slate-300 text-transparent hover:border-slate-400'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <div>
                          <h5 className={`font-extrabold text-xs text-slate-800 dark:text-slate-150 ${ev.completed ? 'line-through text-slate-400 italic' : ''}`}>
                            {ev.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 font-bold">{ev.duration} Minutes Revision Block</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteEvent(ev.id)}
                        className="text-slate-400 hover:text-rose-500 transition shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No revisions scheduled on this date. Book a custom session slot below!</p>
                )}
              </div>
            </div>
          </div>

          {/* Booking / Add Event form */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-blue-600" /> Book Revision Block
              </h4>
              
              <form onSubmit={handleAddCalendarEvent} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-450 uppercase">Topic / Lecture Target</label>
                  <input
                    type="text"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="e.g., GS-I Medieval India Revision"
                    required
                    className="w-full text-xs font-semibold p-2.5 border border-slate-250 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-450 uppercase">Session Duration</label>
                  <select
                    value={newEventDuration}
                    onChange={(e) => setNewEventDuration(e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 border border-slate-250 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                  >
                    <option value="30">30 Minutes Blitz</option>
                    <option value="60">60 Minutes Standard</option>
                    <option value="90">90 Minutes Deep-dive</option>
                    <option value="120">120 Minutes Marathon</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition"
                >
                  Confirm Event Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          SUB-TAB 3: STUDY ANALYTICS (GORGEOUS SVG-BASED VIRTUAL GRAPHS)
          ---------------------------------------------------- */}
      {subTab === 'analytics' && (
        <div className="space-y-8 animate-fade-in text-left">
          
          {/* Bento-grid summary statistic blocks */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Revision Time</span>
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">{(totalStudyMinutes / 60).toFixed(1)} Hours</h4>
              </div>
              <Clock className="w-8 h-8 text-blue-600 opacity-80" />
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Average Score Rate</span>
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">{averageQuizScore}%</h4>
              </div>
              <Award className="w-8 h-8 text-emerald-600 opacity-80" />
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Mock Tests Taken</span>
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">{completedQuizzesCount} Runs</h4>
              </div>
              <CheckCircle className="w-8 h-8 text-amber-500 opacity-80" />
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Active Streaks</span>
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">{streakCount} Days</h4>
              </div>
              <Flame className="w-8 h-8 text-rose-500 opacity-80" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Subject Readiness metrics (Custom SVG bar chart) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Subject-wise Syllabus Readiness</h3>
              
              <div className="space-y-4 pt-2">
                {[
                  { name: 'Polity & Governance', score: 85, color: 'bg-blue-600' },
                  { name: 'History & Culture', score: 62, color: 'bg-indigo-500' },
                  { name: 'General Aptitude (CSAT)', score: 92, color: 'bg-emerald-500' },
                  { name: 'Science & Technology', score: 78, color: 'bg-amber-500' },
                  { name: 'Environmental Science', score: 50, color: 'bg-rose-500' },
                ].map((subject, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-350">
                      <span>{subject.name}</span>
                      <span>{subject.score}% Ready</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${subject.color} rounded-full transition duration-300`} style={{ width: `${subject.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Study hours analytics (Beautiful custom SVG bar chart) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Weekly Study Allocation (Minutes)</h3>
              
              {/* Custom SVG Bar Graph */}
              <div className="h-44 flex items-end justify-between gap-4 pt-4 px-2 border-b border-slate-150 dark:border-slate-800">
                {[
                  { label: 'Mon', mins: 120, height: 'h-[60%]' },
                  { label: 'Tue', mins: 150, height: 'h-[75%]' },
                  { label: 'Wed', mins: 90, height: 'h-[45%]' },
                  { label: 'Thu', mins: 180, height: 'h-[90%]' },
                  { label: 'Fri', mins: 60, height: 'h-[30%]' },
                  { label: 'Sat', mins: 210, height: 'h-[100%]' },
                  { label: 'Sun', mins: 120, height: 'h-[60%]' },
                ].map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                    <div className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition">{day.mins}m</div>
                    <div className={`w-full ${day.height} bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 rounded-t-lg transition-all duration-300`} />
                    <span className="text-[10px] font-extrabold text-slate-500 mt-1">{day.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          SUB-TAB 4: EMAIL & PUSH NOTIFICATIONS CENTER
          ---------------------------------------------------- */}
      {subTab === 'notifications' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in text-left">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <BellRing className="w-5 h-5 text-blue-600 animate-swing" /> Study Alert Control Panel
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-150 dark:border-slate-850">
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-150">Immediate Push Notifications</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Show real-time dashboard notifications for study plan shifts.</p>
                  </div>
                  <button
                    onClick={() => {
                      setPushEnabled(!pushEnabled);
                      triggerToast('Preference Updated', `Push alerts ${!pushEnabled ? 'Enabled' : 'Disabled'}`);
                    }}
                    className={`w-12 h-6 rounded-full p-1 transition duration-200 ${
                      pushEnabled ? 'bg-blue-600 flex justify-end' : 'bg-slate-300 flex justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-slate-450 uppercase">Notification Frequency</label>
                  <select
                    value={reminderFrequency}
                    onChange={(e) => {
                      setReminderFrequency(e.target.value);
                      triggerToast('Interval Set', `We will notify you: ${e.target.value}`);
                    }}
                    className="w-full text-xs font-semibold p-2.5 border border-slate-250 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                  >
                    <option>Daily Morning (8:00 AM)</option>
                    <option>Daily Evening (8:00 PM)</option>
                    <option>Twice Daily (Morning & Evening)</option>
                    <option>Weekend Revision Digests Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Test alert trigger simulator */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Active Simulation Center</h4>
              <p className="text-xs text-slate-400">Trigger simulated push / email notifications to audit alignment configurations on this device immediately.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => triggerToast('Study Alert: GS Polity 📖', 'Time to revise Fundamental Rights! Your scheduled 60-minute Polity block is starting now.')}
                  className="p-4 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-2xl hover:bg-blue-100 transition text-center border border-blue-200/50 dark:border-blue-900"
                >
                  Simulate Push Alert (Polity)
                </button>
                <button
                  onClick={() => triggerToast('Admit Card Released! 🎟️', 'Exam Notification: UPSC Civil Services 2026 prelims admit card is now live. Access dates inside.')}
                  className="p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-2xl hover:bg-emerald-100 transition text-center border border-emerald-200/50 dark:border-emerald-900"
                >
                  Simulate Push Alert (Exam Dates)
                </button>
              </div>
            </div>
          </div>

          {/* Setup tips panel */}
          <div className="space-y-6">
            <div className="bg-slate-50/70 dark:bg-slate-950/45 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4">
              <h4 className="font-extrabold text-xs text-slate-450 uppercase tracking-wider">Liaison Setup Instructions</h4>
              
              <div className="space-y-3 text-[11px] leading-relaxed font-semibold text-slate-600 dark:text-slate-350">
                <p>1. **Secure Session**: Verify that you are fully authenticated at the top. This guarantees your bookmarks and study trackers are securely locked to your account.</p>
                <p>2. **Gmail Routing**: Ensure your designated email address matches your profile setting to enable automated syllabus PDF updates.</p>
                <p>3. **Spaced Repetition**: We audit your quiz errors and auto-schedule revision alerts at 8:00 AM on weekdays to avoid preparation fatigue.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          SUB-TAB 5: PROFILE & SECURITY SETTINGS
          ---------------------------------------------------- */}
      {subTab === 'profile' && user && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in text-left">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Edit Profile Panel */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" /> Personal Information
              </h3>

              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const updated = await AuthService.updateProfile({
                    fullName: profName,
                    mobileNumber: profMobile,
                    country: profCountry,
                    state: profState,
                    qualification: profQual,
                    preferredCategory: profCategory
                  });
                  onUpdateUser(updated);
                  triggerToast('Profile Updated! ✨', 'Your personal parameters and preferences have been securely saved.');
                } catch (err: any) {
                  alert(err.message || 'Failed to update profile');
                }
              }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-450 uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profName}
                      onChange={(e) => setProfName(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 border border-slate-250 dark:border-slate-850 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-450 uppercase">Mobile Number</label>
                    <input
                      type="tel"
                      value={profMobile}
                      onChange={(e) => setProfMobile(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 border border-slate-250 dark:border-slate-850 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-450 uppercase">Country</label>
                    <input
                      type="text"
                      required
                      value={profCountry}
                      onChange={(e) => setProfCountry(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 border border-slate-250 dark:border-slate-850 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-450 uppercase">State / UT</label>
                    <select
                      required
                      value={profState}
                      onChange={(e) => setProfState(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 border border-slate-250 dark:border-slate-850 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    >
                      <option value="" disabled>Select State / UT</option>
                      {indianStates.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-450 uppercase">Qualification</label>
                    <select
                      required
                      value={profQual}
                      onChange={(e) => setProfQual(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 border border-slate-250 dark:border-slate-850 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    >
                      <option value="" disabled>Select Qualification</option>
                      <option value="12th Pass">Class 12th Pass</option>
                      <option value="Graduate">Undergraduate / Graduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                      <option value="Law Graduate">Law Graduate (LLB/LLM)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-450 uppercase">Preferred Category</label>
                    <select
                      required
                      value={profCategory}
                      onChange={(e) => setProfCategory(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 border border-slate-250 dark:border-slate-850 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    >
                      {examCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition"
                >
                  Save Profile Information
                </button>
              </form>
            </div>

            {/* Change Password Panel */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-600" /> Security Settings
              </h3>

              <form onSubmit={async (e) => {
                e.preventDefault();
                if (newPass !== confirmNewPass) {
                  alert('New passwords do not match');
                  return;
                }
                try {
                  await AuthService.changePassword({ currentPassword: currentPass, newPassword: newPass });
                  setCurrentPass('');
                  setNewPass('');
                  setConfirmNewPass('');
                  triggerToast('Password Changed! 🔐', 'Your password has been successfully updated.');
                } catch (err: any) {
                  alert(err.message || 'Failed to change password');
                }
              }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-450 uppercase">Current Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 border border-slate-250 dark:border-slate-850 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-450 uppercase">New Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 border border-slate-250 dark:border-slate-850 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-450 uppercase">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmNewPass}
                      onChange={(e) => setConfirmNewPass(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 border border-slate-250 dark:border-slate-850 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition"
                >
                  Change Account Password
                </button>
              </form>
            </div>
          </div>

          {/* Account Portability & Destructive Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Download className="w-4 h-4 text-indigo-600" /> Data Portability
              </h4>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                Export all your study logs, planners, mock test score cards, and bookmark histories into a single JSON packet instantly.
              </p>
              <button
                onClick={async () => {
                  try {
                    const data = await AuthService.exportData();
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `examverse-student-data-${user?.id || 'export'}.json`;
                    link.click();
                    URL.revokeObjectURL(url);
                    triggerToast('Data Exported! 📥', 'Your profile database packet was prepared and downloaded successfully.');
                  } catch (err: any) {
                    alert('Export failed: ' + err.message);
                  }
                }}
                className="w-full py-2.5 border border-slate-250 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                Download Export Package (.json)
              </button>
            </div>

            <div className="bg-red-50/40 dark:bg-red-950/10 border border-red-200 dark:border-red-950/40 rounded-3xl p-6 shadow-xs space-y-4">
              <h4 className="font-extrabold text-sm text-red-700 dark:text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-600" /> Danger Zone
              </h4>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                Deleting your account will irreversibly erase your custom planners, consecutive study streaks, bookmarks, and auth session.
              </p>
              
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  Delete My Account
                </button>
              ) : (
                <div className="space-y-3 pt-2">
                  <p className="text-[10px] text-red-600 dark:text-red-400 font-bold uppercase">To verify, type your email: "{user?.email}"</p>
                  <input
                    type="text"
                    placeholder="student@examverse.com"
                    value={deleteInputEmail}
                    onChange={(e) => setDeleteInputEmail(e.target.value)}
                    className="w-full text-xs font-semibold p-2 border border-red-250 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-200"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (deleteInputEmail.toLowerCase() !== user?.email.toLowerCase()) {
                          alert('Email confirmation does not match');
                          return;
                        }
                        try {
                          await AuthService.deleteAccount();
                          onLogout();
                        } catch (err: any) {
                          alert(err.message || 'Failed to delete account');
                        }
                      }}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition"
                    >
                      Confirm Delete
                    </button>
                    <button
                      onClick={() => { setShowDeleteConfirm(false); setDeleteInputEmail(''); }}
                      className="flex-1 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
