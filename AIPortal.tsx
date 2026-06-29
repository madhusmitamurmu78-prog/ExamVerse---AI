import React, { useState } from 'react';
import { 
  Sparkles, Brain, Briefcase, User, FileText, Award, HelpCircle, GraduationCap
} from 'lucide-react';
import { 
  AICareerCounselor, AIResumeBuilder, AIInterviewPrep, AINotesGenerator, AIFlashcards 
} from './AIPortalModules';

interface AIPortalProps {
  exams: any[];
}

export default function AIPortal({ exams }: AIPortalProps) {
  const [activeSubTab, setActiveSubTab] = useState<'career' | 'resume' | 'interview' | 'notes' | 'flashcards'>('career');

  const tabs = [
    { id: 'career', label: 'Career Counselor', icon: Brain, desc: 'Profile analytics' },
    { id: 'resume', label: 'Resume Optimizer', icon: Briefcase, desc: 'Professional CV draft' },
    { id: 'interview', label: 'Interview Board', icon: User, desc: 'Speech voice prep' },
    { id: 'notes', label: 'Notes Generator', icon: FileText, desc: 'Syllabus summaries' },
    { id: 'flashcards', label: 'Study Flashcards', icon: Award, desc: 'Active recall desks' },
  ] as const;

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* Header Overview Banner */}
      <div className="bg-linear-to-r from-blue-700 via-blue-800 to-indigo-900 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xs">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> Advanced Cognitive Prep Engine
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none">ExamVerse AI Studio</h1>
          <p className="text-xs md:text-sm text-blue-100 max-w-2xl leading-relaxed">
            Unleash LLM-powered deep syllabus notes, active flashcard revision decks, AI interview panels with voice feedback, and professional CV generators tailored strictly for public sector commissions and competitive tests.
          </p>
        </div>
      </div>

      {/* Sub-tab Navigation Pills */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`p-4 rounded-2xl border text-left transition duration-200 group relative overflow-hidden ${
                isActive
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className={`p-2.5 rounded-xl ${
                  isActive ? 'bg-white/15 text-white' : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition duration-200'
                }`}>
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                {isActive && (
                  <span className="absolute right-3 top-3 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                )}
              </div>
              <h3 className="font-extrabold text-xs tracking-tight leading-snug">{tab.label}</h3>
              <p className={`text-[10px] font-semibold ${isActive ? 'text-blue-150' : 'text-slate-400'}`}>{tab.desc}</p>
            </button>
          );
        })}
      </div>

      {/* active Sub Component Content Area */}
      <div className="transition-all duration-300">
        {activeSubTab === 'career' && <AICareerCounselor exams={exams} />}
        {activeSubTab === 'resume' && <AIResumeBuilder />}
        {activeSubTab === 'interview' && <AIInterviewPrep />}
        {activeSubTab === 'notes' && <AINotesGenerator exams={exams} />}
        {activeSubTab === 'flashcards' && <AIFlashcards />}
      </div>
    </div>
  );
}
