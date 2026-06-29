import React, { useState } from 'react';
import { 
  Scale, Book, Award, Briefcase, Sparkles, Search, Bookmark, Calendar, CheckCircle, 
  HelpCircle, GraduationCap, ChevronRight, Gavel, Landmark, ShieldAlert, FileText, 
  ArrowRight, Share2, Eye, FileSpreadsheet, Trash2, Clock, ThumbsUp, Send, Check
} from 'lucide-react';
import { Exam, NotificationItem } from '../types';

interface LawHubProps {
  exams: Exam[];
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  trackers: any[];
  onUpdateTracker: (examId: string, status: 'planning' | 'applied' | 'admit_card' | 'exam_done' | 'result_announced') => void;
  triggerToast?: (title: string, message: string) => void;
}

export default function LawHub({ 
  exams, 
  bookmarks, 
  onToggleBookmark, 
  trackers, 
  onUpdateTracker,
  triggerToast 
}: LawHubProps) {
  const [activeTab, setActiveTab] = useState<'exams' | 'courses' | 'subjects' | 'careers' | 'colleges' | 'ai-assistant'>('exams');
  
  // 1. LAW EXAMS STATE & SUB-TAB CONTROLS
  const lawExams = exams.filter(e => e.category === 'Law');
  const [selectedExamId, setSelectedExamId] = useState<string>(lawExams[0]?.id || 'clat-ug');
  const [examSubTab, setExamSubTab] = useState<'overview' | 'eligibility' | 'pattern' | 'syllabus' | 'dates' | 'apply' | 'pyq' | 'practice' | 'faq'>('overview');
  const selectedExam = lawExams.find(e => e.id === selectedExamId) || lawExams[0];

  // Search filter for Law Exams
  const [examSearch, setExamSearch] = useState('');
  const filteredLawExams = lawExams.filter(e => 
    e.name.toLowerCase().includes(examSearch.toLowerCase()) ||
    e.shortDescription.toLowerCase().includes(examSearch.toLowerCase())
  );

  // Practice Mock state inside Law Exam
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [showPracticeResult, setShowPracticeResult] = useState(false);

  // Demo legal mock questions (customized based on selected exam)
  const legalQuestions: Record<string, Array<{ q: string; o: string[]; a: number; exp: string }>> = {
    'clat-ug': [
      {
        q: "Principle: A person is liable for the natural and probable consequences of their actions. Facts: A throws a stone at B's window. The stone misses B's window, strikes a street lamp, breaks it, and the flying glass shards injure C who was walking on the pavement. Is A liable to C?",
        o: [
          "No, because A only intended to break B's window and not to injure C.",
          "Yes, because injuring a pedestrian on the street is a natural and probable consequence of throwing stones in a public area.",
          "No, because C's injury was too remote and was caused by the flying glass of the street lamp, not the stone.",
          "No, because it was an inevitable accident."
        ],
        a: 1,
        exp: "Injuring a pedestrian is a foreseeable, natural, and probable consequence of throwing stones in public spaces. Under tort law, A is liable."
      },
      {
        q: "Which landmark Supreme Court judgment established the 'Basic Structure Doctrine' of the Indian Constitution?",
        o: [
          "Golaknath v. State of Punjab (1967)",
          "Maneka Gandhi v. Union of India (1978)",
          "Kesavananda Bharati v. State of Kerala (1973)",
          "Minerva Mills v. Union of India (1980)"
        ],
        a: 2,
        exp: "The Kesavananda Bharati judgment (13-judge bench) declared that while Parliament has wide amending powers under Article 368, it cannot alter the 'Basic Structure' of the Constitution."
      }
    ],
    'clat-pg': [
      {
        q: "According to John Austin, what are the three essential components of 'Law'?",
        o: [
          "Morality, Justice, and Social Order",
          "Command, Sovereign, and Sanction",
          "Rules of Recognition, Primary Rules, and Secondary Rules",
          "Custom, Precedent, and Legislation"
        ],
        a: 1,
        exp: "Austin's command theory defines law as the 'command of a sovereign backed by the threat of sanction/punishment'."
      },
      {
        q: "The concept of 'Absolute Liability' was propounded by the Supreme Court of India in which landmark environmental/industrial disaster case?",
        o: [
          "M.C. Mehta v. Union of India (Oleum Gas Leak Case, 1987)",
          "Vellore Citizens Welfare Forum v. Union of India (1996)",
          "Rural Litigation and Entitled Kendra v. State of U.P. (1985)",
          "Subhash Kumar v. State of Bihar (1991)"
        ],
        a: 0,
        exp: "The Supreme Court in M.C. Mehta v. Union of India departed from the English rule of Strict Liability (Rylands v. Fletcher) and established Absolute Liability for hazardous industries."
      }
    ]
  };

  const getActiveQuestions = () => {
    return legalQuestions[selectedExamId] || [
      {
        q: "What is the minimum age to be appointed as a Judge of the Supreme Court of India?",
        o: [
          "30 Years",
          "35 Years",
          "There is no minimum age prescribed; only qualifications are listed.",
          "40 Years"
        ],
        a: 2,
        exp: "The Indian Constitution does not prescribe a minimum age for the appointment of a Supreme Court judge, but lays down criteria like 5 years as High Court judge, 10 years as advocate, or distinguished jurist."
      },
      {
        q: "Which article of the Constitution of India defines 'State' for the purposes of Part III (Fundamental Rights)?",
        o: [
          "Article 12",
          "Article 13",
          "Article 14",
          "Article 19"
        ],
        a: 0,
        exp: "Article 12 defines 'State' to include the Government and Parliament of India, state governments and legislatures, local authorities, and other statutory/non-statutory bodies."
      }
    ];
  };

  const handleAnswerClick = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const questions = getActiveQuestions();
    if (selectedAnswer === questions[currentQuestionIndex].a) {
      setPracticeScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    const questions = getActiveQuestions();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setShowPracticeResult(true);
    }
  };

  const handleResetPractice = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setPracticeScore(0);
    setShowPracticeResult(false);
  };

  // 2. LAW COURSES MODULE DATA
  const lawCourses = [
    {
      id: 'llb',
      title: 'LLB (Bachelor of Laws - 3 Year)',
      duration: '3 Years (Post-Graduation)',
      overview: 'A core postgraduate professional degree designed for candidates who have already completed a Bachelor\'s degree in any stream. It provides comprehensive training in procedural and substantive laws, preparing graduates for litigation, corporate practice, or judicial preparation.',
      eligibility: 'Bachelor\'s Degree in any discipline (Arts, Science, Commerce, B.Tech) with at least 45% aggregate marks (40% for SC/ST).',
      topColleges: 'Delhi University (CLC), Government Law College (GLC) Mumbai, Symbiosis Law School Pune, ILS Law College Pune, BHU.',
      subjects: ['Jurisprudence', 'Constitutional Law', 'Law of Crimes', 'Law of Torts', 'Law of Contracts', 'Civil Procedure Code', 'Evidence Act'],
      fees: '₹5,000 - ₹30,000 per year (Govt), ₹1.2 Lakhs - ₹2.5 Lakhs per year (Private).',
      scope: 'Advocacy/Litigation, Corporate Associate, Civil Judge Exams, Legal Counsel in banking sector.'
    },
    {
      id: 'ba-llb',
      title: 'BA LLB (Hons. - 5 Year Integrated)',
      duration: '5 Years (Integrated after 10+2)',
      overview: 'A premium integrated undergraduate double-degree merging Humanities (History, Sociology, Political Science) with Law. This is the flagship course offered across National Law Universities (NLUs) in India.',
      eligibility: 'Passed 10+2 or equivalent exam from any stream with at least 45% aggregate marks (40% for SC/ST).',
      topColleges: 'NLSIU Bangalore, NALSAR Hyderabad, WBNUJS Kolkata, NLU Delhi, GNLU Gandhinagar.',
      subjects: ['Political Science', 'Sociology', 'Law of Torts', 'Law of Contracts', 'Constitutional Law', 'Criminal Law', 'Intellectual Property Rights'],
      fees: '₹1.5 Lakhs - ₹3.0 Lakhs per year.',
      scope: 'Tier-1 Corporate Law Firms, Judicial Services, Appellate Advocacy, Public Sector Undertakings (PSUs), International Arbiters.'
    },
    {
      id: 'bba-llb',
      title: 'BBA LLB (Hons. - 5 Year Integrated)',
      duration: '5 Years (Integrated after 10+2)',
      overview: 'An integrated undergraduate double-degree program designed for corporate aspirants. It merges core business management principles (HR, Marketing, Corporate Finance) with commercial, tax, and labor legislation.',
      eligibility: 'Passed 10+2 or equivalent from any stream with a focus on commerce/humanities, minimum 45% marks.',
      topColleges: 'National Law University Jodhpur, Symbiosis Law School Pune, OP Jindal Global Law School, NMIMS Kirit P. Mehta School of Law.',
      subjects: ['Principles of Management', 'Financial Accounting', 'Corporate Governance', 'Company Law', 'Taxation Law', 'Mergers & Acquisitions', 'Banking Law'],
      fees: '₹2.0 Lakhs - ₹3.5 Lakhs per year.',
      scope: 'Corporate Law Firms, In-House Counsel, Investment Banking compliance, Merger & Acquisition advisory, Corporate Litigation.'
    },
    {
      id: 'bcom-llb',
      title: 'BCom LLB (Hons. - 5 Year Integrated)',
      duration: '5 Years (Integrated after 10+2)',
      overview: 'An integrated double-degree blending core Commerce subjects (Accountancy, Economics, Business Audit) with Law. This is highly suitable for students intending to specialize in Corporate Law, Indirect/Direct Taxation, and Insolvency practices.',
      eligibility: 'Passed 10+2 or equivalent with Commerce subjects preferred, with at least 45% aggregate marks.',
      topColleges: 'WBNUJS Kolkata, GNLU Gandhinagar, TNDALU Chennai, Amity Law School.',
      subjects: ['Financial Accounting', 'Business Economics', 'Corporate Laws', 'Insolvency & Bankruptcy Code', 'GST & Direct Taxes', 'Arbitration & Conciliation'],
      fees: '₹1.5 Lakhs - ₹3.0 Lakhs per year.',
      scope: 'Tax Consultant, Corporate Compliance, Debt Recovery Tribunal practitioner, Company Secretary with Legal designation.'
    },
    {
      id: 'bsc-llb',
      title: 'BSc LLB (Hons. - 5 Year Integrated)',
      duration: '5 Years (Integrated after 10+2 Science)',
      overview: 'A specialized integrated program merging science curricula (Chemistry, Physics, Biotech, Forensic Science) with Law. This is the premier academic path for students targeting Intellectual Property Rights (IPR), Patent litigation, and Cyber laws.',
      eligibility: 'Passed 10+2 in Science Stream (PCM/PCB) with at least 45% aggregate marks.',
      topColleges: 'WBNUJS Kolkata, GNLU Gandhinagar, NLU Jodhpur.',
      subjects: ['Forensic Science & Investigation', 'Organic Chemistry', 'Biotechnology', 'Patent Law', 'Trademark & Copyright Act', 'Information Technology Act', 'Environmental Law'],
      fees: '₹1.8 Lakhs - ₹3.2 Lakhs per year.',
      scope: 'Patent Attorney, Cyber Forensic Analyst, Pharmaceutical regulatory executive, Environmental litigant, Technology policy advisor.'
    },
    {
      id: 'llm',
      title: 'LLM (Master of Laws)',
      duration: '1 Year or 2 Years (Post LLB)',
      overview: 'An advanced postgraduate research-oriented degree offering specialization in specific domains of law. Crucial for students seeking career opportunities in academia, public policy, research groups, or competitive PSU placements.',
      eligibility: 'Completed LL.B. (3-year or 5-year integrated) with at least 50% or 55% marks depending on the university (45% for SC/ST).',
      topColleges: 'NLSIU Bangalore, NALSAR Hyderabad, Indian Law Institute (ILI) Delhi, Faculty of Law (DU).',
      subjects: ['Research Methodology', 'Law and Social Transformation', 'Judicial Process', 'Constitutional Law Specialization', 'Corporate Finance Law Specialization'],
      fees: '₹80,000 - ₹2.5 Lakhs per year.',
      scope: 'Academic Professor, Legal Researcher, Policy Think Tanks, Legal Advisor in PSUs, Judicial Clerkships.'
    },
    {
      id: 'phd-law',
      title: 'PhD in Law (Doctor of Philosophy)',
      duration: '3 to 5 Years',
      overview: 'The highest research degree in legal studies, focusing on generating original literature, regulatory analysis, and judicial critique. Highly recommended for tenure-track professor positions at premium universities.',
      eligibility: 'Completed LL.M. degree from a recognized university with at least 55% marks and qualifying UGC NET / NLU Ph.D. Entrance Exam.',
      topColleges: 'All major National Law Universities (NLUs), Delhi University, ILI Delhi.',
      subjects: ['Advanced Legal Research', 'Quantitative & Qualitative Legal Analysis', 'Legal History & Jurisprudence Theories', 'Dissertation writing'],
      fees: '₹20,000 - ₹80,000 per year.',
      scope: 'NLU Professor, Supreme Court Research Consultant, International Legal Adviser, Think-tank Director.'
    },
    {
      id: 'diploma-law',
      title: 'Post-Graduate Diploma & Certification Courses',
      duration: '3 Months to 1 Year',
      overview: 'Short-term highly specialized training courses focused on practical modern law areas like Cyber Security, Intellectual Property, ADR, or Medical laws. Excellent for adding professional skills and boosting CV credentials.',
      eligibility: 'Graduation in any stream or ongoing Law studies (for certain certificates).',
      topColleges: 'NALSAR Pro, Indian Law Institute (ILI), GNLU, NPTEL.',
      subjects: ['Alternative Dispute Resolution (ADR)', 'Cyber Law & Tech Protection', 'Patent Drafting', 'Media & Entertainment Laws'],
      fees: '₹5,000 - ₹40,000 total course fee.',
      scope: 'Freelance Arbitrator, Compliance Manager, Intellectual Property consultant, Cyber legal analyst.'
    }
  ];
  const [selectedCourseId, setSelectedCourseId] = useState('ba-llb');
  const selectedCourse = lawCourses.find(c => c.id === selectedCourseId) || lawCourses[0];

  // 3. LEGAL SUBJECTS CORE STUDY RESOURCES
  const legalSubjects = [
    {
      id: 'consti',
      name: 'Constitutional Law',
      desc: 'The supreme organic law governing structure of state organs, fundamental rights, and division of federal powers in India.',
      keyArticles: [
        { item: 'Article 12', desc: 'Defines the term "State" for enforcement of fundamental rights.' },
        { item: 'Article 13', desc: 'Declares laws inconsistent with or in derogation of fundamental rights as void (Judicial Review).' },
        { item: 'Article 21', desc: 'Protection of life and personal liberty - expanded to include privacy, clean environment, education, etc.' },
        { item: 'Article 32', desc: 'Right to Constitutional Remedies - Supreme Court power to issue writs (Habeas Corpus, Mandamus, etc.).' },
        { item: 'Article 356', desc: 'Emergency provisions: Imposition of President\'s Rule in states.' }
      ],
      landmarkJudgments: [
        { case: 'Kesavananda Bharati v. State of Kerala (1973)', held: 'Established the Basic Structure Doctrine. Article 368 cannot amend constitutional identity.' },
        { case: 'Maneka Gandhi v. Union of India (1978)', held: 'Procedure established by law under Art 21 must be "just, fair, and reasonable", bringing in substantive due process.' },
        { case: 'K.S. Puttaswamy v. Union of India (2017)', held: 'Declared the Right to Privacy as a fundamental right protected under Article 21.' }
      ],
      quickSummary: 'Constitutional Law covers the dynamic distribution of power between executive, legislative, and judiciary. Key concepts include Federalism, Separation of Powers, Judicial Review, and Fundamental Rights (Part III) which restrict arbitrary state action. Article 32 and 226 authorize the Supreme Court and High Courts to issue writs to protect these citizens\' liberties.'
    },
    {
      id: 'crim',
      name: 'Criminal Law',
      desc: 'Substantive criminal codes (IPC / Bharatiya Nyaya Sanhita) and procedural machinery (CrPC) defining crimes and trial workflows.',
      keyArticles: [
        { item: 'Section 300 IPC', desc: 'Defines Culpable Homicide amounting to Murder, along with standard exceptions.' },
        { item: 'Section 120A IPC', desc: 'Criminal Conspiracy: Agreement between two or more persons to perform an illegal act.' },
        { item: 'Bail Provisions', desc: 'Sec 437/439 CrPC governing regular bail and Sec 438 governing Anticipatory bail before arrest.' },
        { item: 'Section 154 CrPC', desc: 'Information in cognizable cases (First Information Report - FIR).' }
      ],
      landmarkJudgments: [
        { case: 'K.M. Nanavati v. State of Maharashtra (1961)', held: 'Marked the end of the jury system in India. Analyzed "grave and sudden provocation" exception for murder.' },
        { case: 'Lalita Kumari v. Govt of U.P. (2014)', held: 'Registration of FIR is mandatory under Section 154 CrPC if the information discloses commission of a cognizable offence.' },
        { case: 'Arnesh Kumar v. State of Bihar (2014)', held: 'Arrest under Section 498A IPC should not be mechanical. Guidelines issued to prevent unnecessary arrests without magistrate approval.' }
      ],
      quickSummary: 'Criminal Law comprises Substantive Law (defining offences and punishments, formerly IPC, now BNS) and Procedural Law (governing investigation, arrest, and trial processes, formerly CrPC, now BNSS). The core tenets are Actus Reus (physical illegal act) and Mens Rea (criminal intention or guilty mind), both of which must concur to constitute criminal liability.'
    },
    {
      id: 'contract',
      name: 'Contract Law',
      desc: 'The codification of agreements, reciprocal promises, damages, and specific execution of commercial covenants in India.',
      keyArticles: [
        { item: 'Section 2(h) ICA', desc: 'An agreement enforceable by law is a contract (Proposal + Acceptance = Agreement).' },
        { item: 'Section 10 ICA', desc: 'Essential elements of a valid contract: Free consent, competent parties, lawful consideration, and lawful object.' },
        { item: 'Section 56 ICA', desc: 'Doctrine of Frustration: Agreement to do an act impossible in itself is void.' },
        { item: 'Section 73 ICA', desc: 'Compensation/Damages for loss or damage caused by breach of contract.' }
      ],
      landmarkJudgments: [
        { case: 'Balfour v. Balfour (1919)', held: 'Social or domestic agreements do not create legal relations, hence are not enforceable contracts.' },
        { case: 'Carlill v. Carbolic Smoke Ball Co (1893)', held: 'Established the concept of "General Offer" which can be accepted by anyone performing the specified conditions.' },
        { case: 'Mohori Bibee v. Dharmodas Ghose (1903)', held: 'An agreement entered into by a minor is void ab-initio (void from the very beginning).' }
      ],
      quickSummary: 'Contract Law is the backbone of commercial activities. It dictates that every binding contract requires a mutual meeting of minds (Consensus ad idem) without coercion, undue influence, fraud, or misrepresentation. Breach of contract entitles the injured party to compensatory damages or equitable remedies like specific performance or injunctions under the Specific Relief Act.'
    },
    {
      id: 'family',
      name: 'Family Law',
      desc: 'Personal laws governing marriage, divorce, succession, guardianship, and adoption across major religious systems.',
      keyArticles: [
        { item: 'Hindu Marriage Act Sec 5', desc: 'Conditions for a valid Hindu marriage, including age limits and prohibited degrees of relationship.' },
        { item: 'Hindu Succession Act Sec 6', desc: 'Amended in 2005 to grant equal coparcenary/inheritance rights to daughters.' },
        { item: 'Special Marriage Act 1954', desc: 'Enables civil marriages for citizens irrespective of their religious faith.' }
      ],
      landmarkJudgments: [
        { case: 'Shayara Bano v. Union of India (2017)', held: 'Declared the practice of Talaq-e-Biddat (instant triple talaq) as unconstitutional and void.' },
        { case: 'Vineeta Sharma v. Rakesh Sharma (2020)', held: 'Daughters have equal coparcenary rights by birth in Hindu joint family property, even if the father died before the 2005 amendment.' }
      ],
      quickSummary: 'Family Law governs relationships, marriages, custody, and inheritance. In India, family law is characterized by personal laws specific to religions (Hindu law, Muslim law, Christian law, Parsi law), alongside secular legislations like the Special Marriage Act. Debate persists on a Uniform Civil Code under Article 44.'
    },
    {
      id: 'cyber',
      name: 'Cyber Law',
      desc: 'The regulation of digital commerce, electronic signatures, data protection, and digital crimes under the IT Act.',
      keyArticles: [
        { item: 'Section 43 IT Act', desc: 'Penalty and compensation for damage to computer systems, data theft, and unauthorized access.' },
        { item: 'Section 66A IT Act', desc: 'Dealt with punishment for sending offensive messages through communication services (Struck down).' },
        { item: 'Section 66C & 66D', desc: 'Punishment for identity theft and cheating by personation using computer resources.' }
      ],
      landmarkJudgments: [
        { case: 'Shreya Singhal v. Union of India (2015)', held: 'Struck down Section 66A of the IT Act as unconstitutional for violating the freedom of speech under Article 19(1)(a).' },
        { case: 'State of Tamil Nadu v. Suhas Katti (2004)', held: 'First conviction under IT Act Section 67 for posting obscene, defamatory material on internet forums.' }
      ],
      quickSummary: 'Cyber Law covers regulatory policies governing computer security, legal validity of digital documents, electronic signatures, and cybercrimes such as hacking, phishing, cyber stalking, and online hate speech. The fundamental law is the Information Technology Act, 2000, supplemented by the Digital Personal Data Protection Act, 2023.'
    }
  ];
  const [selectedSubjectId, setSelectedSubjectId] = useState('consti');
  const selectedSubject = legalSubjects.find(s => s.id === selectedSubjectId) || legalSubjects[0];

  // 4. CAREER OPPORTUNITIES MODULE DATA
  const lawCareers = [
    {
      role: 'Advocate / Litigator',
      desc: 'A legal practitioner who represents clients in court trials, drafts petitions, argues cases, and provides courtroom defense.',
      eligibility: 'Passed LLB (3 or 5 year) + Qualified the All India Bar Examination (AIBE) + Enrolled with State Bar Council.',
      skills: 'Excellent verbal advocacy, analytical thinking, legal research, drafting, witness cross-examination, grit.',
      salary: '₹3 LPA - ₹50+ LPA (Highly variable. High-tier seniors earn ₹5 Lakhs to ₹15 Lakhs per appearance in high courts/Supreme Court).',
      growth: 'Junior Advocate ➔ Independent Practice ➔ Senior Counsel designate ➔ Elevated to High Court/Supreme Court Bench.',
      recruiters: 'Independent chambers, litigation boutiques, or starting individual law offices in district/high courts.',
      govPrivate: 'Private client representation or appointed as legal aid counsels for state panel representation.'
    },
    {
      role: 'Judicial Services / Civil Judge',
      desc: 'A magistrate or civil judge who presides over lower courts, evaluates evidence, manages legal filings, and delivers neutral legal verdicts.',
      eligibility: 'LLB degree holder + qualified the State Judicial Services Examination (PCS-J) for entry-level Civil Judge Junior Division.',
      skills: 'Impartial judgment, high moral integrity, extensive statutory command, analytical listening, writing balanced orders.',
      salary: '₹75,000 - ₹1,40,000 monthly starting basic pay (Excellent judicial perks, government bungalow, security, and transport).',
      growth: 'Civil Judge Junior Division ➔ Senior Division ➔ District & Sessions Judge ➔ Elevated as High Court Judge.',
      recruiters: 'State High Court Administration (appointed by State Governor).',
      govPrivate: '100% Prestigious Government Gazette Judicial Officer Role.'
    },
    {
      role: 'Corporate Lawyer / Law Associate',
      desc: 'A commercial specialist who advises corporations on compliance, reviews business contracts, drafts mergers, and handles intellectual properties.',
      eligibility: 'LLB or Integrated Law Degree. Highly preferred graduation from premier National Law Universities (NLUs) or top-tier private colleges.',
      skills: 'Contract drafting, understanding corporate finance, commercial negotiations, meticulous attention to detail.',
      salary: '₹8 LPA - ₹22 LPA starting (Top Tier-1 corporate firms offer ₹16 Lakhs - ₹20 Lakhs base starting salary plus bonuses).',
      growth: 'Associate ➔ Senior Associate ➔ Principal Associate ➔ Junior Partner ➔ Senior Equity Partner (highly lucrative).',
      recruiters: 'Cyril Amarchand Mangaldas, Shardul Amarchand Mangaldas, Khaitan & Co, Trilegal, Luthra & Luthra, AZB & Partners.',
      govPrivate: 'Private commercial corporate domain.'
    },
    {
      role: 'Public Prosecutor / Assistant District Attorney',
      desc: 'A government advocate representing the state prosecution in criminal trials to present evidence against accused offenders.',
      eligibility: 'LLB Degree + minimum 7 years of active legal practice for Public Prosecutor, or qualifying state Prosecutor exams for Assistant state prosecutors.',
      skills: 'Criminal procedural command, trial advocacy, state policy evaluation, logical evidence construction.',
      salary: '₹60,000 - ₹1,20,000 monthly salary. Enjoys gazetted state officer perks.',
      growth: 'Assistant Public Prosecutor (APP) ➔ Additional District Prosecutor ➔ Director of Prosecutions.',
      recruiters: 'State Government Police and Prosecution Department.',
      govPrivate: 'Full-time secure Government Officer role.'
    },
    {
      role: 'Cyber Law Specialist',
      desc: 'An expert who legalizes tech operations, deals with data breaches, consults on cyber crimes, GDPR/DPDP compliances, and online frauds.',
      eligibility: 'LLB degree + PG Diploma/Masters in Cyber Security and Cyber Laws.',
      skills: 'Technical knowledge of networks, encryption, cyber forensic protocols, statutory command of IT Act.',
      salary: '₹6 LPA - ₹15 LPA starting. Cyber experts are in heavy demand across banking and software firms.',
      growth: 'Cyber Compliance Associate ➔ Head of Technology Policy ➔ Chief Information Security Advisor (CISO).',
      recruiters: 'Consultancy firms (EY, PwC, KPMG, Deloitte), Google, Microsoft, Tech Mahindra, national security agencies.',
      govPrivate: 'High demand in both top Private firms and Government investigative panels (CERT-In, Cyber Cells).'
    }
  ];
  const [selectedCareerIndex, setSelectedCareerIndex] = useState(0);
  const selectedCareer = lawCareers[selectedCareerIndex];

  // 5. COLLEGE EXPLORER DATA
  const lawColleges = [
    {
      name: 'National Law School of India University (NLSIU), Bangalore',
      type: 'NLU',
      rank: 'NIRF Law Rank #1',
      admission: 'Admissions purely through CLAT UG (Integrated) and CLAT PG (LLM) scores.',
      fees: '₹2.8 Lakhs per year (including tuition, hostel, and deposits).',
      placements: '100% placements. Median starting package is ₹18 LPA, highest corporate salary touches ₹22-25 LPA.',
      facilities: 'State-of-the-art libraries, high-speed campus Wi-Fi, modern academic hostels, world-class legal moot court halls.',
      scholarships: 'Generous merit-cum-means financial aid, Aditya Birla Scholar funding, state reservation subsidies.',
      hostels: 'Fully residential campus. Hostels are compulsory for 5-year integrated students.'
    },
    {
      name: 'NALSAR University of Law, Hyderabad',
      type: 'NLU',
      rank: 'NIRF Law Rank #2',
      admission: 'CLAT UG & PG merit ranks. Strict counseling preference.',
      fees: '₹2.6 Lakhs per year.',
      placements: 'Average starting package around ₹15.5 LPA. High intake from premier commercial firms and foreign banks.',
      facilities: 'A sprawling 55-acre scenic residential campus, air-conditioned moot courts, extensive legal digital databases.',
      scholarships: 'NALSAR alumni trust grants and State Government post-matric scholarships.',
      hostels: 'Top tier individual block hostels. Outstanding mess food and recreational gyms.'
    },
    {
      name: 'National Law University (NLU), Delhi',
      type: 'NLU',
      rank: 'NIRF Law Rank #3',
      admission: 'Exclusively conducts and accepts the AILET (All India Law Entrance Test) exam.',
      fees: '₹2.5 Lakhs per year.',
      placements: 'Average corporate packages exceed ₹16 LPA. Strong placements in supreme court litigation chambers and think tanks.',
      facilities: 'Modern academic blocks in Dwarka, New Delhi. Comprehensive physical law library and legal clinics.',
      scholarships: 'Delhi Govt fee-reimbursement schemes and NLU-D merit scholarships.',
      hostels: 'Excellent residential infrastructure, spacious rooms, active sporting courts.'
    },
    {
      name: 'Government Law College (GLC), Mumbai',
      type: 'Government',
      rank: 'Premier Historical Gov College',
      admission: 'Admissions through Maharashtra Law CET (MH CET Law) 3-Year / 5-Year entrance exams.',
      fees: '₹8,000 - ₹12,000 per year (Extremely affordable, making it accessible to all).',
      placements: 'Average package of ₹7.5 LPA. Strategic Mumbai location offers unparalleled year-round high-court internship opportunities.',
      facilities: 'Historical campus near Churchgate, prestigious Harish Salve moot court hall, iconic law library.',
      scholarships: 'State-sponsored reservation concessions and endowment prizes.',
      hostels: 'Limited government hostel seats allocated purely based on academic merit lists.'
    },
    {
      name: 'Campus Law Centre (CLC), Delhi University',
      type: 'Government',
      rank: 'Top 3 LLB Course in India',
      admission: 'Admissions through CUET PG (Law Paper) entrance scores.',
      fees: '₹6,000 per year (Extremely pocket-friendly for high-quality central education).',
      placements: 'Strong placements in corporate compliance, NGO legal panels, and outstanding rates of Judicial Service selections.',
      facilities: 'Historic DU North Campus location, active legal service clinic, elite alumni lecture series.',
      scholarships: 'DU merit awards, post-matric scholarships for SC/ST/OBC students.',
      hostels: 'DU centralized university hostels (allocation based on academic merit).'
    },
    {
      name: 'Jindal Global Law School (JGLS), Sonipat',
      type: 'Private',
      rank: 'QS World Rank #1 in India',
      admission: 'Accepted exclusively through LSAT India percentiles + Personal interview rounds.',
      fees: '₹6.5 Lakhs - ₹8.0 Lakhs per year.',
      placements: 'Outstanding corporate placements. Offers median starting salaries of ₹10-14 LPA with heavy international exposure.',
      facilities: 'Ultra-modern global academic infrastructure, sports stadiums, dining halls, international library tie-ups.',
      scholarships: 'O.P. Jindal Outstanding Merit Scholarship and Savitri Jindal Means-cum-Merit assistance (up to 50% tuition waiver).',
      hostels: 'Luxury modern central-AC student residential suites.'
    }
  ];
  const [collegeSearch, setCollegeSearch] = useState('');
  const [selectedNluFilter, setSelectedNluFilter] = useState<'All' | 'NLU' | 'Government' | 'Private'>('All');
  
  const filteredColleges = lawColleges.filter(col => {
    const matchesSearch = col.name.toLowerCase().includes(collegeSearch.toLowerCase()) || col.rank.toLowerCase().includes(collegeSearch.toLowerCase());
    const matchesType = selectedNluFilter === 'All' || col.type === selectedNluFilter;
    return matchesSearch && matchesType;
  });

  // 6. AI ASSISTANT PORTAL
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Custom structured AI simulated responses for Legal Questions
  const mockLegalAiAnswers: Record<string, string> = {
    "consti": "### Constitutional Law Preparation Strategy\nConstitutional Law is the core of CLAT PG and Judicial Services exams. For CLAT UG, focus on applying the fundamental rights to facts. For postgraduate exams, thoroughly study VN Shukla or MP Jain. Ensure you keep an active list of the latest 10 landmark Supreme Court judgments regarding Article 21, reservation policies, and federal division.",
    "clat": "### CLAT vs AILET Comparison\nCLAT UG is highly passage-based and checks reading comprehension across all sections, while AILET (conducted by NLU Delhi) has more direct and critical reasoning puzzles. AILET gives 90 minutes to solve 150 questions, making it significantly faster-paced. In CLAT UG, you solve 120 questions in 120 minutes. Keep practicing time-bound mock tests for both.",
    "jobs": "### Premium Legal Careers Outlook\nCorporate Law firms offer the highest starting pay (up to ₹18 LPA in Tier-1 firms). If you prefer job security, strive for the State Judicial Services exam, which grants a gazetted Civil Judge post. Legal advisors in PSUs (ONGC, IOCL) also offer high pay and excellent state amenities."
  };

  const handleAskAi = () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setAiResponse(null);
    
    setTimeout(() => {
      const q = aiQuestion.toLowerCase();
      let ans = "### Legal Education Guidance\nTo master your legal entrance exams, construct a structured study timetable focusing on standard textbooks, landmark cases, and reading speed. For personalized questions, please consult our specialized **AI Coach Chat** tab for live interactive dialogues with LLM models.";
      
      if (q.includes("constitutional") || q.includes("consti") || q.includes("constitution")) {
        ans = mockLegalAiAnswers["consti"];
      } else if (q.includes("clat") || q.includes("ailet") || q.includes("compare")) {
        ans = mockLegalAiAnswers["clat"];
      } else if (q.includes("job") || q.includes("salary") || q.includes("career") || q.includes("advocate") || q.includes("corporate")) {
        ans = mockLegalAiAnswers["jobs"];
      }
      
      setAiResponse(ans);
      setIsAiLoading(false);
      if (triggerToast) {
        triggerToast("AI Advisor responded!", "Your legal education query has been processed with specialized high-yield legal facts.");
      }
    }, 1200);
  };

  // Personalized study plan states
  const [planExam, setPlanExam] = useState('clat-ug');
  const [planWeeks, setPlanWeeks] = useState('8');
  const [generatedPlan, setGeneratedPlan] = useState<any[] | null>(null);

  const handleGenerateStudyPlan = () => {
    const examName = lawExams.find(e => e.id === planExam)?.name || "CLAT";
    const weeks = parseInt(planWeeks);
    
    // Generate week schedules dynamically
    const plan = [];
    for (let i = 1; i <= weeks; i++) {
      let focus = "Constitutional Law & Legal Aptitude basics";
      let tasks = ["Read landmark judgements", "Solve 1 sectional mock", "Revise current affairs"];
      
      if (i === 1) {
        focus = "Core Legal Concepts (Torts & Contracts) Foundation";
        tasks = ["Understand essential elements of a contract (Sec 10 ICA)", "Read Law of Torts general defenses", "Study high-yield daily news"];
      } else if (i === weeks) {
        focus = "Full Length Mock Marathons & Revision";
        tasks = ["Solve 3 full-length OMR mock tests", "Review incorrect attempts & formulate error log", "Revise personal law notes and Latin maxims"];
      } else if (i === Math.ceil(weeks / 2)) {
        focus = "Substantive Criminal Codes & Jurisprudence basics";
        tasks = ["Study General Exceptions under Criminal codes", "Review John Austin and HLA Hart's jurisprudence schools", "Solve analytical reasoning puzzle drills"];
      } else {
        focus = `Core Subject Mastery & Passages Part ${i}`;
        tasks = [`Revise Sectional papers for ${examName}`, "Solve 10 passage-based comprehension exercises", "Track supreme court constitution bench updates"];
      }
      
      plan.push({ week: i, focus, tasks, completed: false });
    }
    
    setGeneratedPlan(plan);
    if (triggerToast) {
      triggerToast("Law Study Plan Generated! 📅", `Custom ${weeks}-week roadmap for ${examName} is active below.`);
    }
  };

  // Compare Exams State
  const [compareExamA, setCompareExamA] = useState('clat-ug');
  const [compareExamB, setCompareExamB] = useState('clat-pg');

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* 1. HERO PRESTIGE HEADER BANNER */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-md border border-slate-800">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider">
            <Gavel className="w-3.5 h-3.5" /> Specialized Legal Education Module
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none">
            ExamVerse <span className="text-amber-400">Law Students Hub</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
            The ultimate dynamic matrix for law aspirants. Access complete syllabus guidelines for CLAT, AILET, LSAT & State Law tests, explore undergraduate & postgraduate legal career paths, analyze NLU rankings, and study Constitutional summaries powered by AI.
          </p>
        </div>
      </div>

      {/* 2. LAW HUB MODULE NAVIGATION */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'exams', label: 'Entrance Exams', icon: Scale },
          { id: 'courses', label: 'Law Courses', icon: GraduationCap },
          { id: 'subjects', label: 'Legal Subjects', icon: Gavel },
          { id: 'careers', label: 'Career Opportunities', icon: Briefcase },
          { id: 'colleges', label: 'College Explorer', icon: Landmark },
          { id: 'ai-assistant', label: 'AI Law Assistant', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-amber-500 dark:bg-amber-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. DYNAMIC CONTENT RENDERING BASED ON ACTIVE TAB */}

      {/* SUB-TAB 1: LAW ENTRANCE EXAMS */}
      {activeTab === 'exams' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* LEFT COLUMN: EXAMS MATRIX LIST & SEARCH */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search law exams..."
                value={examSearch}
                onChange={(e) => setExamSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-amber-500 text-slate-800 dark:text-slate-200"
              />
            </div>

            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {filteredLawExams.map((e) => {
                const isSelected = selectedExamId === e.id;
                const isBookmarked = bookmarks.includes(e.id);
                return (
                  <div
                    key={e.id}
                    onClick={() => {
                      setSelectedExamId(e.id);
                      handleResetPractice();
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition relative overflow-hidden ${
                      isSelected
                        ? 'bg-amber-500/5 border-amber-450 dark:border-amber-500/40 text-slate-900 dark:text-white'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850/40'
                    }`}
                  >
                    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold tracking-tight">{e.name}</span>
                      <button
                        onClick={(evt) => {
                          evt.stopPropagation();
                          onToggleBookmark(e.id);
                        }}
                        className={`p-1 rounded-sm ${isBookmarked ? 'text-amber-500' : 'text-slate-300 hover:text-slate-500'}`}
                        title="Bookmark Exam"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">{e.shortDescription}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILED BENTO GRID VIEW OF SELECTED EXAM */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6">
            
            {/* Header row with basic specs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-black text-slate-800 dark:text-white">{selectedExam.name}</h2>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-extrabold uppercase tracking-widest">
                    {selectedExam.category} Exam
                  </span>
                </div>
                <p className="text-xs text-slate-450 max-w-xl">{selectedExam.shortDescription}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => onToggleBookmark(selectedExam.id)}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition ${
                    bookmarks.includes(selectedExam.id)
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>{bookmarks.includes(selectedExam.id) ? 'Bookmarked' : 'Bookmark Exam'}</span>
                </button>
                <button
                  onClick={() => {
                    onUpdateTracker(selectedExam.id, 'planning');
                    if (triggerToast) triggerToast("Added to commands! ⚡", `You are now tracking ${selectedExam.name} on your dashboard.`);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-650 text-white text-[11px] font-black shadow-xs flex items-center gap-1.5 transition"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Track Deadlines</span>
                </button>
              </div>
            </div>

            {/* Sub-tab pills for Exam details */}
            <div className="flex overflow-x-auto gap-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'eligibility', label: 'Eligibility' },
                { id: 'pattern', label: 'Pattern' },
                { id: 'syllabus', label: 'Syllabus' },
                { id: 'dates', label: 'Dates' },
                { id: 'apply', label: 'Apply' },
                { id: 'pyq', label: 'PYQ Papers' },
                { id: 'practice', label: 'AI Practice' },
                { id: 'faq', label: 'FAQs' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setExamSubTab(pill.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shrink-0 transition ${
                    examSubTab === pill.id
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-3xs'
                      : 'text-slate-450 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Dynamic content card per sub-tab */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 rounded-xl">
              
              {examSubTab === 'overview' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Exam Selection Process</h4>
                  <ul className="space-y-2">
                    {selectedExam.selectionProcess.map((step, idx) => (
                      <li key={idx} className="text-xs text-slate-650 dark:text-slate-350 flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200/50 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Vacancy Scale</span>
                      <p className="text-xs font-bold text-slate-750 dark:text-slate-250">{selectedExam.vacancyDetails}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Expected Career Rewards</span>
                      <p className="text-xs font-bold text-slate-750 dark:text-slate-250">{selectedExam.salary}</p>
                    </div>
                  </div>
                </div>
              )}

              {examSubTab === 'eligibility' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider font-sans">Official Eligibility Matrix</h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-extrabold text-slate-700 dark:text-slate-300">Age Restrictions:</span>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{selectedExam.eligibility.ageLimit}</p>
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-700 dark:text-slate-300">Academic Qualifications:</span>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{selectedExam.eligibility.educationalQualification}</p>
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-700 dark:text-slate-300">Domicile & Nationality:</span>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{selectedExam.eligibility.nationality}</p>
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-700 dark:text-slate-300">Reservation Policies:</span>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{selectedExam.eligibility.reservationDetails}</p>
                    </div>
                  </div>
                </div>
              )}

              {examSubTab === 'pattern' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Exam Structure Matrix</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-extrabold">
                          <th className="pb-2">Section / Paper Name</th>
                          <th className="pb-2">Questions</th>
                          <th className="pb-2">Max Marks</th>
                          <th className="pb-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedExam.examPattern.map((p, idx) => (
                          <tr key={idx} className="border-b border-slate-100 dark:border-slate-850 text-slate-700 dark:text-slate-300">
                            <td className="py-2.5 font-bold">{p.subject}</td>
                            <td className="py-2.5 font-semibold">{p.questions}</td>
                            <td className="py-2.5 font-semibold">{p.marks}</td>
                            <td className="py-2.5 font-semibold">{p.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/10 text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed">
                    <strong>Pre-exam strategy note:</strong> CLAT and AILET papers contain an offline negative mark of 0.25 points for every wrong answer. Double-check before marking your OMR sheets.
                  </div>
                </div>
              )}

              {examSubTab === 'syllabus' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Comprehensive Syllabus Sections</h4>
                  <div className="space-y-4">
                    {selectedExam.syllabus.map((s, idx) => (
                      <div key={idx} className="space-y-2">
                        <h5 className="font-bold text-xs text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-1">{s.stage}</h5>
                        <ul className="space-y-1.5 pl-3 list-disc text-[11px] text-slate-600 dark:text-slate-400">
                          {s.topics.map((t, tid) => (
                            <li key={tid} className="leading-relaxed">{t}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-slate-150 dark:border-slate-850">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">High-Yield Highlight Topics</span>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">{selectedExam.importantTopics.join(', ')}</p>
                  </div>
                </div>
              )}

              {examSubTab === 'dates' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Important Examination Timeline</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Application Window Start', value: selectedExam.dates.applicationStart, type: 'start' },
                      { label: 'Application Deadline Last Date', value: selectedExam.dates.applicationLastDate, type: 'end' },
                      { label: 'Correction Window Period', value: selectedExam.dates.correctionWindow, type: 'info' },
                      { label: 'Admit Card Release Date', value: selectedExam.dates.admitCardRelease, type: 'info' },
                      { label: 'Official Examination Date', value: selectedExam.dates.examDate, type: 'exam' },
                      { label: 'Provisional Answer Keys', value: selectedExam.dates.answerKeyRelease, type: 'info' },
                      { label: 'Final Examination Results', value: selectedExam.dates.resultDate, type: 'result' }
                    ].map((d, dIdx) => (
                      <div key={dIdx} className="p-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-xl flex items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-450 font-bold">{d.label}</span>
                          <p className="text-xs font-black text-slate-800 dark:text-white">{d.value}</p>
                        </div>
                        <Calendar className={`w-4 h-4 shrink-0 ${
                          d.type === 'start' ? 'text-emerald-500' :
                          d.type === 'end' ? 'text-rose-500' :
                          d.type === 'exam' ? 'text-amber-500' : 'text-blue-500'
                        }`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {examSubTab === 'apply' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">How to Apply & Registration Fees</h4>
                  <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl space-y-2">
                    <div className="flex justify-between items-center flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">General Category Fee:</span>
                      <span className="text-sm font-black text-slate-900 dark:text-white">₹{selectedExam.applicationFees.general}</span>
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">Reserved Categories:</span>
                      <span className="text-sm font-black text-slate-900 dark:text-white">₹{selectedExam.applicationFees.reserved}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed pt-1">{selectedExam.applicationFees.details}</p>
                  </div>

                  <h5 className="font-extrabold text-xs text-slate-800 dark:text-white mt-4">Step-by-Step Registration Guide:</h5>
                  <ol className="space-y-2 text-xs">
                    {selectedExam.howToApply.map((step, sIdx) => (
                      <li key={sIdx} className="text-slate-500 dark:text-slate-400 flex items-start gap-2">
                        <span className="font-extrabold text-amber-500 shrink-0">{sIdx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="pt-4 flex gap-2">
                    <a
                      href={selectedExam.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white dark:bg-slate-800 dark:hover:bg-slate-750 font-black text-xs rounded-xl transition"
                    >
                      <Landmark className="w-3.5 h-3.5" />
                      <span>Official Registration Website</span>
                    </a>
                    <a
                      href={selectedExam.officialNotificationPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-650 hover:text-black dark:text-slate-300 dark:hover:text-white font-black text-xs rounded-xl transition"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Official PDF Bulletin</span>
                    </a>
                  </div>
                </div>
              )}

              {examSubTab === 'pyq' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Previous Year Question Papers (PYQs)</h4>
                  <p className="text-[11px] text-slate-450">Review actual exam patterns and test your baseline timing by downloading PDF transcripts.</p>
                  <div className="space-y-3">
                    {selectedExam.pyqPapers.map((paper, pIdx) => (
                      <div key={pIdx} className="p-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-xl flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-lg bg-red-500/10 text-red-600">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-850 dark:text-slate-250">{paper.title}</p>
                            <span className="text-[10px] text-slate-400 font-semibold">Year {paper.year} • Official Question Bank</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (triggerToast) triggerToast("Download Initiated 📥", `Downloading PDF for ${paper.title}`);
                          }}
                          className="px-3 py-1 bg-amber-500/10 text-amber-650 hover:bg-amber-500 hover:text-white transition font-black text-[10px] rounded-lg"
                        >
                          Download PDF
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {examSubTab === 'practice' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">AI Legal Reasoning Speed Drill</h4>
                    <span className="text-[10px] font-bold text-slate-450">Progress: {currentQuestionIndex + 1} of {getActiveQuestions().length}</span>
                  </div>

                  {!showPracticeResult ? (
                    <div className="space-y-4">
                      {/* Current Question Text */}
                      <p className="text-xs font-bold text-slate-800 dark:text-white leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-150 dark:border-slate-850">
                        {getActiveQuestions()[currentQuestionIndex].q}
                      </p>

                      {/* Options List */}
                      <div className="space-y-2">
                        {getActiveQuestions()[currentQuestionIndex].o.map((option, idx) => {
                          const isSelected = selectedAnswer === idx;
                          const isCorrect = getActiveQuestions()[currentQuestionIndex].a === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleAnswerClick(idx)}
                              disabled={isAnswerSubmitted}
                              className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition flex items-start gap-2.5 ${
                                isAnswerSubmitted
                                  ? isCorrect
                                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-400 font-bold'
                                    : isSelected
                                    ? 'bg-rose-500/10 border-rose-500 text-rose-800 dark:text-rose-400 font-bold'
                                    : 'bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-850 text-slate-400'
                                  : isSelected
                                  ? 'bg-amber-500/10 border-amber-450 text-slate-900 dark:text-white font-bold'
                                  : 'bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-850 text-slate-650 dark:text-slate-350 hover:bg-slate-50'
                              }`}
                            >
                              <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-550 dark:text-slate-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span>{option}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Controls or Explanations */}
                      <div className="pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {isAnswerSubmitted && (
                          <div className="text-[11px] text-slate-500 dark:text-slate-450 italic max-w-lg leading-relaxed bg-amber-500/5 p-3 rounded-lg border border-amber-500/10">
                            <strong>AI Explanation:</strong> {getActiveQuestions()[currentQuestionIndex].exp}
                          </div>
                        )}
                        <div className="sm:ml-auto shrink-0">
                          {!isAnswerSubmitted ? (
                            <button
                              onClick={handleSubmitAnswer}
                              disabled={selectedAnswer === null}
                              className="px-4 py-2 rounded-xl bg-amber-500 disabled:bg-slate-150 disabled:dark:bg-slate-850 disabled:text-slate-400 text-white font-black text-xs shadow-xs hover:bg-amber-600 transition"
                            >
                              Submit Answer
                            </button>
                          ) : (
                            <button
                              onClick={handleNextQuestion}
                              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white dark:bg-slate-800 dark:hover:bg-slate-750 font-black text-xs transition"
                            >
                              {currentQuestionIndex < getActiveQuestions().length - 1 ? 'Next Question' : 'Complete Drill'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 space-y-4">
                      <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto">
                        <Award className="w-6 h-6 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-sm text-slate-800 dark:text-white">Legal Reasoning Drill Completed!</h4>
                        <p className="text-[11px] text-slate-400">Excellent performance. Review your scoring metrics below:</p>
                      </div>
                      <div className="inline-flex items-baseline gap-1 bg-amber-500/5 px-4 py-1.5 rounded-full border border-amber-500/10 text-amber-600 font-extrabold text-sm">
                        <span>Score:</span>
                        <span className="text-lg font-black">{practiceScore}</span>
                        <span className="text-[11px] text-slate-400">/ {getActiveQuestions().length}</span>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={handleResetPractice}
                          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-black text-xs rounded-xl transition"
                        >
                          Restart Practice Drill
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {examSubTab === 'faq' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Exam Frequently Asked Questions</h4>
                  <div className="space-y-3">
                    {selectedExam.faqs.map((faq, fIdx) => (
                      <div key={fIdx} className="p-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-xl space-y-1">
                        <p className="text-xs font-extrabold text-slate-850 dark:text-slate-200">Q: {faq.question}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">A: {faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: LAW COURSES */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List of Courses */}
          <div className="lg:col-span-1 space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {lawCourses.map((c) => {
              const isSelected = selectedCourseId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCourseId(c.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition relative overflow-hidden ${
                    isSelected
                      ? 'bg-amber-500/5 border-amber-450 dark:border-amber-500/40 text-slate-900 dark:text-white shadow-3xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-amber-500 text-white' : 'bg-amber-500/10 text-amber-600'}`}>
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-extrabold leading-snug">{c.title}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 line-clamp-1">{c.duration}</p>
                </button>
              );
            })}
          </div>

          {/* Course Details Panel */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-850">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-500">{selectedCourse.duration}</span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">{selectedCourse.title}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Course Overview</h4>
                <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed mt-1.5">{selectedCourse.overview}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide">Academic Fee Scale</span>
                  <p className="text-xs font-bold text-slate-750 dark:text-slate-250 mt-0.5">{selectedCourse.fees}</p>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide">Career Scope / Placements</span>
                  <p className="text-xs font-bold text-slate-750 dark:text-slate-250 mt-0.5">{selectedCourse.scope}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Minimum Eligibility Criteria</h4>
                <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed mt-1">{selectedCourse.eligibility}</p>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Top-Tier Indian Institutions</h4>
                <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed mt-1 font-semibold">{selectedCourse.topColleges}</p>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider mb-2">High-Yield Subjects Taught</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCourse.subjects.map((s, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-amber-500/5 border border-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: LEGAL SUBJECTS STUDY RESOURCES */}
      {activeTab === 'subjects' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Subjects Menu */}
          <div className="lg:col-span-1 space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {legalSubjects.map((s) => {
              const isSelected = selectedSubjectId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubjectId(s.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition relative overflow-hidden ${
                    isSelected
                      ? 'bg-amber-500/5 border-amber-450 dark:border-amber-500/40 text-slate-900 dark:text-white'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-extrabold">{s.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-1.5 leading-relaxed">{s.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Key Articles, Landmarks, summaries */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-850">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">{selectedSubject.name} High-Yield Resources</h3>
              <p className="text-xs text-slate-400">{selectedSubject.desc}</p>
            </div>

            <div className="space-y-5">
              
              {/* Concept Summary */}
              <div>
                <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Concept Summary</h4>
                <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed mt-1.5 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850">
                  {selectedSubject.quickSummary}
                </p>
              </div>

              {/* Key Sections / Articles */}
              <div>
                <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider mb-2">High-Yield Statutes & Articles</h4>
                <div className="space-y-2">
                  {selectedSubject.keyArticles.map((art, aIdx) => (
                    <div key={aIdx} className="p-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-xl flex items-start gap-2.5">
                      <div className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-650 text-[10px] font-black uppercase tracking-wider mt-0.5">
                        {art.item}
                      </div>
                      <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed">{art.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Landmark Judgments */}
              <div>
                <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider mb-2">Landmark Supreme Court Judgments</h4>
                <div className="space-y-3">
                  {selectedSubject.landmarkJudgments.map((judge, jIdx) => (
                    <div key={jIdx} className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1.5">
                      <p className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <Scale className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{judge.case}</span>
                      </p>
                      <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed pl-5 italic">
                        <strong>Held:</strong> {judge.held}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 4: CAREER OPPORTUNITIES */}
      {activeTab === 'careers' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Careers Navigation List */}
          <div className="lg:col-span-1 space-y-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 block">Career Explorer</span>
            <div className="space-y-1">
              {lawCareers.map((car, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCareerIndex(idx)}
                  className={`w-full p-3 rounded-xl border text-left transition text-xs font-bold ${
                    selectedCareerIndex === idx
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850/60'
                  }`}
                >
                  {car.role}
                </button>
              ))}
            </div>
          </div>

          {/* Career Details Panel */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-850">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase text-amber-500">Legal Profession Pathway</span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">{selectedCareer.role}</h3>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
                Salary: {selectedCareer.salary}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Role Description</h4>
                <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed mt-1">{selectedCareer.desc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Eligibility & Requirements</span>
                  <p className="text-xs text-slate-650 dark:text-slate-350 mt-1.5 leading-relaxed">{selectedCareer.eligibility}</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Key Required Skills</span>
                  <p className="text-xs text-slate-650 dark:text-slate-350 mt-1.5 leading-relaxed">{selectedCareer.skills}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Typical Career Growth</h4>
                  <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed mt-1 font-semibold">{selectedCareer.growth}</p>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Key Top Recruiters</h4>
                  <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed mt-1 font-semibold">{selectedCareer.recruiters}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: COLLEGE EXPLORER */}
      {activeTab === 'colleges' && (
        <div className="space-y-6">
          
          {/* Filtering bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-450 pointer-events-none" />
              <input
                type="text"
                placeholder="Search law colleges by name or rank..."
                value={collegeSearch}
                onChange={(e) => setCollegeSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-hidden text-slate-800 dark:text-slate-200"
              />
            </div>
            <div className="flex gap-1">
              {['All', 'NLU', 'Government', 'Private'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedNluFilter(type as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                    selectedNluFilter === type
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {type === 'All' ? 'All Types' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Colleges list bento card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredColleges.map((col, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 hover:shadow-xs transition">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-0.5">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase tracking-wider">
                      {col.type}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-850 dark:text-white">{col.name}</h4>
                  </div>
                  <span className="text-[10px] font-black text-amber-500 text-right shrink-0">{col.rank}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-extrabold text-[10px] uppercase">Admission Process:</span>
                    <p className="text-slate-650 dark:text-slate-350 leading-relaxed mt-0.5">{col.admission}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400 font-extrabold text-[10px] uppercase">Annual Fee Structure:</span>
                      <p className="text-slate-650 dark:text-slate-350 leading-relaxed mt-0.5 font-semibold">{col.fees}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-extrabold text-[10px] uppercase">Placement Stat:</span>
                      <p className="text-slate-650 dark:text-slate-350 leading-relaxed mt-0.5 font-semibold">{col.placements}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400 font-extrabold text-[10px] uppercase">Hostel Facilities:</span>
                      <p className="text-slate-650 dark:text-slate-350 leading-relaxed mt-0.5">{col.hostels}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-extrabold text-[10px] uppercase">Available Scholarships:</span>
                      <p className="text-slate-650 dark:text-slate-350 leading-relaxed mt-0.5">{col.scholarships}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* SUB-TAB 6: AI LAW ASSISTANT PORTAL */}
      {activeTab === 'ai-assistant' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: INTERACTIVE AI PROMPTERS */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* QA Box */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-3xs">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                <h4 className="font-extrabold text-xs text-slate-800 dark:text-white uppercase tracking-wider">Ask Legal Education Question</h4>
              </div>
              <p className="text-[10px] text-slate-450 leading-relaxed">Inquire regarding NLU rankings, legal subject strategies, case lists, or exam prep metrics.</p>
              
              <div className="space-y-2">
                <textarea
                  placeholder="e.g. Compare CLAT and AILET or How to prepare Constitutional Law"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  className="w-full h-20 p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-hidden text-slate-800 dark:text-slate-200"
                />
                <button
                  onClick={handleAskAi}
                  disabled={isAiLoading || !aiQuestion.trim()}
                  className="w-full py-2 bg-amber-500 disabled:bg-slate-200 text-white font-extrabold text-xs rounded-xl hover:bg-amber-600 transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  {isAiLoading ? 'Synthesizing Answers...' : 'Submit to AI Legal Assistant'}
                </button>
              </div>
            </div>

            {/* Timetable Roadmap Generator */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-3xs">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-500" />
                <h4 className="font-extrabold text-xs text-slate-800 dark:text-white uppercase tracking-wider font-sans">Generate Legal Study Plan</h4>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Target Exam</label>
                  <select
                    value={planExam}
                    onChange={(e) => setPlanExam(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    {lawExams.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Plan Duration</label>
                  <select
                    value={planWeeks}
                    onChange={(e) => setPlanWeeks(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    <option value="4">4 Weeks (Crash Course)</option>
                    <option value="8">8 Weeks (Standard Preparation)</option>
                    <option value="12">12 Weeks (Detailed Revision)</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateStudyPlan}
                  className="w-full py-2 bg-slate-900 hover:bg-black text-white dark:bg-slate-800 dark:hover:bg-slate-750 font-black text-xs rounded-xl transition"
                >
                  Generate AI Timeline
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT: OUTPUT AREA */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Answer Display */}
            {aiResponse && (
              <div className="bg-white dark:bg-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-black uppercase text-slate-800 dark:text-white">AI Legal Counsel Response</span>
                </div>
                <div className="text-xs leading-relaxed text-slate-650 dark:text-slate-300 whitespace-pre-line space-y-2">
                  {aiResponse}
                </div>
              </div>
            )}

            {/* Roadmap Output */}
            {generatedPlan && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-black uppercase text-slate-800 dark:text-white">AI Roadmap Calendar</span>
                  </div>
                  <button
                    onClick={() => {
                      setGeneratedPlan(null);
                      if (triggerToast) triggerToast("Study Plan Cleared", "The study plan timeline has been removed.");
                    }}
                    className="p-1 rounded-md text-slate-405 hover:text-rose-500"
                    title="Clear Study Plan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {generatedPlan.map((p, pIdx) => (
                    <div key={pIdx} className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-xl space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase">
                          Week {p.week}
                        </span>
                        <span className="text-xs font-black text-slate-800 dark:text-white">{p.focus}</span>
                      </div>
                      <ul className="space-y-1.5 pl-4 list-disc text-[11px] text-slate-600 dark:text-slate-400">
                        {p.tasks.map((task: string, tIdx: number) => (
                          <li key={tIdx} className="leading-relaxed">{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Law Book Recommendations */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Premium Legal Book Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Constitutional Law of India', author: 'Dr. V.N. Shukla', reason: 'Uncontested standard for detailed constitutional mechanics and judicial precedents.' },
                  { title: 'The Law of Torts', author: 'Ratanlal & Dhirajlal', reason: 'Essential guide defining wrongful acts, civil remedies, and strict/absolute liability cases.' },
                  { title: 'Jurisprudence and Legal Theory', author: 'V.D. Mahajan', reason: 'Excellent foundational text covering analytical, natural, and historical legal philosophies.' },
                  { title: 'Legal Awareness and Reasoning', author: 'A.P. Bhardwaj', reason: 'Highest rated preparation playbook for CLAT UG and general legal reasoning entrance speed tests.' }
                ].map((book, bIdx) => (
                  <div key={bIdx} className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl space-y-1 border border-slate-150 dark:border-slate-850">
                    <p className="text-xs font-extrabold text-slate-850 dark:text-slate-200 leading-snug">{book.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold">By {book.author}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed italic">{book.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI-Powered Prep Tips */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">AI Legal Exam Revision Tips</h4>
              <div className="space-y-3">
                {[
                  { title: 'Passage Comprehension Speed', content: 'CLAT is a reading-intensive exam. Spend 30 minutes daily reading editorial articles from The Hindu or Indian Express to boost your visual parsing rate.' },
                  { title: 'Active Recall for Latin Maxims', content: 'Study legal terms like "Nemo debet esse judex in propria sua causa" using flashcards. Consistent active repetition beats passive scanning.' },
                  { title: 'Structure Judgment Synopses', content: 'Create 1-page briefs for major constitutional benches: state facts, core constitutional questions raised, ratio decidendi (reasoning), and dissent notes.' }
                ].map((tip, tIdx) => (
                  <div key={tIdx} className="p-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-xl space-y-1">
                    <h5 className="text-xs font-extrabold text-slate-850 dark:text-white flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{tip.title}</span>
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pl-5">{tip.content}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
