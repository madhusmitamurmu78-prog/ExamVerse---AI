import React from 'react';
import { Exam } from '../types';
import { Calendar, BookOpen, Clock, ChevronRight, Bookmark, Landmark, Wallet } from 'lucide-react';

interface ExamCardProps {
  exam: Exam;
  onSelect: (exam: Exam) => void;
  isBookmarked: boolean;
  onToggleBookmark: any;
}

export default function ExamCard({ exam, onSelect, isBookmarked, onToggleBookmark }: any): any {
  // Simple countdown calculation
  const getDaysLeft = (dateStr: string) => {
    const examDate = new Date(dateStr);
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysLeft(exam.dates.examDate);

  return (
    <div
      onClick={() => onSelect(exam)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900 transition-all cursor-pointer duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            {exam.category}
          </span>
          <button
            id={`bookmark-btn-${exam.id}`}
            onClick={(e) => onToggleBookmark(exam.id, e)}
            className="text-slate-400 hover:text-rose-500 p-1.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
          {exam.name}
        </h3>

        {/* Short Description */}
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6">
          {exam.shortDescription}
        </p>

        {/* Quick Details List */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
            <Landmark className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Qual: <strong className="text-slate-700 dark:text-slate-300">{exam.eligibility.educationalQualification}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Age Limit: <strong className="text-slate-700 dark:text-slate-300">{exam.eligibility.ageLimit}</strong></span>
          </div>
          {exam.salary && (
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
              <Wallet className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Salary: <strong className="text-slate-700 dark:text-slate-300">{exam.salary}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Dates Section */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">Exam Date</span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            {exam.dates.examDate}
          </span>
        </div>

        {/* Days Left Countdown Banner */}
        {daysLeft > 0 ? (
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
            {daysLeft} days left
          </span>
        ) : daysLeft === 0 ? (
          <span className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
            Today
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold">
            Concluded
          </span>
        )}
      </div>
    </div>
  );
}
