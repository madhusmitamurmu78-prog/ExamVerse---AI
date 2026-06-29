import { useState } from 'react';
import { Exam, ApplicationTracker } from '../types';
import {
  X,
  Calendar,
  BookOpen,
  BookMarked,
  Award,
  DollarSign,
  FileText,
  HelpCircle,
  ExternalLink,
  MapPin,
  ClipboardList,
  Flame,
  Bookmark,
  Share2,
  ListOrdered,
  PlusCircle,
  FileCheck2,
  Brain,
  Play
} from 'lucide-react';

interface ExamDetailsProps {
  exam: Exam;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (examId: string) => void;
  trackerStatus?: string;
  onUpdateTracker: (examId: string, status: ApplicationTracker['status']) => void;
  onGenerateStudyPlan: (exam: Exam) => void;
  onStartQuiz: (exam: Exam) => void;
}

type TabType = 'overview' | 'syllabus' | 'dates' | 'strategy' | 'resources' | 'faqs';

export default function ExamDetails({
  exam,
  onClose,
  isBookmarked,
  onToggleBookmark,
  trackerStatus = 'planning',
  onUpdateTracker,
  onGenerateStudyPlan,
  onStartQuiz,
}: ExamDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview & Eligibility' },
    { id: 'syllabus', label: 'Pattern & Syllabus' },
    { id: 'dates', label: 'Dates & Administrative' },
    { id: 'strategy', label: 'Prep Strategy' },
    { id: 'resources', label: 'Mocks & Past Papers' },
    { id: 'faqs', label: 'FAQs' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-end p-0 md:p-4">
      {/* Detail Slideout Drawer */}
      <div className="w-full md:max-w-4xl h-full md:h-[95vh] bg-white dark:bg-slate-900 rounded-none md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-in relative">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="space-y-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
              {exam.category}
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {exam.name}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
              Official Website: <a href={exam.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-medium">{exam.officialWebsite} <ExternalLink className="w-3 h-3" /></a>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="details-bookmark-btn"
              onClick={() => onToggleBookmark(exam.id)}
              className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={isBookmarked ? 'Remove Bookmark' : 'Save Exam'}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
            </button>
            <button
              id="details-close-btn"
              onClick={onClose}
              className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 overflow-x-auto bg-white dark:bg-slate-900 scrollbar-none flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-semibold tracking-wide whitespace-nowrap border-b-2 transition-all relative ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50/50 dark:bg-slate-950/20">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Short Description */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{exam.shortDescription}</p>
              </div>

              {/* Eligibility & Nationality Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600" /> Eligibility Criteria
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-slate-400 font-medium">Age Limit:</span>
                      <p className="text-slate-700 dark:text-slate-300 font-semibold">{exam.eligibility.ageLimit}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Educational Qualification:</span>
                      <p className="text-slate-700 dark:text-slate-300 font-semibold">{exam.eligibility.educationalQualification}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Nationality:</span>
                      <p className="text-slate-700 dark:text-slate-300 font-semibold">{exam.eligibility.nationality}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-500" /> Career & Salary
                  </h4>
                  <div className="space-y-3 text-sm">
                    {exam.salary ? (
                      <div>
                        <span className="text-slate-400 font-medium">Starting Remuneration:</span>
                        <p className="text-slate-700 dark:text-slate-300 font-semibold">{exam.salary}</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-slate-400 font-medium">Category:</span>
                        <p className="text-slate-700 dark:text-slate-300 font-semibold">Professional Industry Certification</p>
                      </div>
                    )}
                    <div>
                      <span className="text-slate-400 font-medium">Vacancy Outlook:</span>
                      <p className="text-slate-700 dark:text-slate-300 font-semibold">{exam.vacancyDetails || 'N/A'}</p>
                    </div>
                    {exam.eligibility.reservationDetails && (
                      <div>
                        <span className="text-slate-400 font-medium">Reservations:</span>
                        <p className="text-slate-700 dark:text-slate-300 font-semibold">{exam.eligibility.reservationDetails}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Selection Process Flow */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-amber-500" /> Selection Process Stages
                </h4>
                <div className="space-y-4">
                  {exam.selectionProcess.map((stage, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 text-sm font-medium pt-0.5">{stage}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Administrative Contact Info */}
              <div className="bg-slate-100 dark:bg-slate-850 p-4 rounded-xl flex items-start gap-3 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-700 dark:text-slate-300 block mb-1">Official Contact Information:</strong>
                  {exam.officialContactInfo}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="space-y-6">
              {/* Exam Pattern Table */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Exam Pattern & Marks Division</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-medium">
                        <th className="pb-3">Subject / Stage</th>
                        <th className="pb-3">Questions</th>
                        <th className="pb-3">Total Marks</th>
                        <th className="pb-3">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                      {exam.examPattern.map((p, idx) => (
                        <tr key={idx} className="text-slate-700 dark:text-slate-300">
                          <td className="py-3.5 font-semibold">{p.subject}</td>
                          <td className="py-3.5">{p.questions}</td>
                          <td className="py-3.5">{p.marks}</td>
                          <td className="py-3.5">{p.duration || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Comprehensive Syllabus Sections */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Detailed Syllabus</h4>
                {exam.syllabus.map((s, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                    <h5 className="text-base font-bold text-blue-600 dark:text-blue-400">{s.stage}</h5>
                    <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                      {s.topics.map((t, tIdx) => (
                        <li key={tIdx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Highly Important High-Yield Topics */}
              <div className="bg-rose-50/50 dark:bg-rose-950/10 p-6 rounded-2xl border border-rose-100/50 dark:border-rose-900/20">
                <h4 className="text-sm font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-500 animate-pulse" /> High-Yield Important Topics (Crucial)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exam.importantTopics.map((topic, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300 font-semibold">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dates' && (
            <div className="space-y-6">
              {/* Detailed Timeline Table */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" /> Exam Cycle Timeline (2026)
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 py-2 border-b border-slate-200 dark:border-slate-800 text-sm">
                    <span className="text-slate-400">Application Starts</span>
                    <strong className="text-slate-800 dark:text-slate-200">{exam.dates.applicationStart}</strong>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b border-slate-200 dark:border-slate-800 text-sm">
                    <span className="text-slate-400">Last Date to Apply</span>
                    <strong className="text-slate-800 dark:text-slate-200">{exam.dates.applicationLastDate}</strong>
                  </div>
                  {exam.dates.correctionWindow && (
                    <div className="grid grid-cols-2 py-2 border-b border-slate-200 dark:border-slate-800 text-sm">
                      <span className="text-slate-400">Correction Window</span>
                      <strong className="text-slate-800 dark:text-slate-200">{exam.dates.correctionWindow}</strong>
                    </div>
                  )}
                  {exam.dates.admitCardRelease && (
                    <div className="grid grid-cols-2 py-2 border-b border-slate-200 dark:border-slate-800 text-sm">
                      <span className="text-slate-400">Admit Card Release</span>
                      <strong className="text-slate-800 dark:text-slate-200">{exam.dates.admitCardRelease}</strong>
                    </div>
                  )}
                  <div className="grid grid-cols-2 py-2 border-b border-slate-200 dark:border-slate-800 text-sm">
                    <span className="text-slate-400">Scheduled Exam Date</span>
                    <strong className="text-blue-600 dark:text-blue-400 font-extrabold">{exam.dates.examDate}</strong>
                  </div>
                  {exam.dates.answerKeyRelease && (
                    <div className="grid grid-cols-2 py-2 border-b border-slate-200 dark:border-slate-800 text-sm">
                      <span className="text-slate-400">Answer Key Release</span>
                      <strong className="text-slate-800 dark:text-slate-200">{exam.dates.answerKeyRelease}</strong>
                    </div>
                  )}
                  {exam.dates.resultDate && (
                    <div className="grid grid-cols-2 py-2 border-b border-slate-200 dark:border-slate-800 text-sm">
                      <span className="text-slate-400">Expected Result Date</span>
                      <strong className="text-slate-800 dark:text-slate-200">{exam.dates.resultDate}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Administrative Fees Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Application Fees & Exemptions</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl text-center">
                    <span className="text-slate-400 text-xs font-semibold block mb-1">General / OBC Candidates</span>
                    <strong className="text-lg text-slate-800 dark:text-white">₹{exam.applicationFees.general}</strong>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl text-center">
                    <span className="text-slate-400 text-xs font-semibold block mb-1">Reserved SC / ST / Female</span>
                    <strong className="text-lg text-slate-800 dark:text-white">₹{exam.applicationFees.reserved}</strong>
                  </div>
                </div>
                {exam.applicationFees.details && (
                  <p className="text-xs text-slate-400 leading-relaxed italic">{exam.applicationFees.details}</p>
                )}
              </div>

              {/* Required Documents Checklist */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Required Documents for Application</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {exam.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-850 p-3 rounded-lg text-slate-700 dark:text-slate-300">
                      <FileCheck2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-medium">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step How to Apply */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Step-by-Step Application Guide</h4>
                <div className="relative border-l border-blue-100 dark:border-blue-950/40 pl-6 ml-3 space-y-6">
                  {exam.howToApply.map((step, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-9.5 top-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold">
                        {idx + 1}
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'strategy' && (
            <div className="space-y-6">
              {/* Strategy Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Preparation Strategy</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{exam.preparationStrategy}</p>
              </div>

              {/* Recommended Reading / Books */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Highly Recommended Best Books</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exam.bestBooks.map((book, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
                      <div className="w-12 h-14 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                        B{idx + 1}
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-800 dark:text-white text-sm">{book.title}</h5>
                        <p className="text-xs text-slate-400">By {book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              {/* Previous Years Papers */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Previous Years Question Papers (PYQs)</h4>
                {exam.pyqPapers.length > 0 ? (
                  <div className="space-y-3">
                    {exam.pyqPapers.map((paper, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-850 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <h5 className="font-semibold text-slate-800 dark:text-white text-sm">{paper.title}</h5>
                            <span className="text-[10px] text-slate-400 uppercase font-semibold">Year {paper.year}</span>
                          </div>
                        </div>
                        <button
                          id={`pyq-download-${idx}`}
                          onClick={() => alert(`Beginning download of ${paper.title} PDF metadata...`)}
                          className="px-3.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-bold transition"
                        >
                          Download PDF
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">Certification exam, PYQ papers are protected by NDAs.</p>
                )}
              </div>

              {/* Live Interactive Mock Tests */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Interactive Mock Tests</h4>
                <div className="space-y-3">
                  {exam.mockTests.map((mock, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-850 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                      <div className="flex items-center gap-3">
                        <ClipboardList className="w-5 h-5 text-blue-600" />
                        <div>
                          <h5 className="font-semibold text-slate-800 dark:text-white text-sm">{mock.title}</h5>
                          <span className="text-xs text-slate-400">{mock.questionsCount} Questions • {mock.durationMinutes} Minutes</span>
                        </div>
                      </div>
                      <button
                        id={`mock-start-${mock.id}`}
                        onClick={() => onStartQuiz(exam)}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
                      >
                        <Play className="w-3.5 h-3.5" /> Start Mock
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Frequently Asked Questions</h4>
              {exam.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <div className="flex gap-2 items-start text-blue-600 dark:text-blue-400">
                    <HelpCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">{faq.question}</h5>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm pl-7 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Action Panel Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Application Status:</span>
            <select
              id="tracker-status-select"
              value={trackerStatus}
              onChange={(e) => onUpdateTracker(exam.id, e.target.value as ApplicationTracker['status'])}
              className="text-xs font-bold rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-1.5 px-3 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="planning">📋 Planning / Interested</option>
              <option value="applied">✍️ Applied / Submitted</option>
              <option value="admit_card">🎟️ Admit Card Obtained</option>
              <option value="exam_done">✅ Exam Conducted</option>
              <option value="result_announced">🏆 Result Announced</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="details-studyplan-btn"
              onClick={() => onGenerateStudyPlan(exam)}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-linear-to-r from-blue-600 to-sky-600 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 hover:shadow-md hover:brightness-110 active:scale-98 transition"
            >
              <Brain className="w-4 h-4" /> Create Study Plan (AI)
            </button>
            <button
              id="details-startquiz-btn"
              onClick={() => onStartQuiz(exam)}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 transition"
            >
              <Play className="w-4 h-4" /> Start Custom Quiz
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
