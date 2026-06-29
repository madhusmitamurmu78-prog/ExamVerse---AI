import { useState } from 'react';
import {
  Settings,
  Plus,
  Trash2,
  Edit3,
  BellRing,
  BarChart3,
  CheckCircle,
  FileText,
  PieChart,
  Grid,
  FileMinus,
  Save,
  UserCheck
} from 'lucide-react';
import { Exam, NotificationItem, ApplicationTracker, UserProfile } from '../types';
import { AuthService } from '../lib/authService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell
} from 'recharts';

interface AdminDashboardProps {
  exams: Exam[];
  onAddExam: (exam: Exam) => void;
  onEditExam: (id: string, updatedExam: Partial<Exam>) => void;
  onDeleteExam: (id: string) => void;
  onAddNotification: (notif: Partial<NotificationItem>) => void;
  trackers: ApplicationTracker[];
}

export default function AdminDashboard({
  exams,
  onAddExam,
  onEditExam,
  onDeleteExam,
  onAddNotification,
  trackers,
}: AdminDashboardProps) {
  // Tabs
  const [activeSubTab, setActiveSubTab] = useState<'exams' | 'notifs' | 'analytics' | 'users'>('exams');

  // Real administrative user state
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [adminStats, setAdminStats] = useState<{
    totalUsers: number;
    verifiedUsers: number;
    adminUsers: number;
    popularCategory: string;
    registrationsByDate: { date: string; count: number }[];
  } | null>(null);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [toastAlert, setToastAlert] = useState<{ show: boolean; title: string; message: string }>({ show: false, title: '', message: '' });

  // Load actual admin data
  const loadAdminMetadata = async () => {
    setIsFetchingUsers(true);
    setFetchError('');
    try {
      const [fetchedUsers, fetchedAnalytics] = await Promise.all([
        AuthService.adminGetUsers(),
        AuthService.adminGetAnalytics()
      ]);
      setUsersList(fetchedUsers);
      setAdminStats(fetchedAnalytics.stats);
    } catch (err: any) {
      console.error(err);
      setFetchError(err.message || 'Failed to sync administrative parameters.');
    } finally {
      setIsFetchingUsers(false);
    }
  };

  useState(() => {
    loadAdminMetadata();
  });

  const triggerToast = (title: string, message: string) => {
    setToastAlert({ show: true, title, message });
    setTimeout(() => {
      setToastAlert(prev => ({ ...prev, show: false }));
    }, 4500);
  };

  // Exam Form State
  const [isAddingExam, setIsAddingExam] = useState(false);
  const [editingExamId, setEditingExamId] = useState<string | null>(null);

  // New Exam fields
  const [examId, setExamId] = useState('');
  const [examName, setExamName] = useState('');
  const [examCategory, setExamCategory] = useState('UPSC');
  const [shortDesc, setShortDesc] = useState('');
  const [ageLimit, setAgeLimit] = useState('');
  const [qual, setQual] = useState('');
  const [nationality, setNationality] = useState('Citizen of India');
  const [examDate, setExamDate] = useState('2026-08-01');
  const [generalFees, setGeneralFees] = useState(100);
  const [reservedFees, setReservedFees] = useState(0);

  // Notification form
  const [notifTitle, setNotifTitle] = useState('');
  const [notifExamId, setNotifExamId] = useState('');
  const [notifType, setNotifType] = useState<'admit_card' | 'result' | 'update'>('update');
  const [notifDesc, setNotifDesc] = useState('');
  const [notifStatus, setNotifStatus] = useState('');

  // Handle Exam submit
  const handleSaveExam = () => {
    if (!examId || !examName) {
      alert('Please fill out unique Exam ID and Exam Name.');
      return;
    }

    const newExam: Exam = {
      id: examId,
      name: examName,
      category: examCategory,
      shortDescription: shortDesc,
      eligibility: {
        ageLimit,
        educationalQualification: qual,
        nationality,
        reservationDetails: 'As per central standards.',
      },
      selectionProcess: ['Written Objective Test', 'Interview / Skill assessment'],
      examPattern: [
        { subject: 'Syllabus Paper 1', questions: 100, marks: 100, duration: '2 Hours' },
      ],
      syllabus: [
        { stage: 'Stage I', topics: ['General Awareness', 'Reasoning & Quantitative Basics'] },
      ],
      importantTopics: ['Basic Aptitude', 'Static GK', 'Current Events'],
      preparationStrategy: 'Consistently review recommended books and solve past year mocks.',
      bestBooks: [{ title: 'Exam Comprehensive Manual', author: 'Expert Board' }],
      pyqPapers: [],
      mockTests: [{ id: `${examId}-mock-1`, title: `${examName} Full Mock`, questionsCount: 100, durationMinutes: 120 }],
      dates: {
        applicationStart: new Date().toISOString().split('T')[0],
        applicationLastDate: '2026-07-15',
        examDate,
      },
      applicationFees: {
        general: generalFees,
        reserved: reservedFees,
      },
      requiredDocuments: ['Aadhar Card', 'Secondary School Marksheet'],
      howToApply: ['Visit official board web portal', 'Complete personal profile', 'Make application payments'],
      officialWebsite: 'https://example-board.gov.in',
      officialContactInfo: 'Support Desk, Gov Block, New Delhi',
      faqs: [{ question: 'Is calculator permitted?', answer: 'No.' }],
    };

    onAddExam(newExam);
    setIsAddingExam(false);
    resetExamForm();
    alert('Exam successfully added to ExamVerse AI directory!');
  };

  const resetExamForm = () => {
    setExamId('');
    setExamName('');
    setShortDesc('');
    setAgeLimit('');
    setQual('');
    setExamDate('2026-08-01');
    setGeneralFees(100);
  };

  const handlePostNotification = () => {
    if (!notifTitle || !notifDesc) {
      alert('Title and description are required.');
      return;
    }

    onAddNotification({
      title: notifTitle,
      examId: notifExamId,
      type: notifType,
      description: notifDesc,
    });

    setNotifTitle('');
    setNotifDesc('');
    setNotifStatus('🔔 Notification successfully broadcasted to live students!');
    setTimeout(() => setNotifStatus(''), 4000);
  };

  // ----------------------------------------------------
  // VISUAL ANALYTICS CHART CALCULATIONS
  // ----------------------------------------------------

  // 1. Vacancy distribution data
  const chartVacancyData = exams.map((e) => {
    let rawVacancies = 500;
    if (e.id === 'upsc-cse') rawVacancies = 1100;
    else if (e.id === 'ssc-cgl') rawVacancies = 8500;
    else if (e.id === 'jee-advanced') rawVacancies = 17300;
    else if (e.id === 'neet-ug') rawVacancies = 108000;
    else if (e.id === 'cat-exam') rawVacancies = 5500;
    else if (e.id === 'ojee') rawVacancies = 35000;
    else if (e.id === 'cuet-ug') rawVacancies = 250000;
    else if (e.id === 'cuet-pg') rawVacancies = 80000;

    return {
      name: e.id.toUpperCase(),
      Vacancies: rawVacancies,
    };
  });

  // 2. Prep Status distribution
  const statusCounts = {
    planning: 4,
    applied: 2,
    admit_card: 1,
    exam_done: 3,
    result_announced: 1,
  };

  trackers.forEach((t) => {
    if (statusCounts[t.status] !== undefined) {
      statusCounts[t.status]++;
    }
  });

  const chartPrepStatusData = [
    { name: 'Planning / Interested', value: statusCounts.planning },
    { name: 'Applied / Submitted', value: statusCounts.applied },
    { name: 'Admit Card Issued', value: statusCounts.admit_card },
    { name: 'Exams Written', value: statusCounts.exam_done },
    { name: 'Result Announced', value: statusCounts.result_announced },
  ];

  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#10b981'];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
      {/* Control panel title */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-950/40">
        <div className="flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Administrative Portal</h2>
            <p className="text-xs text-slate-400">Add/remove catalogs, publish alerts, and review structural analytics</p>
          </div>
        </div>

        {/* Sub nav buttons */}
        <div className="flex gap-2 border border-slate-200 dark:border-slate-800 p-1 rounded-2xl bg-white dark:bg-slate-900 overflow-x-auto">
          <button
            id="admin-sub-exams"
            onClick={() => setActiveSubTab('exams')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeSubTab === 'exams'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <Grid className="w-4 h-4" /> Exams Directory
          </button>
          <button
            id="admin-sub-notifs"
            onClick={() => setActiveSubTab('notifs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeSubTab === 'notifs'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <BellRing className="w-4 h-4" /> Broadcast Alerts
          </button>
          <button
            id="admin-sub-analytics"
            onClick={() => setActiveSubTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeSubTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Analytics Visualizer
          </button>
          <button
            id="admin-sub-users"
            onClick={() => setActiveSubTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeSubTab === 'users'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Student Registrations
          </button>
        </div>
      </div>

      {toastAlert.show && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 shadow-2xl flex items-start gap-3 animate-fade-in">
          <div className="p-2 bg-emerald-600 rounded-xl shrink-0">
            <CheckCircle className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div className="space-y-1 text-left">
            <h4 className="font-extrabold text-xs text-white leading-tight">{toastAlert.title}</h4>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{toastAlert.message}</p>
          </div>
        </div>
      )}

      <div className="p-6 md:p-8">
        
        {/* SUBTAB 1: MANAGING EXAMS */}
        {activeSubTab === 'exams' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Active Exam Catalog ({exams.length})</h3>
              <button
                id="admin-new-exam-toggle"
                onClick={() => setIsAddingExam(!isAddingExam)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" /> Add New Exam
              </button>
            </div>

            {/* Addition Form */}
            {isAddingExam && (
              <div className="p-6 border border-blue-100 dark:border-blue-950 bg-blue-50/20 dark:bg-slate-950/40 rounded-2xl space-y-4">
                <h4 className="text-sm font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Publish New Exam Listing</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Unique ID (lowercase-hyphen)</label>
                    <input
                      id="new-exam-id"
                      type="text"
                      placeholder="e.g., ssc-chsl"
                      value={examId}
                      onChange={(e) => setExamId(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-850 p-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-slate-500">Official Exam Name</label>
                    <input
                      id="new-exam-name"
                      type="text"
                      placeholder="e.g., SSC Combined Higher Secondary Level Exam"
                      value={examName}
                      onChange={(e) => setExamName(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-850 p-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Stream Category</label>
                    <select
                      id="new-exam-category"
                      value={examCategory}
                      onChange={(e) => setExamCategory(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-850 p-2.5 bg-white dark:bg-slate-900 text-slate-800"
                    >
                      <option value="UPSC">UPSC</option>
                      <option value="SSC">SSC</option>
                      <option value="Banking">Banking</option>
                      <option value="Railways">Railways</option>
                      <option value="Engineering">Engineering</option>
                      <option value="CUET">CUET</option>
                      <option value="Engineering Entrance Exams">Engineering Entrance</option>
                      <option value="Medical Entrance Exams">Medical Entrance</option>
                      <option value="Management Exams">Management Exams</option>
                      <option value="IT Certification Exams">IT Certification</option>
                      <option value="International Exams">International Exams</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Educational Criteria</label>
                    <input
                      id="new-exam-qual"
                      type="text"
                      placeholder="e.g., Passed 10+2 standard board"
                      value={qual}
                      onChange={(e) => setQual(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-850 p-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Age Limit range</label>
                    <input
                      id="new-exam-age"
                      type="text"
                      placeholder="e.g., 18 to 27 years"
                      value={ageLimit}
                      onChange={(e) => setAgeLimit(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-850 p-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-3">
                    <label className="font-bold text-slate-500">Short Summary Description</label>
                    <textarea
                      id="new-exam-desc"
                      placeholder="Provide general information regarding ministry, duties, or vacancies..."
                      value={shortDesc}
                      onChange={(e) => setShortDesc(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-850 p-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 h-20"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    id="new-exam-cancel"
                    onClick={() => setIsAddingExam(false)}
                    className="px-4 py-2 rounded-xl text-slate-500 bg-slate-50 hover:bg-slate-100 text-xs font-bold transition"
                  >
                    Cancel
                  </button>
                  <button
                    id="new-exam-save"
                    onClick={handleSaveExam}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1"
                  >
                    <Save className="w-4 h-4" /> Save and Publish
                  </button>
                </div>
              </div>
            )}

            {/* List with deletion options */}
            <div className="border border-slate-200 dark:border-slate-850 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-850 text-xs">
              {exams.map((e) => (
                <div key={e.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-950/20 transition">
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-white text-sm">{e.name}</h5>
                    <div className="flex items-center gap-3 text-slate-400 mt-1">
                      <span>ID: <strong>{e.id}</strong></span>
                      <span>Category: <strong>{e.category}</strong></span>
                    </div>
                  </div>
                  <button
                    id={`admin-exam-delete-${e.id}`}
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${e.name} from ExamVerse database?`)) {
                        onDeleteExam(e.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-850 text-slate-400 hover:text-rose-600 dark:hover:bg-rose-950/20 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 2: BROADCASTING NOTIFICATIONS */}
        {activeSubTab === 'notifs' && (
          <div className="space-y-6 max-w-xl">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Broadcast Custom Notification Update</h3>
              <p className="text-xs text-slate-400">Post updates directly to students' dashboards (such as results, admit cards, or application launches).</p>
            </div>

            {notifStatus && (
              <div className="p-3 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>{notifStatus}</span>
              </div>
            )}

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-500">Alert Title</label>
                <input
                  id="admin-notif-title"
                  type="text"
                  placeholder="e.g., SSC CGL Tier 1 Marks Out Now"
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-850 p-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Target Exam ID</label>
                  <select
                    id="admin-notif-exam"
                    value={notifExamId}
                    onChange={(e) => setNotifExamId(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-850 p-2.5 bg-white dark:bg-slate-900 text-slate-800"
                  >
                    <option value="">General Notice</option>
                    {exams.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Alert Classification</label>
                  <select
                    id="admin-notif-type"
                    value={notifType}
                    onChange={(e) => setNotifType(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-850 p-2.5 bg-white dark:bg-slate-900 text-slate-800"
                  >
                    <option value="update">📋 Process Update</option>
                    <option value="admit_card">🎟️ Admit Card Release</option>
                    <option value="result">🏆 Result Declaration</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500">Brief Description</label>
                <textarea
                  id="admin-notif-desc"
                  placeholder="Details of the announcement, links, steps for candidates..."
                  value={notifDesc}
                  onChange={(e) => setNotifDesc(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-850 p-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 h-24"
                />
              </div>

              <button
                id="admin-notif-broadcast"
                onClick={handlePostNotification}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition flex items-center justify-center gap-1.5"
              >
                <BellRing className="w-4 h-4 animate-bounce" /> Broadcast Announcement
              </button>
            </div>
          </div>
        )}

        {/* SUBTAB 3: INTERACTIVE D3/RECHARTS CHARTS */}
        {activeSubTab === 'analytics' && (
          <div className="space-y-8">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800 dark:text-white font-extrabold flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-600" /> Administrative Metrics & Distribution
              </h3>
              <p className="text-xs text-slate-400">Review critical statistics regarding seat openings and tracking student prep lifecycles.</p>
            </div>

            {/* Admin Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Users</span>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{adminStats?.totalUsers ?? usersList.length}</h4>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Verified Accounts</span>
                <h4 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{adminStats?.verifiedUsers ?? usersList.filter(u => u.isVerified).length}</h4>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Administrators</span>
                <h4 className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{adminStats?.adminUsers ?? usersList.filter(u => u.role === 'admin').length}</h4>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Popular Category</span>
                <h4 className="text-sm font-black text-blue-600 dark:text-blue-400 mt-2 truncate">{adminStats?.popularCategory ?? 'Law Exams'}</h4>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Bar Chart - Vacancies Count */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-850">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 text-center">Announced Vacancy Volumes across Portfolios (2026)</h4>
                <div className="w-full h-64 text-xs font-semibold">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartVacancyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ borderRadius: 8 }} />
                      <Legend />
                      <Bar dataKey="Vacancies" fill="#2563eb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart - Active prep stages */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-850 flex flex-col justify-between flex-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 text-center">Active Student Preparation Lifecycles</h4>
                <div className="w-full h-64 text-xs font-semibold flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RPieChart>
                      <Pie
                        data={chartPrepStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartPrepStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: 8 }} />
                    </RPieChart>
                  </ResponsiveContainer>
                </div>
                {/* Custom Legend */}
                <div className="grid grid-cols-2 gap-2 text-[10px] mt-4 text-left">
                  {chartPrepStatusData.map((d, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[index] }} />
                      <span className="text-slate-500 font-bold">{d.name}: <strong>{d.value}</strong></span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SUBTAB 4: STUDENT USER REGISTRATIONS MANAGEMENT */}
        {activeSubTab === 'users' && (
          <div className="space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-indigo-600 animate-pulse" /> Student Account Directory
                </h3>
                <p className="text-xs text-slate-400">Review registrations, manage authorization roles, and audit verification states.</p>
              </div>
              <button
                onClick={loadAdminMetadata}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-extrabold rounded-xl hover:bg-slate-200 transition"
              >
                Sync Directory Logs
              </button>
            </div>

            {fetchError && (
              <div className="p-4 bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-300 border border-red-200/50 rounded-2xl text-xs font-semibold">
                ⚠️ {fetchError}
              </div>
            )}

            {isFetchingUsers ? (
              <div className="text-center py-12 text-xs font-extrabold text-slate-400">
                Syncing database schemas... Please wait.
              </div>
            ) : (
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                        <th className="p-4">Student</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Education / Target</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
                      {usersList.length > 0 ? (
                        usersList.map((u) => (
                          <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-black text-sm rounded-xl flex items-center justify-center">
                                  {u.fullName[0].toUpperCase()}
                                </div>
                                <div>
                                  <h5 className="font-extrabold text-slate-900 dark:text-white leading-tight">{u.fullName}</h5>
                                  <span className="text-[10px] text-slate-400 font-medium leading-none">{u.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="block font-bold">{u.state || 'N/A'}</span>
                              <span className="text-[9px] text-slate-400 uppercase font-black tracking-wide">{u.country || 'India'}</span>
                            </td>
                            <td className="p-4">
                              <span className="block font-bold">{u.qualification || 'N/A'}</span>
                              <span className="text-[10px] text-indigo-600 dark:text-indigo-450 uppercase font-black tracking-wider">{u.preferredCategory}</span>
                            </td>
                            <td className="p-4 space-y-1">
                              <div className="flex flex-col gap-1 items-start">
                                <span className={`inline-flex px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full ${
                                  u.role === 'admin' 
                                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400' 
                                    : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-400'
                                }`}>
                                  {u.role}
                                </span>
                                <span className={`inline-flex px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full ${
                                  u.isVerified 
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' 
                                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                                }`}>
                                  {u.isVerified ? 'Verified' : 'Unverified'}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={async () => {
                                    const nextRole = u.role === 'admin' ? 'student' : 'admin';
                                    if (confirm(`Change ${u.fullName}'s role to ${nextRole.toUpperCase()}?`)) {
                                      try {
                                        const updated = await AuthService.adminUpdateUser(u.id, { role: nextRole });
                                        setUsersList(usersList.map(curr => curr.id === u.id ? updated : curr));
                                        triggerToast('Access Updated! 🛡️', `Assigned administrative privileges to ${u.fullName} successfully.`);
                                      } catch (err: any) {
                                        alert(err.message || 'Failed to update privileges.');
                                      }
                                    }
                                  }}
                                  className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-[10px] font-black rounded-lg text-slate-650 dark:text-slate-300 uppercase tracking-tight transition"
                                >
                                  Toggle Role
                                </button>
                                <button
                                  onClick={async () => {
                                    if (confirm(`DANGER: Are you sure you want to permanently delete user ${u.fullName}?`)) {
                                      try {
                                        await AuthService.adminDeleteUser(u.id);
                                        setUsersList(usersList.filter(curr => curr.id !== u.id));
                                        triggerToast('Account Purged! 💀', `Account of ${u.fullName} was permanently deleted.`);
                                      } catch (err: any) {
                                        alert(err.message || 'Failed to purge account.');
                                      }
                                    }
                                  }}
                                  className="p-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 rounded-lg text-rose-600 transition"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-12 text-slate-400 text-xs font-bold">
                            No student registration records detected in local directory storage.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}


      </div>
    </div>
  );
}
