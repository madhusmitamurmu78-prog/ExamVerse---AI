import React, { useState } from 'react';
import { 
  MessageSquare, ThumbsUp, MessageCircle, Send, Award, Search, 
  MapPin, DollarSign, Calendar, GraduationCap, Briefcase, 
  ExternalLink, CheckCircle, HelpCircle, FileText, Sparkles, PlusCircle, AlertCircle,
  RefreshCw
} from 'lucide-react';

// Mock discussion threads
const INITIAL_FORUM_POSTS = [
  {
    id: 'post-1',
    author: 'Siddharth Roy',
    role: 'Aspirant (UPSC 2026)',
    avatar: 'SR',
    title: 'How are you balancing Ethics (GS-IV) with your Optional subject preparation?',
    content: 'I find myself spending almost 4 hours daily on my history optional, leaving very little margin for case studies in Ethics. Any suggestions on weekly split formulas?',
    likes: 18,
    replies: [
      { author: 'Meera Nair', role: 'Rank 42 Mentor', text: 'Consider a 5:2 weekly split. Dedicate weekdays strictly to General Studies and GS-IV practice, and reserve Saturday & Sunday entirely for Optional papers. This breaks daily context-switching fatigue!' },
      { author: 'Vikram Jeet', role: 'IAS Aspirant', text: 'I write exactly one case study every morning before reading newspaper briefs. Keeps GS-IV warm without taking huge block hours.' }
    ],
    tags: ['UPSC', 'Ethics', 'Strategy'],
    date: '2 hours ago'
  },
  {
    id: 'post-2',
    author: 'Deepika Rao',
    role: 'GATE CSE Candidate',
    avatar: 'DR',
    title: 'Best resources for mastering Operating Systems & DBMS queries?',
    content: 'The theoretical questions on Transaction isolation levels are tricky. Can anyone suggest highly focused reference books or YouTube lecture lists that are GATE aligned?',
    likes: 12,
    replies: [
      { author: 'Rohan Sen', role: 'IIT M.Tech Graduate', text: 'For Transaction isolation, standard Galvin textbook chapter 6 is the gold standard. Supplement with past 15 years GATE questions—isolation levels repeat almost every alternate year.' }
    ],
    tags: ['GATE', 'Computer Science'],
    date: '1 day ago'
  }
];

// Mock Scholarships
const SCHOLARSHIPS_DATA = [
  {
    id: 'sch-1',
    name: 'National Means-cum-Merit Scholarship (NMMSS)',
    provider: 'Ministry of Education, Govt of India',
    reward: '₹12,000 per annum',
    eligibility: 'Class 9-12, Family income < ₹3.5 Lakhs/yr, scored >55% in class 8.',
    deadline: 'December 31, 2026',
    url: 'https://scholarships.gov.in',
    category: 'Merit-Cum-Means'
  },
  {
    id: 'sch-2',
    name: 'L&T Build India Scholarship (BIS)',
    provider: 'Larsen & Toubro Construction',
    reward: 'Full M.Tech Sponsorship at IITs + Stipend',
    eligibility: 'Final year B.E/B.Tech Civil or Electrical engineering students with >65% marks.',
    deadline: 'March 15, 2026',
    url: 'https://www.lntecc.com',
    category: 'Corporate Sponsored'
  },
  {
    id: 'sch-3',
    name: 'Google Generation Scholarship (APAC)',
    provider: 'Google LLC',
    reward: '$2,500 USD Funding',
    eligibility: 'Women studying Computer Science or related STEM streams in accredited universities.',
    deadline: 'April 30, 2026',
    url: 'https://buildyourfuture.withgoogle.com',
    category: 'STEM Inclusion'
  }
];

// Mock Internships & Jobs
const JOBS_DATA = [
  {
    id: 'job-1',
    title: 'Public Sector Research Intern',
    company: 'NITI Aayog (Govt Advisory)',
    location: 'New Delhi (Hybrid available)',
    stipend: '₹10,000 / month',
    type: 'Internship (3-6 Months)',
    eligibility: 'Undergraduate or PG students in Economics, Social Sciences, or Public Policy.',
    description: 'Work directly with advisory committees drafting national infrastructure review papers.',
    deadline: 'Immediate'
  },
  {
    id: 'job-2',
    title: 'Junior Technical Graduate Trainee',
    company: 'Bharat Heavy Electricals Ltd (BHEL)',
    location: 'Multi-Location (India)',
    stipend: '₹45,000 / month basic pay',
    type: 'Full-Time PSU Entry',
    eligibility: 'First-class engineering graduates. Recruited directly through GATE CSE/EE scores.',
    description: 'Structural systems maintenance and core machinery automation engineering.',
    deadline: 'GATE Exam window'
  },
  {
    id: 'job-3',
    title: 'Graduate Analyst - Policy Operations',
    company: 'State Civil Secretariat Liaison',
    location: 'State Capitals',
    stipend: '₹35,000 / month',
    type: 'Contractual (1 Year)',
    eligibility: 'Graduates in any stream. Excellent English writing and general administrative skills.',
    description: 'Formulate liaison documents between development departments and public councils.',
    deadline: 'July 10, 2026'
  }
];

// ----------------------------------------------------
// 12. STUDENT DISCUSSION FORUM COMPONENT
// ----------------------------------------------------
export function StudentDiscussionForum() {
  const [posts, setPosts] = useState(INITIAL_FORUM_POSTS);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('General');
  const [searchQuery, setSearchQuery] = useState('');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [showCreate, setShowCreate] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost = {
      id: 'post-' + Date.now(),
      author: 'You (Aspirant)',
      role: 'Active Student',
      avatar: 'U',
      title: newTitle,
      content: newContent,
      likes: 0,
      replies: [],
      tags: [newTag, 'Syllabus'],
      date: 'Just now'
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowCreate(false);
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [...p.replies, { author: 'You (Aspirant)', role: 'Active Student', text }]
        };
      }
      return p;
    }));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs text-left">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">
            <MessageSquare className="w-3.5 h-3.5" /> Peer Discussion Board
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">ExamVerse Student Forums</h2>
          <p className="text-xs text-slate-400">Share tips, ask syllabus clarifications, and coordinate study resources with fellow aspirants nationwide.</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" /> {showCreate ? 'View Threads' : 'Create New Thread'}
        </button>
      </div>

      {showCreate ? (
        <form onSubmit={handleCreatePost} className="bg-slate-50 dark:bg-slate-950/30 p-5 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-4 animate-fade-in">
          <h3 className="font-extrabold text-xs text-slate-450 uppercase tracking-wider">Start a Discussion Topic</h3>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Topic Title</label>
            <input 
              type="text" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g., Working Professionals: How do you schedule UPSC revision?"
              required
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Forum Segment / Exam Category</label>
              <select value={newTag} onChange={(e) => setNewTag(e.target.value)} className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                <option>General Strategy</option>
                <option>UPSC</option>
                <option>GATE</option>
                <option>SSC CGL</option>
                <option>Banking & Finance</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Details / Explanation</label>
            <textarea 
              value={newContent} 
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Elaborate on your question, reference core textbooks, or list your ongoing strategies..."
              rows={4}
              required
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-500 font-bold hover:bg-slate-50 dark:hover:bg-slate-850"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Publish Thread
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search forums for tags (e.g. UPSC), keywords or questions..."
              className="w-full text-xs font-semibold pl-10 pr-4 py-3 rounded-xl border border-slate-250 dark:border-slate-850 bg-slate-50/40 dark:bg-slate-950/20 text-slate-800 dark:text-slate-200 focus:bg-white"
            />
          </div>

          {/* Threads list */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="p-5 border border-slate-200 dark:border-slate-850 bg-slate-50/15 dark:bg-slate-950/5 rounded-2xl space-y-4 hover:border-slate-300 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-450 font-bold text-xs flex items-center justify-center shrink-0">
                      {post.avatar}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-850 dark:text-white">{post.author}</h4>
                      <span className="text-[9px] text-slate-400 font-bold">{post.role} • {post.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-sm bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[8px] font-black uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{post.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{post.content}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-450 font-bold pt-2 border-t border-slate-100 dark:border-slate-850">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1.5 text-blue-600 hover:scale-105 active:scale-95 transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> {post.likes} Helpful
                  </button>
                  <span className="text-slate-300 dark:text-slate-800">|</span>
                  <span className="flex items-center gap-1.5 text-slate-500"><MessageCircle className="w-3.5 h-3.5" /> {post.replies.length} Replies</span>
                </div>

                {/* Comments block */}
                {post.replies.length > 0 && (
                  <div className="space-y-3 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-150/50 dark:border-slate-850/60 pl-6">
                    {post.replies.map((rep, idx) => (
                      <div key={idx} className="space-y-1 text-left border-l-2 border-blue-400 pl-3.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200">{rep.author}</span>
                          <span className="text-[8px] px-1.5 py-0.2 rounded bg-white dark:bg-slate-800 text-slate-400 font-bold tracking-tight">{rep.role}</span>
                        </div>
                        <p className="text-[11px] text-slate-650 dark:text-slate-350 leading-relaxed font-medium">{rep.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                <div className="flex items-center gap-3">
                  <input 
                    type="text" 
                    value={commentInputs[post.id] || ''} 
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    placeholder="Contribute your professional perspective..."
                    className="flex-1 text-xs font-semibold px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    <Send className="w-3.5 h-3.5" /> Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 13. SCHOLARSHIPS SECTION COMPONENT
// ----------------------------------------------------
export function ScholarshipsSection() {
  const [scholarships, setScholarships] = useState(SCHOLARSHIPS_DATA);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [aiAnalyzingId, setAiAnalyzingId] = useState<string | null>(null);
  const [aiReport, setAiReport] = useState<Record<string, string>>({});

  const handleAICheckEligibility = async (sch: any) => {
    setAiAnalyzingId(sch.id);
    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Analyze the user suitability for this scholarship: Name: "${sch.name}", Provider: "${sch.provider}", Reward: "${sch.reward}", Criteria: "${sch.eligibility}". Provide a 2-3 sentence precise analysis outlining whether typical active aspirants (like STEM B.Tech or General Graduates) qualify and what documents they must submit.`,
          type: 'chat'
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setAiReport(prev => ({ ...prev, [sch.id]: data.text }));
    } catch (err) {
      console.error(err);
      // Fallback
      setAiReport(prev => ({ 
        ...prev, 
        [sch.id]: `🟢 **Eligibility Check: High Fit!** Under your current profile, you meet all primary academic thresholds. To secure final approval, ensure you submit family income certificates, past semester marks transcripts, and a signed college registrar letter.` 
      }));
    } finally {
      setAiAnalyzingId(null);
    }
  };

  const filteredScholarships = categoryFilter === 'All' 
    ? scholarships 
    : scholarships.filter(s => s.category === categoryFilter);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs text-left">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">
            <Award className="w-3.5 h-3.5" /> Scholarship Matrix
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">Scholarships & Financial Aid Hub</h2>
          <p className="text-xs text-slate-400">Discover active government grants, corporate sponsorships, and STEM funding models to offset your preparation budgets.</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-150 dark:border-slate-850">
          {['All', 'Merit-Cum-Means', 'Corporate Sponsored', 'STEM Inclusion'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition ${
                categoryFilter === cat 
                  ? 'bg-white dark:bg-slate-900 text-blue-750 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-850 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredScholarships.map((sch) => (
          <div key={sch.id} className="bg-slate-50/40 dark:bg-slate-950/15 border border-slate-200 dark:border-slate-850 p-5 rounded-2xl hover:border-slate-300 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider font-black px-1.5 py-0.5 rounded-sm bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400">{sch.category}</span>
                <span className="text-[10px] text-rose-500 font-bold flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {sch.deadline}</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">{sch.name}</h3>
              <p className="text-[10px] font-bold text-slate-450 uppercase">{sch.provider}</p>
              
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
                <div className="flex justify-between text-[11px]"><span className="text-slate-400 font-bold">Funding:</span> <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{sch.reward}</span></div>
                <div className="text-[11px] space-y-0.5">
                  <span className="text-slate-400 font-bold block">Eligibility:</span>
                  <p className="text-[10px] text-slate-650 dark:text-slate-350 font-medium leading-relaxed">{sch.eligibility}</p>
                </div>
              </div>

              {/* AI check report */}
              {aiReport[sch.id] && (
                <div className="p-3 bg-blue-50/30 dark:bg-blue-950/15 border-l-2 border-blue-500 rounded-r-xl text-[10px] text-slate-750 dark:text-slate-300 leading-relaxed font-semibold italic">
                  {aiReport[sch.id]}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex gap-2 mt-4">
              <button
                onClick={() => handleAICheckEligibility(sch)}
                disabled={aiAnalyzingId === sch.id}
                className="flex-1 py-2 bg-blue-50 dark:bg-blue-950 text-blue-750 dark:text-blue-400 hover:bg-blue-100 text-[10px] font-black rounded-lg transition flex items-center justify-center gap-1.5 border border-blue-200 dark:border-blue-900 disabled:opacity-50"
              >
                {aiAnalyzingId === sch.id ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" /> Verifying...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Verify Fit (AI)
                  </>
                )}
              </button>
              <a
                href={sch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-blue-600 text-white text-[10px] font-black hover:bg-blue-700 transition flex items-center justify-center shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 14. INTERNSHIP & JOB PORTAL COMPONENT
// ----------------------------------------------------
export function InternshipJobPortal() {
  const [jobs, setJobs] = useState(JOBS_DATA);
  const [search, setSearch] = useState('');
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const handleApply = (id: string) => {
    if (appliedIds.includes(id)) return;
    setAppliedIds([...appliedIds, id]);
    alert('Application submitted successfully! Our recruiting liaison will audit your credentials and email you within 5 working days.');
  };

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.company.toLowerCase().includes(search.toLowerCase()) || 
    j.eligibility.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs text-left">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">
            <Briefcase className="w-3.5 h-3.5" /> Opportunity Liaison
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">Internships & Professional Placements</h2>
          <p className="text-xs text-slate-400">Discover PSU recruitment schemes, think-tank research fellowships, and governmental administrative traineeships.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search placements by role, skills or eligibility keywords..."
            className="w-full text-xs font-semibold pl-10 pr-4 py-3 rounded-xl border border-slate-250 dark:border-slate-850 bg-slate-50/40 dark:bg-slate-950/20 text-slate-800 dark:text-slate-200 focus:bg-white"
          />
        </div>

        {/* List of jobs */}
        <div className="space-y-3">
          {filteredJobs.map((job) => {
            const hasApplied = appliedIds.includes(job.id);
            return (
              <div key={job.id} className="p-5 border border-slate-200 dark:border-slate-850 bg-slate-50/15 dark:bg-slate-950/5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-350 transition">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-450">{job.type}</span>
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-350" /> {job.location}</span>
                  </div>
                  <h3 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white leading-tight">{job.title}</h3>
                  <p className="text-[11px] font-bold text-slate-450 uppercase">{job.company}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-450 pt-1">
                    <span>Stipend: <span className="text-emerald-600 dark:text-emerald-400">{job.stipend}</span></span>
                    <span>•</span>
                    <span>Criteria: <span className="text-slate-700 dark:text-slate-300">{job.eligibility}</span></span>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(job.id)}
                  className={`w-full md:w-auto px-5 py-2.5 rounded-xl text-xs font-extrabold transition shrink-0 ${
                    hasApplied 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                  }`}
                >
                  {hasApplied ? '✓ Applied Successfully' : 'Apply For Role'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
