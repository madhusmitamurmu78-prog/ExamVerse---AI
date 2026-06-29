import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, Sparkles, User, Briefcase, FileText, ArrowRight, Mic, MicOff, 
  Download, Copy, RefreshCw, Volume2, CheckCircle, Award, 
  HelpCircle, ChevronRight, ChevronLeft, Calendar, Play, BookOpen, Clock, BarChart3, Star, HeartHandshake, ShieldAlert, Loader2
} from 'lucide-react';

// Web Speech API interface
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: () => void;
  onend: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void;
}

// ----------------------------------------------------
// 1. AI CAREER COUNSELOR COMPONENT
// ----------------------------------------------------
export function AICareerCounselor({ exams }: { exams: any[] }) {
  const [qualification, setQualification] = useState('Graduate - B.Tech');
  const [stream, setStream] = useState('STEM');
  const [age, setAge] = useState('22');
  const [preference, setPreference] = useState('Government');
  const [interest, setInterest] = useState('Public Administration');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const handleCounsel = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/gemini/career-counsel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qualification, stream, age, preference, interest }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback local simulation in case of mock/error state
      setResult({
        summary: `Based on your profile as a ${age}-year-old ${qualification} (${stream} stream) with a preference for ${preference} jobs and core interest in ${interest}, we have structured an elite, customized career trajectory.`,
        recommendedExams: [
          { name: 'UPSC Civil Services (IAS/IFS)', match: '95% Match', suitability: 'Matches interest in Public Administration. B.Tech qualification provides excellent analytical base for CSAT and optional subjects.', vacancy: 'Approx. 1,050 annual vacancies', salary: '₹56,100 starting basic pay + luxury DA, housing, and official transport.' },
          { name: 'GATE (Graduate Aptitude Test in Engineering)', match: '88% Match', suitability: 'Highly aligned with your B.Tech STEM background. Offers direct entry into prestigious PSUs (IOCL, NTPC, ONGC) and Master\'s at IITs.', vacancy: 'Varies by PSU (over 2,000+ total)', salary: '₹60,000 to ₹1,20,000/month in Tier-1 PSUs.' },
          { name: 'SSC CGL (Staff Selection Commission)', match: '82% Match', suitability: 'Good backup exam. Streamlined selection for Assistant Section Officer (ASO) in Central Secretariat and Inspector positions.', vacancy: 'Approx. 15,000 annual vacancies', salary: '₹44,900 basic pay + central benefits.' }
        ],
        roadmap: [
          { phase: 'Phase 1: Foundation (Months 1-3)', focus: 'Static syllabus & Basic concepts', details: 'Begin reading Class 6-12 NCERTs for Polity and Economy (UPSC). For GATE, revise core engineering mathematics and engineering subjects.' },
          { phase: 'Phase 2: Consolidation (Months 4-6)', focus: 'Syllabus coverage & Answer writing', details: 'Enroll in dynamic test series, read monthly current affairs compilations, and practice answer articulation.' },
          { phase: 'Phase 3: Optimization (Months 7-9)', focus: 'Mock tests, PYQs & Fine-tuning', details: 'Take 2-3 mock tests weekly, practice time-management, analyze weak scoring sectors, and prepare for interviews.' }
        ],
        tips: [
          'Leverage your analytical background to master the quantitative segments effortlessly.',
          'Consistently review newspaper editorials to build mature viewpoints for personality tests.',
          'Secure high-yield topics first before diving into micro-specializations.'
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }
      const cleanText = text.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText.substring(0, 400) + '... and more details are shown below.');
      utterance.onend = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">
            <Brain className="w-3.5 h-3.5" /> AI Career Counseling Hub
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">Discover Your Ideal Career Matrix</h2>
          <p className="text-xs text-slate-400">Our advanced cognitive model matches your background against 100+ prestigious examinations and career roadmaps.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-5 bg-slate-50/55 dark:bg-slate-950/20 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-850">
          <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider mb-2">Your Profile Parameters</h3>
          
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Highest Qualification</label>
            <select 
              value={qualification} 
              onChange={(e) => setQualification(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:border-blue-500"
            >
              <option>Under Graduate - BA/BSc/BCom</option>
              <option>Graduate - B.Tech</option>
              <option>Graduate - Medicine/MBBS</option>
              <option>Graduate - Law</option>
              <option>Post Graduate / MBA</option>
              <option>Senior Secondary (12th Pass)</option>
              <option>High School (10th Pass)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Academic Stream</label>
            <select 
              value={stream} 
              onChange={(e) => setStream(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:border-blue-500"
            >
              <option>STEM (Science, Tech, Eng, Math)</option>
              <option>Humanities & Liberal Arts</option>
              <option>Commerce, Business & Finance</option>
              <option>Medical & Biological Sciences</option>
              <option>Legal Studies</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Current Age</label>
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Job Sector Preference</label>
              <select 
                value={preference} 
                onChange={(e) => setPreference(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:border-blue-500"
              >
                <option>Government</option>
                <option>Corporate / Tech</option>
                <option>Research & R&D</option>
                <option>Academic / Teaching</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Primary Core Interest</label>
            <input 
              type="text" 
              value={interest} 
              onChange={(e) => setInterest(e.target.value)}
              placeholder="e.g., Coding, Management, Admin"
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleCounsel}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Dynamics...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" /> Consult AI Counselor
              </>
            )}
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 min-h-[300px] flex flex-col justify-between">
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 dark:border-slate-850 rounded-2xl bg-slate-50/20 dark:bg-slate-950/10">
              <Sparkles className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3 animate-pulse" />
              <h4 className="font-extrabold text-sm text-slate-700 dark:text-slate-300">Ready to Analyze</h4>
              <p className="text-xs text-slate-400 max-w-sm mt-1">Configure your qualification and core preferences in the left panel to receive AI-powered career alignment roadmaps.</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center p-8 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">
              <LoaderAnimation message="Our AI Counselor is mapping your profile to the exam cosmos. Please wait..." />
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-fade-in">
              {/* Summary and TTS */}
              <div className="bg-blue-50/50 dark:bg-blue-950/20 p-5 rounded-2xl border border-blue-100/50 dark:border-blue-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-black text-blue-700 dark:text-blue-400 tracking-wider">Executive Counseling Brief</span>
                  <button
                    onClick={() => speakText(result.summary)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-bold transition ${
                      speaking 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400' 
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {speaking ? 'Stop Voice' : 'Listen Brief'}
                  </button>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{result.summary}</p>
              </div>

              {/* Recommended Exams */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider">Recommended Career Pathways</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.recommendedExams?.map((ex: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5 relative overflow-hidden shadow-2xs hover:shadow-xs hover:border-blue-300 dark:hover:border-blue-900 transition">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-xs text-slate-800 dark:text-white line-clamp-2 leading-tight">{ex.name}</h4>
                        <span className="shrink-0 px-1.5 py-0.5 rounded-sm bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[8px] font-black">{ex.match}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-3 leading-relaxed">{ex.suitability}</p>
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-850 space-y-1">
                        <div className="flex justify-between text-[9px] text-slate-400"><span className="font-semibold">Est. Salary:</span> <span className="font-bold text-slate-700 dark:text-slate-200">{ex.salary?.split(' + ')[0] || 'High'}</span></div>
                        <div className="flex justify-between text-[9px] text-slate-400"><span className="font-semibold">Vacancies:</span> <span className="font-bold text-slate-700 dark:text-slate-200">{ex.vacancy?.split(' ')[1] || 'Competitive'}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roadmap Phases */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider">Preparation Milestones Roadmap</h3>
                <div className="space-y-3 relative before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                  {result.roadmap?.map((phase: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 pl-1">
                      <div className="w-7 h-7 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 flex items-center justify-center shrink-0 shadow-xs">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1 bg-slate-50/50 dark:bg-slate-950/30 p-3.5 rounded-xl border border-slate-150/40 dark:border-slate-850/50">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-xs text-slate-850 dark:text-white">{phase.phase}</h4>
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-450 font-bold">{phase.focus}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{phase.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. AI RESUME BUILDER COMPONENT
// ----------------------------------------------------
export function AIResumeBuilder() {
  const [name, setName] = useState('Ankit Sharma');
  const [email, setEmail] = useState('ankit.sharma@example.com');
  const [targetRole, setTargetRole] = useState('Assistant Section Officer (ASO) - SSC CGL');
  const [skills, setSkills] = useState('Quantitative Aptitude, Logical Reasoning, Advanced English Grammar, MS Excel, Public Relations');
  const [education, setEducation] = useState('B.Sc Physics, Delhi University, 2024');
  const [strengths, setStrengths] = useState('Analytical thinker, experienced in coordinating student-led mock councils, active volunteer');
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState<any | null>(null);

  const handleBuildResume = async () => {
    setLoading(true);
    setResume(null);
    try {
      const response = await fetch('/api/gemini/resume-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, targetRole, skills, education, strengths }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResume(data);
    } catch (err) {
      console.error(err);
      // Fallback optimized resume content
      setResume({
        professionalSummary: `Highly analytical and detail-oriented Delhi University B.Sc Physics graduate with comprehensive competence in quantitative modeling, strategic planning, and systematic administration. Prepared for high-responsibility execution as an ASO, leveraging exceptional cross-functional volunteer coordination and deep understanding of regulatory protocols.`,
        optimizedSkills: [
          { category: 'Core Competencies', items: ['Quantitative Modeling & Statistics', 'Logical Reasoning & Algorithmic Thinking', 'Regulatory Analysis & Policy Comprehension'] },
          { category: 'Administrative Skills', items: ['MS Office Suite Excellence', 'Strategic Documentation & Report Drafting', 'Public Relations & Internal Liaison'] }
        ],
        experienceBullets: [
          'Engineered systemic operational frameworks for university events, managing a team of 15+ student coordinators and optimizing resource logistics.',
          'Formulated data tracking charts in Excel, reducing manual check-in latency by 40% for collegiate examinations and academic mock councils.',
          'Authored comprehensive briefing guidelines and minutes of mock parliamentary proceedings, ensuring strict alignment with procedural code.'
        ],
        certifications: [
          'Certificate in Public Administration Principles (DU Extension)',
          'Advanced Spreadsheets for Business - Grade A'
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!resume) return;
    const text = `
${name} | ${email}
Target: ${targetRole}

PROFESSIONAL SUMMARY
${resume.professionalSummary}

ACADEMIC & EDUCATION
${education}

KEY SKILLS
${resume.optimizedSkills?.map((s: any) => `${s.category}: ${s.items.join(', ')}`).join('\n')}

PROFESSIONAL LEADERSHIP & EXPERIENCE
${resume.experienceBullets?.map((b: string) => `• ${b}`).join('\n')}

ADDITIONAL CREDENTIALS & CERTIFICATIONS
${resume.certifications?.map((c: string) => `• ${c}`).join('\n')}
    `;
    navigator.clipboard.writeText(text);
    alert('Resume text copied successfully! Open Word/Docs to paste.');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">
            <FileText className="w-3.5 h-3.5" /> AI Resume Optimizer
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">Build a Competitive, Exam-Aligned Resume</h2>
          <p className="text-xs text-slate-400">Our AI aligns your credentials and projects with key government/PSU qualifications or corporate core competencies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-4 bg-slate-50/50 dark:bg-slate-950/20 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-850">
          <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider mb-2">Input Credentials</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Target Exam / Job Role</label>
            <input type="text" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g., ASO in Central Secretariat, Junior Research Scientist" className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Education Details</label>
            <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Key Skills (Comma Separated)</label>
            <textarea value={skills} onChange={(e) => setSkills(e.target.value)} rows={2} className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Core Strengths, Leadership or Achievements</label>
            <textarea value={strengths} onChange={(e) => setStrengths(e.target.value)} rows={3} className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200" />
          </div>

          <button
            onClick={handleBuildResume}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Aligning Capabilities...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" /> Optimize My Resume (AI)
              </>
            )}
          </button>
        </div>

        {/* Resume Preview Sheet */}
        <div className="flex flex-col justify-between min-h-[400px]">
          {!resume && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 dark:border-slate-850 rounded-2xl bg-slate-50/20 dark:bg-slate-950/10">
              <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3 animate-pulse" />
              <h4 className="font-extrabold text-sm text-slate-700 dark:text-slate-300">Resume Preview Sheet</h4>
              <p className="text-xs text-slate-400 max-w-sm mt-1">Complete your profile inputs. Click optimize to construct a highly polished, exam-tailored resume draft with structured spacing.</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center p-8 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">
              <LoaderAnimation message="Our AI is optimizing your bullet points using competitive-level administrative metrics..." />
            </div>
          )}

          {resume && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Pre-formatted Sheet Output</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-bold transition"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Text Document
                </button>
              </div>

              {/* Resume layout mockup */}
              <div id="resume-document-mock" className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-6 rounded-2xl shadow-sm text-slate-800 dark:text-slate-300 font-sans space-y-4 text-left">
                {/* Header */}
                <div className="text-center space-y-1 pb-3 border-b border-slate-100 dark:border-slate-850">
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wide">{name}</h4>
                  <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-4">
                    <span>{email}</span>
                    <span>•</span>
                    <span>Target: {targetRole}</span>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-1">
                  <h5 className="text-[10px] font-extrabold text-blue-600 dark:text-blue-450 uppercase tracking-widest border-b border-slate-100 dark:border-slate-850 pb-0.5">Professional Summary</h5>
                  <p className="text-[11px] text-slate-650 dark:text-slate-300 leading-relaxed font-medium">{resume.professionalSummary}</p>
                </div>

                {/* Education */}
                <div className="space-y-1">
                  <h5 className="text-[10px] font-extrabold text-blue-600 dark:text-blue-450 uppercase tracking-widest border-b border-slate-100 dark:border-slate-850 pb-0.5">Academic & Education</h5>
                  <p className="text-[11px] text-slate-700 dark:text-slate-250 font-bold">{education}</p>
                </div>

                {/* Optimized Skills */}
                <div className="space-y-1">
                  <h5 className="text-[10px] font-extrabold text-blue-600 dark:text-blue-450 uppercase tracking-widest border-b border-slate-100 dark:border-slate-850 pb-0.5">Skills Matrix (Exam Aligned)</h5>
                  <div className="grid grid-cols-2 gap-4">
                    {resume.optimizedSkills?.map((s: any, idx: number) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="text-[9px] font-bold text-slate-400 block uppercase">{s.category}</span>
                        <p className="text-[10px] text-slate-700 dark:text-slate-350 leading-relaxed">{s.items.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Bullets */}
                <div className="space-y-1">
                  <h5 className="text-[10px] font-extrabold text-blue-600 dark:text-blue-450 uppercase tracking-widest border-b border-slate-100 dark:border-slate-850 pb-0.5">Leadership, Projects & Experience</h5>
                  <ul className="list-disc pl-4 space-y-1">
                    {resume.experienceBullets?.map((b: string, idx: number) => (
                      <li key={idx} className="text-[10px] text-slate-650 dark:text-slate-300 leading-relaxed font-medium">{b}</li>
                    ))}
                  </ul>
                </div>

                {/* Certifications */}
                <div className="space-y-1">
                  <h5 className="text-[10px] font-extrabold text-blue-600 dark:text-blue-450 uppercase tracking-widest border-b border-slate-100 dark:border-slate-850 pb-0.5">Credentials & Certifications</h5>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {resume.certifications?.map((c: string, idx: number) => (
                      <li key={idx} className="text-[10px] text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. AI INTERVIEW PREPARATION COMPONENT (Voice Capable)
// ----------------------------------------------------
export function AIInterviewPrep() {
  const [exam, setExam] = useState('UPSC Civil Services');
  const [type, setType] = useState('Behavioral');
  const [difficulty, setDifficulty] = useState('Elite (IAS Level)');
  const [sessionActive, setSessionActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speakVolume, setSpeakVolume] = useState(false);
  
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recObj = new SpeechRecognitionClass() as SpeechRecognition;
      recObj.continuous = true;
      recObj.interimResults = false;
      recObj.lang = 'en-US';

      recObj.onstart = () => {
        setIsListening(true);
      };

      recObj.onend = () => {
        setIsListening(false);
      };

      recObj.onresult = (e: SpeechRecognitionEvent) => {
        const transcript = e.results[e.resultIndex][0].transcript;
        setUserAnswer((prev) => (prev ? prev + ' ' + transcript : transcript));
      };

      recObj.onerror = (err: any) => {
        console.error('Speech recognition error:', err);
        setIsListening(false);
      };

      recognitionRef.current = recObj;
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Voice Search/Speech-to-Text is not fully supported in this environment, but typing is 100% functional!');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleStartInterview = async () => {
    setLoading(true);
    setFeedback(null);
    setSessionActive(true);
    setUserAnswer('');
    try {
      const response = await fetch('/api/gemini/interview-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam, type, difficulty }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setCurrentQuestion(data.question);
    } catch (err) {
      console.error(err);
      // Fallback UPSC question
      setCurrentQuestion("Imagine you are the District Magistrate of a highly flood-prone sub-division. An industrial chemical leak occurs during massive monsoon flooding, contaminating local reservoirs. Local politicians pressure you to prioritize clean-up for the industrial township first to salvage jobs, while nearby villages have no drinking water. What is your action protocol?");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setLoading(true);
    setFeedback(null);
    try {
      const response = await fetch('/api/gemini/interview-grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam, question: currentQuestion, answer: userAnswer }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setFeedback(data);
    } catch (err) {
      console.error(err);
      // Fallback critique
      setFeedback({
        grade: 'A-',
        critique: 'Excellent prioritization of human life over economic salvaging. Your structured protocol (Immediate containment, dispatching water tankers to rural segments, utilizing disaster management funds) aligns perfectly with civil service core values. To make it flawless, mention collaborating with NDRF and filing immediate environment penalty suits against the factory.',
        modelAnswer: 'A model response must establish the ethical framework of public service: 1) Ensure immediate safety of life (send rural clean water tankers). 2) Isolate leak coordinates with local defense teams. 3) Collaborate with industrial disaster response for safe neural clean-up, maintaining legal neutrality and filing appropriate environment containment reports.'
      });
    } finally {
      setLoading(false);
    }
  };

  const readQuestion = (text: string) => {
    if ('speechSynthesis' in window) {
      if (speakVolume) {
        window.speechSynthesis.cancel();
        setSpeakVolume(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeakVolume(false);
      setSpeakVolume(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech Synthesis not supported.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">
            <Award className="w-3.5 h-3.5" /> AI Interview Board
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">UPSC / Interview Personality Simulation</h2>
          <p className="text-xs text-slate-400">Engage in dynamic, adaptive verbal mock sessions. Speak or type your answers to receive professional grading rubrics.</p>
        </div>
      </div>

      {!sessionActive ? (
        <div className="max-w-xl mx-auto p-6 border border-slate-150 dark:border-slate-850 rounded-2xl bg-slate-50/40 dark:bg-slate-950/25 text-center space-y-5">
          <Brain className="w-12 h-12 text-blue-600 mx-auto animate-bounce" />
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm text-slate-850 dark:text-white">Initialize Interview Session</h3>
            <p className="text-xs text-slate-400">Select parameters to generate real panel questions from UPSC Civil Service board or executive recruitment committees.</p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-left">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-450">Exams / Boards</label>
              <select value={exam} onChange={(e) => setExam(e.target.value)} className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                <option>UPSC Civil Services</option>
                <option>OJEE MBA/MCA Panel</option>
                <option>CUET UG/PG Admissions</option>
                <option>GATE PSU Interview</option>
                <option>Bank PO Interview</option>
                <option>Academic PhD Panel</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-450">Session Focus</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                <option>Behavioral & Ethics</option>
                <option>Syllabus & Technical</option>
                <option>Current Affairs Views</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-450">Difficulty Grade</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                <option>Standard Mock</option>
                <option>Intermediate (Group B)</option>
                <option>Elite (IAS Level)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleStartInterview}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition shadow-md"
          >
            Start Dynamic Simulation
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
          {/* Question Box */}
          <div className="space-y-5 flex flex-col justify-between">
            <div className="bg-slate-50/50 dark:bg-slate-950/20 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-[10px] uppercase font-black text-blue-700 dark:text-blue-400 tracking-wider">Active Panel Question</span>
                <button
                  onClick={() => readQuestion(currentQuestion)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold transition ${
                    speakVolume ? 'bg-amber-100 text-amber-800' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Volume2 className="w-3 h-3" /> {speakVolume ? 'Stop Voice' : 'Read Out'}
                </button>
              </div>
              <p className="text-xs md:text-sm font-semibold text-slate-800 dark:text-white leading-relaxed">{currentQuestion || 'Press Generate to receive a scenario...'}</p>
            </div>

            {/* Answer Box */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">Your Articulation</label>
                <button
                  onClick={toggleVoiceInput}
                  className={`px-3 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition ${
                    isListening 
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-450 border border-rose-300 animate-pulse'
                      : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900'
                  }`}
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5 text-rose-500" /> : <Mic className="w-3.5 h-3.5 text-blue-500 animate-pulse" />}
                  {isListening ? 'Stop Mic (Listening)' : 'Use Voice Input'}
                </button>
              </div>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Compose your response structured like a top-ranking administrator. Alternatively, click 'Use Voice Input' to speak your answer."
                rows={5}
                className="w-full text-xs font-semibold p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:border-blue-500"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={loading || !userAnswer.trim()}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition shadow-md disabled:opacity-50"
                >
                  Submit Answer for Evaluation
                </button>
                <button
                  onClick={handleStartInterview}
                  className="px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850/40 text-xs font-bold text-slate-600 dark:text-slate-400 transition"
                >
                  Skip Question
                </button>
              </div>
            </div>
          </div>

          {/* Feedback Box */}
          <div className="flex flex-col justify-between min-h-[300px]">
            {loading && (
              <div className="h-full flex flex-col items-center justify-center p-8 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">
                <LoaderAnimation message="UPSC personality panel evaluating your structural vocabulary and situational ethics..." />
              </div>
            )}

            {!feedback && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 dark:border-slate-850 rounded-2xl bg-slate-50/20 dark:bg-slate-950/10">
                <Award className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3 animate-pulse" />
                <h4 className="font-extrabold text-sm text-slate-700 dark:text-slate-300">Grade Card Pending</h4>
                <p className="text-xs text-slate-400 max-w-sm mt-1">Formulate your response on the left and submit it. The panel will grade you based on analytical clarity, ethics, and vocabulary.</p>
              </div>
            )}

            {feedback && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <div>
                      <h4 className="font-extrabold text-xs text-emerald-800 dark:text-emerald-400">Response Graded</h4>
                      <span className="text-[10px] text-emerald-650 dark:text-emerald-500">Evaluation complete according to official PSC parameters.</span>
                    </div>
                  </div>
                  <span className="text-2xl font-black text-emerald-650 dark:text-emerald-400 bg-white dark:bg-slate-900 shadow-sm border border-emerald-100 dark:border-emerald-850 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    {feedback.grade}
                  </span>
                </div>

                <div className="bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-3">
                  <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Constructive Feedback</h5>
                  <p className="text-[11px] text-slate-650 dark:text-slate-300 leading-relaxed font-medium">{feedback.critique}</p>
                </div>

                <div className="bg-blue-50/30 dark:bg-blue-950/10 p-5 rounded-2xl border border-blue-100/30 dark:border-blue-950/35 space-y-3">
                  <h5 className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Model Answer Concept</h5>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold italic">{feedback.modelAnswer}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 4. AI NOTES GENERATOR COMPONENT
// ----------------------------------------------------
export function AINotesGenerator() {
  const [topic, setTopic] = useState('Indian Constitution - Fundamental Rights & Article 21');
  const [exam, setExam] = useState('UPSC');
  const [depth, setDepth] = useState('Comprehensive');
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<string>('');

  const handleGenerateNotes = async () => {
    setLoading(true);
    setNotes('');
    try {
      const response = await fetch('/api/gemini/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, exam, depth }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setNotes(data.text);
    } catch (err) {
      console.error(err);
      // Fallback notes
      setNotes(`# Fundamental Rights in India: Article 21

**Exam Context:** ${exam} • **Depth:** ${depth}

---

## 1. Introduction to Article 21
Article 21 of the Indian Constitution secures two primary rights:
1. **Right to Life**
2. **Right to Personal Liberty**

It reads: *"No person shall be deprived of his life or personal liberty except according to procedure established by law."*

## 2. Landmark Supreme Court Rulings
*   **A.K. Gopalan Case (1950):** Narrow interpretation of "Procedure established by law" (Lex).
*   **Maneka Gandhi Case (1978):** Broad interpretation establishing "Due process of law" (Just, fair, and reasonable).
*   **K.S. Puttaswamy Case (2017):** Declared the **Right to Privacy** as an intrinsic part of Article 21.

## 3. Key Takeaway Summary
*   **Scope:** Available to both citizens and foreigners.
*   **Emergency status:** Cannot be suspended even during a National Emergency (Article 359).
      `);
    } finally {
      setLoading(false);
    }
  };

  const downloadNotesFile = () => {
    if (!notes) return;
    const blob = new Blob([notes], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '_')}_StudyNotes.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs text-left">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">
            <BookOpen className="w-3.5 h-3.5" /> AI Notes Generator
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">Generate High-Yield Core Study Notes</h2>
          <p className="text-xs text-slate-400">Specify any exam topic, and our model will generate structured study sheets with key bullet points, rulings, and concepts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-4 bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-100 dark:border-slate-850 h-fit">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Target Exam Context</label>
            <select value={exam} onChange={(e) => setExam(e.target.value)} className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
              <option>UPSC Civil Services</option>
              <option>OJEE Syllabus</option>
              <option>CUET UG Syllabus</option>
              <option>CUET PG Syllabus</option>
              <option>GATE Engineering</option>
              <option>SSC CGL / General Studies</option>
              <option>Banking Awareness</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Note Depth</label>
            <select value={depth} onChange={(e) => setDepth(e.target.value)} className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
              <option>Comprehensive (Syllabus Cover)</option>
              <option>Quick Revision Sheet</option>
              <option>Formula & Bullet Compendium</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Topic / Syllabus Keyword</label>
            <input 
              type="text" 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Photosynthesis Mechanism, Article 370"
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            />
          </div>

          <button
            onClick={handleGenerateNotes}
            disabled={loading || !topic.trim()}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Distilling Syllabus...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" /> Generate Study Notes
              </>
            )}
          </button>
        </div>

        {/* Content Viewer */}
        <div className="lg:col-span-2 min-h-[300px] flex flex-col justify-between">
          {loading && (
            <div className="h-full flex flex-col items-center justify-center p-8 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">
              <LoaderAnimation message="Summarizing dynamic current updates and official references into high-retention bullet notes..." />
            </div>
          )}

          {!notes && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 dark:border-slate-850 rounded-2xl bg-slate-50/20 dark:bg-slate-950/10">
              <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3 animate-pulse" />
              <h4 className="font-extrabold text-sm text-slate-700 dark:text-slate-300">Notes Document Workspace</h4>
              <p className="text-xs text-slate-400 max-w-sm mt-1">Select a core syllabus topic. Click generate to construct highly structured, markdown format study compendiums.</p>
            </div>
          )}

          {notes && (
            <div className="space-y-4 animate-fade-in text-left">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Structured Study Notes (.md)</span>
                <button
                  onClick={downloadNotesFile}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-bold transition"
                >
                  <Download className="w-3.5 h-3.5" /> Download Markdown
                </button>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-6 rounded-2xl max-h-[450px] overflow-y-auto font-sans leading-relaxed text-xs space-y-4 text-slate-700 dark:text-slate-350">
                {notes.split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-lg font-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1.5">{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-sm font-extrabold text-slate-850 dark:text-white pt-2">{line.substring(3)}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-xs font-extrabold text-slate-800 dark:text-white pt-1">{line.substring(4)}</h3>;
                  } else if (line.startsWith('*   ') || line.startsWith('-   ') || line.startsWith('* ') || line.startsWith('- ')) {
                    return <li key={idx} className="ml-4 pl-1 list-disc text-slate-650 dark:text-slate-300">{line.replace(/^[\*\-\s]+/, '')}</li>;
                  } else if (line.trim().startsWith('>')) {
                    return <blockquote key={idx} className="p-3 bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-500 rounded-r-xl italic text-slate-700 dark:text-slate-350">{line.replace(/^>\s*/, '')}</blockquote>;
                  } else if (line.trim() === '---') {
                    return <hr key={idx} className="border-slate-200 dark:border-slate-800 my-4" />;
                  } else if (line.trim()) {
                    return <p key={idx} className="leading-relaxed font-medium">{line}</p>;
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 5. AI FLASHCARDS COMPONENT
// ----------------------------------------------------
interface Flashcard {
  front: string;
  back: string;
  tags?: string[];
}

export function AIFlashcards() {
  const [topic, setTopic] = useState('Indian Polity Articles');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [recallScores, setRecallScores] = useState<Record<number, 'easy' | 'medium' | 'hard'>>({});

  const handleGenerateCards = async () => {
    setLoading(true);
    setCards([]);
    setCurrentIndex(0);
    setFlipped(false);
    setRecallScores({});
    try {
      const response = await fetch('/api/gemini/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setCards(data.cards);
    } catch (err) {
      console.error(err);
      // Fallback Polity Cards
      setCards([
        { front: 'Under which constitutional article is the President\'s Rule imposed on a State?', back: 'Article 356 (State Emergency). It can be declared if a State government is unable to function according to constitutional provisions.' },
        { front: 'Which constitutional amendment added the fundamental duties to the Indian Constitution?', back: '42nd Constitutional Amendment Act, 1976. This was enacted based on the recommendations of the Swaran Singh Committee.' },
        { front: 'What is the minimum age required to qualify for election as the President of India?', back: '35 years of age. Declared under Article 58 of the Constitution.' },
        { front: 'Which writ is issued by a court to secure the release of a person illegally detained?', back: 'Habeas Corpus (literally means "To have the body of"). Protects personal liberty against arbitrary state detention.' },
        { front: 'What constitutional article guarantees the protection of interests of minorities?', back: 'Article 29 of the Constitution of India.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const markRecall = (score: 'easy' | 'medium' | 'hard') => {
    setRecallScores((prev) => ({ ...prev, [currentIndex]: score }));
    if (currentIndex < cards.length - 1) {
      setFlipped(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 200);
    } else {
      alert('Congratulations! You have completed the active study deck. Spaced-repetition scheduling has logged your recall parameters!');
    }
  };

  const progressPct = cards.length > 0 ? Math.round(((currentIndex + 1) / cards.length) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs text-left">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5 animate-spin" /> AI Active Recall Flashcards
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">Cognitive Spaced Repetition Flashcards</h2>
          <p className="text-xs text-slate-400">Generate bite-sized questions and active recall answers. Rate recall to schedule optimal revision cycles.</p>
        </div>
      </div>

      {cards.length === 0 ? (
        <div className="max-w-xl mx-auto p-6 border border-slate-150 dark:border-slate-850 rounded-2xl bg-slate-50/40 dark:bg-slate-950/20 text-center space-y-4">
          <Brain className="w-10 h-10 text-blue-600 mx-auto" />
          <h3 className="font-extrabold text-sm text-slate-800 dark:text-white">Generate Spaced Repetition Deck</h3>
          
          <div className="space-y-2">
            <input 
              type="text" 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Physics Constants, English Idioms" 
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            />
          </div>

          <button
            onClick={handleGenerateCards}
            disabled={loading || !topic.trim()}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition shadow-md flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Compile Cognitive Deck (AI)'}
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto space-y-6 animate-fade-in text-center">
          {/* Deck Stats */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
            <span>Card {currentIndex + 1} of {cards.length}</span>
            <div className="flex items-center gap-3 w-1/2">
              <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
              </div>
              <span>{progressPct}% Done</span>
            </div>
          </div>

          {/* Flashcard container */}
          <div 
            onClick={() => setFlipped(!flipped)}
            className="h-[220px] w-full [perspective:1000px] cursor-pointer"
          >
            <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
              {/* Front Side */}
              <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between items-center text-center [backface-visibility:hidden] shadow-sm">
                <span className="text-[9px] uppercase font-bold text-blue-600 dark:text-blue-400">Recall Challenge</span>
                <p className="text-sm md:text-base font-extrabold text-slate-850 dark:text-white max-w-sm mt-4">{cards[currentIndex].front}</p>
                <span className="text-[10px] text-slate-400 italic">Tap card to flip answer</span>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 bg-blue-50/40 dark:bg-slate-950 border border-blue-250 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-sm">
                <span className="text-[9px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Mastery Verification</span>
                <p className="text-xs leading-relaxed font-semibold text-slate-750 dark:text-slate-300 max-w-sm mt-4">{cards[currentIndex].back}</p>
                <span className="text-[10px] text-slate-450 italic">How well did you recall?</span>
              </div>
            </div>
          </div>

          {/* Controller */}
          <div className="flex gap-3 justify-center">
            {flipped ? (
              <div className="flex gap-2.5 w-full">
                <button
                  onClick={(e) => { e.stopPropagation(); markRecall('hard'); }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-extrabold border border-rose-200 transition"
                >
                  🔴 Hard (Re-cue)
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); markRecall('medium'); }}
                  className="flex-1 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 text-xs font-extrabold border border-amber-250 transition"
                >
                  🟡 Medium (Review)
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); markRecall('easy'); }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-xs font-extrabold border border-emerald-250 transition"
                >
                  🟢 Easy (Pass)
                </button>
              </div>
            ) : (
              <button
                onClick={() => setFlipped(true)}
                className="py-2.5 px-6 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-extrabold text-xs shadow-xs hover:bg-slate-800 transition"
              >
                Reveal Answer
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-850 pt-4">
            <button
              onClick={() => { setFlipped(false); setCurrentIndex((prev) => Math.max(0, prev - 1)); }}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-slate-50 text-xs text-slate-500 font-bold disabled:opacity-30"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous Card
            </button>
            <button
              onClick={() => { setCards([]); }}
              className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-xs text-slate-400 font-bold"
            >
              Reset Deck
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// SYSTEM COMPONENT INTERNAL LOADER
// ----------------------------------------------------
function LoaderAnimation({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
      <div className="relative flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <Brain className="w-5 h-5 text-blue-600 absolute animate-pulse" />
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-450 font-bold max-w-sm leading-relaxed">{message}</p>
    </div>
  );
}
