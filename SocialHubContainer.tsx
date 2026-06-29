import React, { useState } from 'react';
import { 
  Users, MessageSquare, Award, Briefcase, Sparkles
} from 'lucide-react';
import { 
  StudentDiscussionForum, ScholarshipsSection, InternshipJobPortal 
} from './SocialHub';

export default function SocialHubContainer() {
  const [activeSubTab, setActiveSubTab] = useState<'forum' | 'scholarships' | 'internships'>('forum');

  const tabs = [
    { id: 'forum', label: 'Peer Forums', icon: MessageSquare, desc: 'Aspirants discussions' },
    { id: 'scholarships', label: 'Scholarships & Aid', icon: Award, desc: 'Financial opportunities' },
    { id: 'internships', label: 'Think-Tank & PSUs', icon: Briefcase, desc: 'Internships and job feeds' },
  ] as const;

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-700 via-teal-800 to-cyan-950 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xs">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-[10px] font-black uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> Aspirants Ecosystem Liaison
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none">ExamVerse Social & Placements</h1>
          <p className="text-xs md:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            Collaborate on strategy briefs with fellow exam candidates, locate government-supported student grants, and apply directly to think-tanks, advisory councils, and contractual PSU liaison postings.
          </p>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`p-4 rounded-2xl border text-left transition duration-200 group relative overflow-hidden ${
                isActive
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/10'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className={`p-2.5 rounded-xl ${
                  isActive ? 'bg-white/15 text-white' : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-450 group-hover:scale-110 transition duration-200'
                }`}>
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                {isActive && (
                  <span className="absolute right-3 top-3 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                )}
              </div>
              <h3 className="font-extrabold text-xs tracking-tight leading-snug">{tab.label}</h3>
              <p className={`text-[10px] font-semibold ${isActive ? 'text-emerald-150' : 'text-slate-400'}`}>{tab.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Sub Component render */}
      <div className="transition-all duration-300">
        {activeSubTab === 'forum' && <StudentDiscussionForum />}
        {activeSubTab === 'scholarships' && <ScholarshipsSection />}
        {activeSubTab === 'internships' && <InternshipJobPortal />}
      </div>
    </div>
  );
}
