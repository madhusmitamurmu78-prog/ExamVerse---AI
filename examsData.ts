import { Exam, CurrentAffairItem, NotificationItem } from '../types';

export const EXAMS_SEED_DATA: Exam[] = [
  {
    id: 'upsc-cse',
    name: 'UPSC Civil Services Examination (IAS/IFS/IPS)',
    category: 'UPSC',
    shortDescription: 'The premier national exam to recruit officers for India\'s civil services, including IAS, IPS, and IFS.',
    eligibility: {
      ageLimit: '21 to 32 years (Relaxation for SC/ST/OBC as per rules)',
      educationalQualification: 'Graduation in any discipline from a recognized university',
      nationality: 'Citizen of India (or meet special criteria for Nepal, Bhutan)',
      reservationDetails: 'Reservation exists for SC, ST, OBC, EWS, and PwBD candidates as per Central Government norms.'
    },
    selectionProcess: [
      'Stage 1: Preliminary Examination (Objective, Qualifying)',
      'Stage 2: Main Examination (Written, Descriptive)',
      'Stage 3: Personality Test (Interview)'
    ],
    examPattern: [
      { subject: 'GS Paper I (Prelims)', questions: 100, marks: 200, duration: '2 Hours' },
      { subject: 'CSAT GS Paper II (Prelims - Qualifying 33%)', questions: 80, marks: 200, duration: '2 Hours' },
      { subject: 'Main - Essay (Descriptive)', questions: 2, marks: 250, duration: '3 Hours' },
      { subject: 'Main - GS I, II, III, IV (Each)', questions: 20, marks: 250, duration: '3 Hours each' },
      { subject: 'Main - Optional I & II (Each)', questions: 8, marks: 250, duration: '3 Hours each' },
      { subject: 'Interview / Personality Test', questions: 1, marks: 275, duration: '30-45 Mins' }
    ],
    syllabus: [
      {
        stage: 'Preliminary Examination (GS Paper I)',
        topics: [
          'Current events of national and international importance',
          'History of India and Indian National Movement',
          'Indian and World Geography - Physical, Social, Economic',
          'Indian Polity and Governance - Constitution, Political System, Panchayati Raj',
          'Economic and Social Development - Sustainable Development, Poverty, Inclusion',
          'General issues on Environmental Ecology, Bio-diversity, and Climate Change',
          'General Science'
        ]
      },
      {
        stage: 'Main Examination (General Studies papers)',
        topics: [
          'GS I: Indian Culture, History and Geography of the World and Society',
          'GS II: Governance, Constitution, Polity, Social Justice and International Relations',
          'GS III: Technology, Economic Development, Bio-diversity, Environment, Security and Disaster Management',
          'GS IV: Ethics, Integrity and Aptitude'
        ]
      }
    ],
    importantTopics: [
      'Indian Freedom Struggle (Modern History)',
      'Indian Constitution (Fundamental Rights & DPSPs)',
      'Inflation, Fiscal Policy & Budgeting',
      'Monsoon, Rivers & Agriculture in India',
      'Biodiversity hotspots and National Parks',
      'Climate change treaties and agreements'
    ],
    preparationStrategy: 'Start at least 12 months in advance. Read NCERT textbooks (Classes 6-12) for foundational subjects, follow a daily national newspaper (The Hindu or Indian Express) for Current Affairs, select your Optional subject early, and practice essay and answer writing regularly.',
    bestBooks: [
      { title: 'Indian Polity', author: 'M. Laxmikanth' },
      { title: 'A Brief History of Modern India', author: 'Spectrum / Rajiv Ahir' },
      { title: 'Indian Economy', author: 'Ramesh Singh' },
      { title: 'Certificate Physical and Human Geography', author: 'G.C. Leong' }
    ],
    pyqPapers: [
      { year: 2025, title: 'UPSC Prelims GS Paper I', downloadUrl: '#' },
      { year: 2024, title: 'UPSC Prelims GS Paper I', downloadUrl: '#' },
      { year: 2024, title: 'UPSC Mains GS Paper I-IV', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'upsc-mock-1', title: 'UPSC Prelims Full Length Mock 1', questionsCount: 100, durationMinutes: 120 },
      { id: 'upsc-mock-2', title: 'Polity & Constitution Sectional Test', questionsCount: 50, durationMinutes: 60 }
    ],
    dates: {
      applicationStart: '2026-02-14',
      applicationLastDate: '2026-03-05',
      correctionWindow: '2026-03-06 to 2026-03-12',
      admitCardRelease: '2026-05-10',
      examDate: '2026-05-31',
      answerKeyRelease: '2026-06-15',
      resultDate: '2026-09-15'
    },
    cutOffDetails: 'General Category cutoff for Prelims GS Paper 1 typically floats between 85 to 95 marks depending on difficulty.',
    counsellingDetails: 'Post Mains and Interview results, allocation to IAS, IFS, IPS, and Central Group A services is conducted through a centralized Service Allocation process governed by DoPT.',
    vacancyDetails: 'Approximately 1,050 to 1,200 posts are advertised annually.',
    salary: 'Basic starting salary of ₹56,100 (Level 10 Pay Matrix) plus DA, HRA, and official transport/residence.',
    requiredDocuments: [
      'Aadhar Card / Photo ID',
      'Class 10 Matriculation Certificate (for Age Proof)',
      'Degree Graduation Certificate / Consolidated Marksheets',
      'Category Certificate (SC/ST/OBC/EWS) if applicable'
    ],
    applicationFees: {
      general: 100,
      reserved: 0,
      details: 'All female candidates, SC/ST, and Persons with Benchmark Disability are exempted from paying fees.'
    },
    howToApply: [
      'Visit the official UPSC Online portal (upsconline.nic.in).',
      'Register on the One-Time Registration (OTR) platform.',
      'Fill up Part I of the application containing personal details and academic qualifications.',
      'Pay the application fee of ₹100 (if not exempted).',
      'Upload high-quality scanned photo, signature, and Photo ID document.',
      'Fill Part II: Choose exam center and submit the final application. Print confirmation receipt.'
    ],
    officialWebsite: 'https://upsc.gov.in',
    officialContactInfo: 'UPSC Facilitation Counter, Dholpur House, Shahjahan Road, New Delhi. Phone: 011-23385271 / 23381125',
    faqs: [
      { question: 'Is there a limit on the number of attempts?', answer: 'Yes. General category candidates have 6 attempts. OBC candidates have 9. SC/ST candidates have unlimited attempts up to the age limit.' },
      { question: 'Can final year graduation students apply?', answer: 'Yes, final year undergraduate students can apply for UPSC Prelims provided they can submit proof of passing before registering for the UPSC Mains (DAF I).' }
    ]
  },
  {
    id: 'ssc-cgl',
    name: 'SSC Combined Graduate Level (CGL) Exam',
    category: 'SSC',
    shortDescription: 'National level recruitment exam for non-technical Group B and Group C non-gazetted posts in various ministries.',
    eligibility: {
      ageLimit: '18 to 32 years (depending on post)',
      educationalQualification: 'Bachelor\'s Degree in any discipline from a recognized university',
      nationality: 'Citizen of India, Nepal, or Bhutan',
      reservationDetails: 'Standard reservation applies for SC/ST/OBC/EWS/Ex-servicemen.'
    },
    selectionProcess: [
      'Tier I: Computer Based Examination (Objective, Qualifying)',
      'Tier II: Computer Based Examination (Objective, Descriptive, Typing Test)'
    ],
    examPattern: [
      { subject: 'Tier I - General Intelligence & Reasoning', questions: 25, marks: 50, duration: '60 Mins (Combined)' },
      { subject: 'Tier I - Quantitative Aptitude', questions: 25, marks: 50 },
      { subject: 'Tier I - English Comprehension', questions: 25, marks: 50 },
      { subject: 'Tier I - General Awareness', questions: 25, marks: 50 },
      { subject: 'Tier II - Mathematical Abilities', questions: 30, marks: 90, duration: '2 Hours 15 Mins' },
      { subject: 'Tier II - Reasoning & General Intelligence', questions: 30, marks: 90 },
      { subject: 'Tier II - English Language & Comprehension', questions: 45, marks: 135 },
      { subject: 'Tier II - General Awareness', questions: 25, marks: 75 }
    ],
    syllabus: [
      {
        stage: 'Tier I & II - Quantitative Aptitude',
        topics: [
          'Computation of whole numbers, decimals, fractions',
          'Ratio & Proportion, Square Roots, Averages, Interest',
          'Profit & Loss, Discount, Partnership, Mixture & Alligation',
          'Time & Distance, Time & Work',
          'Basic Algebra, Geometry, Mensuration, Trigonometry, Statistics & Probability'
        ]
      },
      {
        stage: 'Tier I & II - Reasoning',
        topics: [
          'Semantic, Symbolic, Number Analogy & Classification',
          'Venn Diagrams, Syllogisms, Drawing Inferences',
          'Coding-Decoding, Numerical Operations, Word Building'
        ]
      }
    ],
    importantTopics: [
      'Geometry & Mensuration theorems',
      'Algebraic Identities',
      'Trigonometric Heights & Distances',
      'Data Interpretation (Bar/Pie charts)',
      'Synonyms, Antonyms, Active/Passive Voice, Spot the Error'
    ],
    preparationStrategy: 'Practice speed math and mental calculation. Solve past 10 years papers daily. Build strong speed and accuracy since Tier-I has negative marking of 0.50 marks. Practice daily touch-typing for Tier-II.',
    bestBooks: [
      { title: 'Quantitative Aptitude for Competitive Examinations', author: 'R.S. Aggarwal' },
      { title: 'Word Power Made Easy', author: 'Norman Lewis' },
      { title: 'A Modern Approach to Verbal & Non-Verbal Reasoning', author: 'R.S. Aggarwal' }
    ],
    pyqPapers: [
      { year: 2024, title: 'SSC CGL Tier I Shift-1 Paper', downloadUrl: '#' },
      { year: 2023, title: 'SSC CGL Tier II Full Paper', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'ssc-mock-1', title: 'SSC CGL Tier I Full Mock', questionsCount: 100, durationMinutes: 60 }
    ],
    dates: {
      applicationStart: '2026-06-11',
      applicationLastDate: '2026-07-10',
      correctionWindow: '2026-07-12 to 2026-07-13',
      admitCardRelease: '2026-08-25',
      examDate: '2026-09-10',
      answerKeyRelease: '2026-09-25',
      resultDate: '2026-11-15'
    },
    cutOffDetails: 'Tier I cut-off generally hovers around 130 to 145 marks out of 200 for UR, varying by posts.',
    salary: 'Starting from ₹25,500 (Level 4) up to ₹1,51,100 (Level 8 Assistant Audit Officer post).',
    requiredDocuments: [
      'High school, Intermediate, and Bachelor Degree documents',
      'Passport size photographs',
      'ID Card (Aadhar, PAN, Voter ID)'
    ],
    applicationFees: {
      general: 100,
      reserved: 0,
      details: 'Women, SC, ST, ESM, and PwBD candidates are exempted from payment of fee.'
    },
    howToApply: [
      'Go to ssc.gov.in and click register.',
      'Fill out basic information to generate OTR details.',
      'Apply to COMBINED GRADUATE LEVEL EXAMINATION.',
      'Upload live webcam-captured photograph and scanned signature.',
      'Pay ₹100 via UPI or net banking, check status and submit.'
    ],
    officialWebsite: 'https://ssc.gov.in',
    officialContactInfo: 'SSC Headquarters, Block No-12, CGO Complex, Lodhi Road, New Delhi-110003. Phone: 1800-309-3063',
    faqs: [
      { question: 'Is there a physical standard test?', answer: 'Yes, for specific posts like Inspector (Central Excise, Examiner, Preventive Officer, CBI, NIA), physical efficiency and medical exams are required.' }
    ]
  },
  {
    id: 'jee-advanced',
    name: 'JEE (Joint Entrance Examination) Advanced',
    category: 'Engineering Entrance Exams',
    shortDescription: 'The ultimate entrance test to secure undergraduate B.Tech admissions in India\'s premier Indian Institutes of Technology (IITs).',
    eligibility: {
      ageLimit: 'Candidates should have been born on or after October 1, 2001 (5 years relaxation for SC/ST/PwD)',
      educationalQualification: 'Must be among top 2,50,000 successful candidates in JEE Main Paper 1 and passed Class 12th.',
      nationality: 'Indian citizens, OCI, PIO, and Foreign nationals',
      reservationDetails: 'Standard reservation structure: General-EWS (10%), OBC-NCL (27%), SC (15%), ST (7.5%), PwD (5% horizontal).'
    },
    selectionProcess: [
      'JEE Main (Stage 1 Qualification)',
      'JEE Advanced (Stage 2 - Two Papers, mandatory both)',
      'Joint Seat Allocation (JoSAA) Counselling'
    ],
    examPattern: [
      { subject: 'Paper 1 (Physics, Chemistry, Math - Objective, MCQ + Numerical + Matching)', questions: 54, marks: 180, duration: '3 Hours' },
      { subject: 'Paper 2 (Physics, Chemistry, Math - Objective, Multi-correct + Numerical)', questions: 54, marks: 180, duration: '3 Hours' }
    ],
    syllabus: [
      {
        stage: 'Physics',
        topics: [
          'General: Units & dimensions, Errors, Vernier caliper & Screw gauge',
          'Mechanics: Kinematics, Newton\'s laws, Work-Energy-Power, Rotational motion, Gravitation, Elasticity',
          'Thermal Physics, Electricity & Magnetism, Optics, Modern Physics'
        ]
      },
      {
        stage: 'Chemistry',
        topics: [
          'Physical Chemistry: Atomic structure, Chemical bonding, Thermodynamics, Electrochemistry, Kinetics',
          'Inorganic Chemistry: Coordination compounds, d-block, p-block elements',
          'Organic Chemistry: Hydrocarbons, Isomerism, Carbonyl compounds, Biomolecules'
        ]
      }
    ],
    importantTopics: [
      'Rotation & Angular Momentum',
      'Organic Synthesis pathways & Reagents',
      'Electrochemistry & Ionic Equilibrium',
      'Calculus (Definite Integrals & Area)',
      'Modern Physics & Photoelectric effect',
      'Vectors & 3D Geometry'
    ],
    preparationStrategy: 'Focus intensely on deep conceptual problem solving rather than memory. Build strong fundamental concepts via H.C. Verma (Physics) and RC Mukherjee (Physical Chemistry). Solve complex multi-concept questions. Practice mock exams in exactly 3-hour blocks twice a day.',
    bestBooks: [
      { title: 'Concepts of Physics (Vol 1 & 2)', author: 'H.C. Verma' },
      { title: 'University Chemistry', author: 'Bruce H. Mahan' },
      { title: 'Calculus for JEE', author: 'Amit M. Agarwal' }
    ],
    pyqPapers: [
      { year: 2025, title: 'JEE Advanced Paper I & II', downloadUrl: '#' },
      { year: 2024, title: 'JEE Advanced Paper I & II', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'jee-mock-1', title: 'JEE Advanced Full Syllabus Mock 1', questionsCount: 36, durationMinutes: 180 }
    ],
    dates: {
      applicationStart: '2026-04-27',
      applicationLastDate: '2026-05-07',
      correctionWindow: '2026-05-09 to 2026-05-10',
      admitCardRelease: '2026-05-18',
      examDate: '2026-05-24',
      answerKeyRelease: '2026-06-01',
      resultDate: '2026-06-14'
    },
    cutOffDetails: 'Minimum aggregate cut-off marks for ranking typically ranges around 25% to 30% for general categories, with subject-wise minimums of around 5% to 8%.',
    counsellingDetails: 'Online JoSAA counselling operates in 6 rounds based on merit ranks to allot seats in IITs, NITs, IIITs, and GFTIs.',
    vacancyDetails: 'Over 17,300 undergraduate seats across 23 IITs.',
    salary: 'Starting packages range from ₹12 Lakhs to ₹60+ Lakhs per annum after graduation from top IITs.',
    requiredDocuments: [
      'Class 10 Certificate (DoB proof)',
      'Class 12 Marks card',
      'Category Certificate (OBC-NCL, SC, ST, EWS)',
      'Medical certificate as per JoSAA format'
    ],
    applicationFees: {
      general: 3200,
      reserved: 1600,
      details: 'Female candidates (all categories) pay ₹1600. SC/ST/PwD pay ₹1600. All other candidates pay ₹3200.'
    },
    howToApply: [
      'Visit the official JEE Advanced registration portal (jeeadv.ac.in).',
      'Log in using JEE Main roll number and password.',
      'Fill choices for exam cities (minimum 8 preferences).',
      'Upload Class 12, Birth Proof, and Category certificates.',
      'Pay application fees online and print the registered candidate page.'
    ],
    officialWebsite: 'https://jeeadv.ac.in',
    officialContactInfo: 'JEE Office, IIT Kharagpur, Kharagpur - 721302. Email: jeeadv@iitkgp.ac.in. Phone: 03222-282101',
    faqs: [
      { question: 'How many times can I attempt JEE Advanced?', answer: 'A candidate can attempt JEE Advanced a maximum of two times in consecutive years.' },
      { question: 'Is Class 12th percentage eligibility criteria back?', answer: 'Yes, candidates must secure at least 75% aggregate marks in Class 12 board (65% for SC/ST) or be in the top 20 percentile of their board.' }
    ]
  },
  {
    id: 'neet-ug',
    name: 'NEET UG (National Eligibility cum Entrance Test)',
    category: 'Medical Entrance Exams',
    shortDescription: 'The single nationwide entrance test for admission to undergraduate medical programs (MBBS, BDS, AYUSH) in all Indian colleges including AIIMS.',
    eligibility: {
      ageLimit: 'Minimum 17 years as on Dec 31 of admission year. No upper age limit.',
      educationalQualification: 'Passed or appearing Class 12 with Physics, Chemistry, Biology/Biotech, and English as core subjects with minimum 50% marks (40% for SC/ST/OBC).',
      nationality: 'Indian citizens, NRIs, OCI, PIO, and Foreign Nationals',
      reservationDetails: 'Central government norms apply for all-India quota (15%) seats: SC 15%, ST 7.5%, OBC-NCL 27%, EWS 10%, PwD 5%.'
    },
    selectionProcess: [
      'NEET Exam (Single Shift OMR Sheet Examination)',
      'Centralized AACCC/MCC Counselling (All India Quota 15%)',
      'State-Level Medical Authority Counselling (State Quota 85%)'
    ],
    examPattern: [
      { subject: 'Physics (Section A: 35 Qs, Section B: 15 Qs, attempt any 10)', questions: 50, marks: 180, duration: '200 Mins (Combined)' },
      { subject: 'Chemistry (Section A: 35 Qs, Section B: 15 Qs, attempt any 10)', questions: 50, marks: 180 },
      { subject: 'Biology - Botany (Section A: 35 Qs, Section B: 15 Qs)', questions: 50, marks: 180 },
      { subject: 'Biology - Zoology (Section A: 35 Qs, Section B: 15 Qs)', questions: 50, marks: 180 }
    ],
    syllabus: [
      {
        stage: 'Class 11 & 12 Biology',
        topics: [
          'Diversity in Living World, Structural Organisation in Animals and Plants',
          'Cell Structure and Function, Plant Physiology, Human Physiology',
          'Reproduction, Genetics and Evolution, Biology and Human Welfare',
          'Biotechnology and Its Applications, Ecology and Environment'
        ]
      },
      {
        stage: 'Class 11 & 12 Chemistry',
        topics: [
          'Some Basic Concepts, Structure of Atom, Classification of Elements',
          'Chemical Bonding, Thermodynamics, Equilibrium, Redox Reactions',
          'Organic Chemistry basic principles, Hydrocarbons, Carbonyl, Coordination compound'
        ]
      }
    ],
    importantTopics: [
      'Human Physiology (Zoology)',
      'Plant Kingdom & Genetics (Botany)',
      'Mechanics & Electrodynamics (Physics)',
      'Organic reaction mechanisms (Chemistry)',
      'Chemical Bonding & Periodic Table (Inorganic)'
    ],
    preparationStrategy: 'Master NCERT line-by-line, especially for Biology and Chemistry. Since Biology carries 360 marks (half the total), aim for 340+ there. Practice speed, as you have 180 questions to answer in 200 minutes with negative marking.',
    bestBooks: [
      { title: 'NCERT Biology Textbook (Class 11 & 12)', author: 'NCERT' },
      { title: 'Objective Biology for NEET', author: 'Dinesh Publications' },
      { title: 'Concepts of Physics', author: 'H.C. Verma' }
    ],
    pyqPapers: [
      { year: 2025, title: 'NEET Code E1-E6 Paper', downloadUrl: '#' },
      { year: 2024, title: 'NEET UG Question Paper', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'neet-mock-1', title: 'NEET Full Length Mock 1', questionsCount: 180, durationMinutes: 200 }
    ],
    dates: {
      applicationStart: '2026-02-09',
      applicationLastDate: '2026-03-16',
      correctionWindow: '2026-03-18 to 2026-03-20',
      admitCardRelease: '2026-04-28',
      examDate: '2026-05-03',
      answerKeyRelease: '2026-05-15',
      resultDate: '2026-06-18'
    },
    cutOffDetails: 'Qualifying percentile is 50th percentile for General and 40th for SC/ST/OBC. To get into government medical colleges, aim for 610+ marks out of 720.',
    counsellingDetails: 'Conducted by MCC (Medical Counselling Committee) for AIQ, Deemed, and Central Universities.',
    vacancyDetails: 'Total of ~1,08,000 MBBS, ~28,000 BDS, and ~52,000 AYUSH seats.',
    salary: 'Stipend of ₹15,000 to ₹35,000 during MBBS internship. Starting junior doctor package is ₹7L-12L per annum.',
    requiredDocuments: [
      'NEET Admit Card & Scorecard',
      'Class 10 and 12 certificates & marksheets',
      'Identity proof (Aadhar/PAN/Driver License)',
      'Eight passport size photographs',
      'Provisional allotment letter'
    ],
    applicationFees: {
      general: 1700,
      reserved: 1000,
      details: 'General-EWS/OBC-NCL pay ₹1600. SC/ST/PwD pay ₹1000. Foreign nationals pay ₹9500.'
    },
    howToApply: [
      'Register on neet.nta.nic.in.',
      'Fill up the application form and note down application system number.',
      'Upload scanned passport size photograph, postcard size photo, signature, left-hand thumb impression.',
      'Pay fees online via Net Banking/Debit Card/UPI.',
      'Download and print confirmation page.'
    ],
    officialWebsite: 'https://exams.nta.ac.in/NEET/',
    officialContactInfo: 'NTA Help Desk: 011-40759000 / 011-69227700. Email: neet@nta.ac.in',
    faqs: [
      { question: 'Is NEET mandatory for Ayush courses?', answer: 'Yes, NEET is compulsory for admissions to BAMS, BHMS, BUMS, and BYNS.' }
    ]
  },
  {
    id: 'google-pca',
    name: 'Google Cloud Professional Cloud Architect',
    category: 'IT Certification Exams',
    shortDescription: 'The premier industry-recognized certification validating capability to design, develop, and manage robust, secure, and scalable Google Cloud solutions.',
    eligibility: {
      ageLimit: 'Must be 18 years or older',
      educationalQualification: 'No formal educational requirement. Recommended: 3+ years of industry experience including 1+ years designing Google Cloud systems.',
      nationality: 'Open to all nationalities',
      reservationDetails: 'Not applicable for professional certifications.'
    },
    selectionProcess: [
      'Single Online / In-person Proctored Examination (2 Hours)'
    ],
    examPattern: [
      { subject: 'Multiple Choice & Multiple Select (Based on 4 active Case Studies)', questions: 50, marks: 100, duration: '120 Mins' }
    ],
    syllabus: [
      {
        stage: 'Core Architect Curriculum',
        topics: [
          'Designing and planning a cloud solution architecture (high availability, storage, compute, networking)',
          'Managing and provisioning the cloud infrastructure (GCP Resource Hierarchy, IAM, Deployment Manager/Terraform)',
          'Designing for security and compliance (KMS, Shared VPC, Cloud Armor, Cloud Audit Logs)',
          'Analyzing and optimizing technical and business processes',
          'Managing implementation (Stackdriver monitoring, trace, debugging, deployment strategies)',
          'Ensuring solution and operations reliability (Site Reliability Engineering practices, DR plans)'
        ]
      }
    ],
    importantTopics: [
      'Google Kubernetes Engine (GKE) design & scaling',
      'Compute Engine autoscaling & instance templates',
      'Cloud Spanner vs Cloud SQL vs Bigtable vs Firestore decision tree',
      'Shared VPC, VPC Peering & Interconnect setups',
      'IAM fine-grained roles & Service Accounts design',
      'Case Studies: Mountkirk Games, TerramEarth, EHR Healthcare, Helicopter Rescue Service'
    ],
    preparationStrategy: 'Thoroughly analyze and memorize the 4 official GCP case studies. Take the Google Cloud Skills Boost "Cloud Architect" learning path. Memorize GCP networking rules (load balancing decision tree, storage choosing flow). Do extensive hands-on Qwiklabs.',
    bestBooks: [
      { title: 'Google Cloud Certified Professional Cloud Architect study guide', author: 'Dan Sullivan' },
      { title: 'Official Google Cloud Certification Practice Tests', author: 'Google Cloud' }
    ],
    pyqPapers: [],
    mockTests: [
      { id: 'gcp-mock-1', title: 'Professional Cloud Architect official practice test', questionsCount: 50, durationMinutes: 120 }
    ],
    dates: {
      applicationStart: 'Anytime',
      applicationLastDate: 'Anytime',
      examDate: 'Scheduled by Candidate'
    },
    cutOffDetails: 'Pass/Fail grading scale based on secret adaptive statistical scale. Score reports are not released.',
    salary: 'Average salary for GCP Cloud Architects is $160,000+ per year in the US, and ₹18L-35L in India.',
    requiredDocuments: [
      'Two forms of government-issued identification (one with photo, e.g., passport or driver license)'
    ],
    applicationFees: {
      general: 200,
      reserved: 200,
      details: 'Price is $200 USD plus applicable taxes.'
    },
    howToApply: [
      'Create a Google Cloud Webassessor account (kryteriononline.com/gcp).',
      'Select Google Cloud Certified Professional Cloud Architect.',
      'Select testing center or remote proctoring option.',
      'Pick a date and convenient time slot.',
      'Pay via credit card or voucher code and receive confirmation email.'
    ],
    officialWebsite: 'https://cloud.google.com/learn/certification/cloud-architect',
    officialContactInfo: 'Google Cloud Certification Support: webassessor.com/gcp/contact',
    faqs: [
      { question: 'How long is the certification valid?', answer: 'The GCP Professional Cloud Architect credential is valid for two years. Re-certification requires passing the latest version of the exam.' }
    ]
  },
  {
    id: 'cat-exam',
    name: 'CAT (Common Admission Test)',
    category: 'Management Exams',
    shortDescription: 'Computer-based admission test conducted by Indian Institutes of Management (IIMs) for postgraduate business administration (MBA) admissions.',
    eligibility: {
      ageLimit: 'No age limit',
      educationalQualification: 'Bachelor\'s Degree with at least 50% marks (45% for SC/ST/PwD) from a recognized university.',
      nationality: 'Indian citizens and foreign nationals',
      reservationDetails: 'Standard reservation applies for SC (15%), ST (7.5%), OBC-NCL (27%), EWS (10%), and PwD (5%).'
    },
    selectionProcess: [
      'CAT Written Exam',
      'Analytical Writing Test (AWT) & Group Discussion (GD) / Written Ability Test (WAT)',
      'Personal Interview (PI)'
    ],
    examPattern: [
      { subject: 'Section 1: Verbal Ability & Reading Comprehension (VARC)', questions: 24, marks: 72, duration: '40 Mins' },
      { subject: 'Section 2: Data Interpretation & Logical Reasoning (DILR)', questions: 20, marks: 60, duration: '40 Mins' },
      { subject: 'Section 3: Quantitative Ability (QA)', questions: 22, marks: 66, duration: '40 Mins' }
    ],
    syllabus: [
      {
        stage: 'VARC Section',
        topics: [
          'Reading Comprehension (Long & short passages, summary, central theme)',
          'Para-jumbles and Odd-one-out questions',
          'Sentence correction and completion'
        ]
      },
      {
        stage: 'DILR Section',
        topics: [
          'Data Interpretation: Tables, Bar, Pie, Line charts, Caselets, Radar charts',
          'Logical Reasoning: Seating arrangement, Team formation, Syllogisms, Binary logic, Games & tournaments'
        ]
      }
    ],
    importantTopics: [
      'Algebra & Number Systems',
      'Arithmetic (Time, Speed, Distance, Percentages, SI/CI)',
      'Seating Arrangement & Grid puzzles',
      'Reading Comprehension (Humanities, Science, Philosophy texts)',
      'Geometry & Coordinate Geometry'
    ],
    preparationStrategy: 'Start preparing 8-10 months in advance. Reading diverse articles from aeon.co and Guardian is key for VARC. For DILR, practice at least 4 unique logical puzzles every day. Quantitative Ability requires conceptual clarity and speed, with a focus on shortcuts and mental math.',
    bestBooks: [
      { title: 'How to Prepare for Quantitative Aptitude for the CAT', author: 'Arun Sharma' },
      { title: 'How to Prepare for Verbal Ability and Reading Comprehension for CAT', author: 'Arun Sharma & Meenakshi Upadhyay' },
      { title: 'How to Prepare for Data Interpretation & Logical Reasoning for CAT', author: 'Nishit K. Sinha' }
    ],
    pyqPapers: [
      { year: 2025, title: 'CAT Slot 1, 2 & 3 Papers', downloadUrl: '#' },
      { year: 2024, title: 'CAT Slot 1, 2 & 3 Papers', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'cat-mock-1', title: 'CAT Full Length Pro-Mock 1', questionsCount: 66, durationMinutes: 120 }
    ],
    dates: {
      applicationStart: '2026-08-05',
      applicationLastDate: '2026-09-18',
      correctionWindow: '2026-09-21 to 2026-09-23',
      admitCardRelease: '2026-11-05',
      examDate: '2026-11-29',
      answerKeyRelease: '2026-12-05',
      resultDate: '2027-01-05'
    },
    cutOffDetails: 'Getting into Top 3 IIMs (Ahmedabad, Bangalore, Calcutta) usually requires a CAT percentile of 99.5+ along with excellent academics.',
    salary: 'Average placement packages at IIM A, B, C are ₹28L-35L per annum, with peak packages up to ₹1.2 Crore.',
    requiredDocuments: [
      'Class 10 and 12 marksheets',
      'Bachelor\'s Degree graduation marks certificate',
      'Work Experience proof (if applicable)',
      'Category certificates (SC/ST/OBC/EWS/PwD)'
    ],
    applicationFees: {
      general: 2400,
      reserved: 1200,
      details: '₹1200 for SC/ST/PwD candidates.'
    },
    howToApply: [
      'Visit registration portal iimcat.ac.in during application dates.',
      'Generate login ID and password.',
      'Fill profile details, contact information, and upload documents (Photo, Signature, caste certificate).',
      'Select course programs in various IIMs and pick 6 preferred test cities.',
      'Pay application fees online and click finalize submission.'
    ],
    officialWebsite: 'https://iimcat.ac.in',
    officialContactInfo: 'CAT Center, IIM Ahmedabad. Email: cathelpdesk@iimcat.ac.in. Phone: 1800-210-1088',
    faqs: [
      { question: 'Is work experience mandatory for CAT?', answer: 'No, freshers are completely eligible. However, many IIMs award additional selection weightage points (typically 5% to 10%) for 1-3 years of full-time post-graduate corporate work experience.' }
    ]
  },
  {
    id: 'ojee',
    name: 'Odisha Joint Entrance Examination (OJEE)',
    category: 'Engineering',
    shortDescription: 'A state-level entrance examination conducted by the OJEE Board for admission into professional undergraduate, postgraduate, and lateral entry programs in Pharmaceutics, Management, MCA, M.Tech, and Architecture across government and private colleges in Odisha.',
    eligibility: {
      ageLimit: 'No age limit for B.Pharm and M.Tech programs. For MBA and MCA, candidates must be at least 21 years old as of the examination date.',
      educationalQualification: 'For B.Pharm: Passed 10+2 with Physics and Chemistry as compulsory subjects along with Mathematics/Biology. For MBA/MCA: Bachelor\'s degree with at least 50% marks (45% for reserved categories). For Lateral Entry (B.Tech): 3-year Diploma in Engineering with at least 45% marks.',
      nationality: 'Citizen of India. Permanent residency of Odisha is required for state government college seats.',
      reservationDetails: 'SC: 8%, ST: 12%, Green Card Holders: 5%, Physically Challenged (PwD): 5%, Women: 30% reservation in government colleges, Ex-Servicemen: 3%.'
    },
    selectionProcess: [
      'Stage 1: Online Computer-Based Entrance Examination (OJEE CBT)',
      'Stage 2: Publication of Merit Lists & Rank Cards',
      'Stage 3: Centralized Online Counselling & Seat Allocation (Web Counselling)',
      'Stage 4: Document Verification and Seat Acceptance Fee Payment'
    ],
    examPattern: [
      { subject: 'B.Pharm - Physics & Chemistry', questions: 80, marks: 320, duration: '2 Hours' },
      { subject: 'B.Pharm - Mathematics or Biology', questions: 40, marks: 160, duration: '1 Hour' },
      { subject: 'MBA - Quantitative, Reasoning, English, General Awareness', questions: 120, marks: 480, duration: '2 Hours' },
      { subject: 'MCA - Mathematics & Computer Awareness', questions: 120, marks: 480, duration: '2 Hours' },
      { subject: 'M.Tech (Engineering Disciplines) - Core Engineering & Engineering Math', questions: 90, marks: 360, duration: '2 Hours' }
    ],
    syllabus: [
      {
        stage: 'B.Pharm Syllabus (Physics, Chemistry & Biology/Math)',
        topics: [
          'Physics: Mechanics, Waves & Oscillations, Optics, Electrostatics, Magnetic effects of current, Modern Physics',
          'Chemistry: Atomic Structure, Chemical Bonding, Solid State, Solutions, Thermodynamics, Organic Reaction Mechanisms, Coordination Compounds',
          'Biology: Diversity in Living World, Structural Organisation in Plants & Animals, Human Physiology, Genetics & Evolution, Biotechnology',
          'Mathematics: Sets, Relations & Functions, Quadratic Equations, Complex Numbers, Matrices, Integration, Coordinate Geometry, Probability'
        ]
      },
      {
        stage: 'MBA Syllabus (Aptitude, Reasoning, English, General Knowledge)',
        topics: [
          'Quantitative Techniques: Arithmetic, Profit & Loss, Percentage, Simple/Compound Interest, Algebra, Geometry, Probability',
          'Analytical & Logical Reasoning: Syllogisms, Blood Relations, Seating Arrangements, Coding-Decoding, Analogies',
          'Verbal Reasoning & Comprehension: Vocabulary, Reading Passages, Synonyms, Grammar correction, Sentence ordering',
          'General Awareness: Business Current Affairs, Economy, Science & Tech, Sports, Odisha State GK'
        ]
      },
      {
        stage: 'MCA Syllabus (Mathematics & Computer Awareness)',
        topics: [
          'Mathematics: Set Theory, Algebra, Coordinate Geometry, Vectors, Trigonometry, Calculus, Probability & Statistics',
          'Computer Awareness: Computer Basics, CPU architecture, Memory organisation, Data representation (Binary, Hexadecimal), Logic Gates, Boolean Algebra, Overview of C/C++ programming language'
        ]
      }
    ],
    importantTopics: [
      'B.Pharm: Organic Chemistry, Mechanics & Electrostatics, Genetics & Plant Anatomy',
      'MBA: Data Interpretation (Charts/Tables), Logical Puzzles, Reading Comprehension, Business GK',
      'MCA: Set Theory & Matrices, Boolean Logic & Gates, Binary Arithmetic, Pointer concepts in C/C++'
    ],
    preparationStrategy: '1. Align with NCERT textbooks for B.Pharm preparation.\n2. For MBA/MCA, focus on standard aptitude and reasoning questions. Practice time management since there are 120 questions to solve in 2 hours.\n3. Practice previous year OJEE question papers to get familiar with state-specific exam difficulty.\n4. Dedicate the last 15 days entirely to high-yield mock tests and reviewing important formulae.',
    bestBooks: [
      { title: 'OJEE Engineering & Pharmacy Preparatory Guide', author: 'Arihant Publications' },
      { title: 'A Complete Guide for MCA Entrance Examinations', author: 'R.S. Aggarwal' },
      { title: 'The Pearson Guide to MBA Entrance Examinations', author: 'Edgar Thorpe' }
    ],
    pyqPapers: [
      { year: 2025, title: 'OJEE MBA Previous Year Question Paper', downloadUrl: '#' },
      { year: 2024, title: 'OJEE B.Pharm official Question Paper', downloadUrl: '#' },
      { year: 2023, title: 'OJEE MCA Previous Year Question Paper', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'ojee-mock-mba', title: 'OJEE MBA Full Length Mock Test 1', questionsCount: 120, durationMinutes: 120 },
      { id: 'ojee-mock-pharm', title: 'OJEE B.Pharm (Physics & Chemistry) Sectional Test', questionsCount: 80, durationMinutes: 120 }
    ],
    dates: {
      applicationStart: '2026-01-25',
      applicationLastDate: '2026-03-22',
      correctionWindow: '2026-03-23 to 2026-03-25',
      admitCardRelease: '2026-04-20',
      examDate: '2026-05-08',
      answerKeyRelease: '2026-05-15',
      resultDate: '2026-06-03'
    },
    cutOffDetails: 'OJEE Cut-Off is published in the form of opening and closing ranks for each branch/college. Top colleges like OUTR (formerly CET) and VSSUT close at under 500 state rank for general candidates in popular streams.',
    counsellingDetails: 'Centralized online counselling is conducted by the OJEE committee. Candidates register, fill choices of colleges/streams, undergo document verification, and receive seat allotment based on rank. The process typically has 3-4 rounds followed by a spot admission round.',
    vacancyDetails: 'Total intake of over 35,000 seats across B.Pharm, MBA, MCA, M.Tech, and Lateral Entry courses in government and private colleges of Odisha.',
    salary: 'Starting salaries average ₹4.5 LPA to ₹12 LPA depending on the course (highest for MBA/MCA/M.Tech from top government institutes like OUTR and VSSUT).',
    requiredDocuments: [
      'Class 10 Board Certificate (Age proof)',
      'Class 12 / Graduate Degree Marksheet & Certificate',
      'Odisha Resident / Nativity Certificate (mandatory for state quota seats)',
      'Category Certificate (SC/ST/Non-Creamy OBC/EWS) if applicable',
      'Green Card / PwD Certificate if claiming reservation benefits'
    ],
    applicationFees: {
      general: 1000,
      reserved: 1000,
      details: 'The application fee is ₹1000 for a single course (e.g. MBA). For multiple combined courses (e.g. MBA and MCA), it is ₹1500.'
    },
    howToApply: [
      'Go to the official OJEE website (ojee.nic.in / odishajee.com).',
      'Click on "Registration for OJEE 2026" and create an account with your email and phone number.',
      'Log in and fill up the application form with personal, academic, and contact details.',
      'Select the course stream you want to apply for and choose your preferred exam center cities (up to 3).',
      'Upload your passport-size photo, scanned signature, and required certificates.',
      'Pay the fee online via Credit Card/Debit Card/UPI/Net Banking. Save and print the confirmation page.'
    ],
    officialWebsite: 'https://ojee.nic.in',
    officialNotificationPdfUrl: 'https://ojee.nic.in/wp-content/uploads/2026/01/OJEE2026_Information_Brochure.pdf',
    officialContactInfo: 'OJEE Office, JEE Cell, Gandamunda, Khandagiri, Bhubaneswar, Odisha - 751030. Phone: 0674-2382101 / 2382108. Email: odishajee.ojee@gmail.com',
    faqs: [
      { question: 'Is OJEE conducted online or offline?', answer: 'OJEE is conducted strictly as an online Computer-Based Test (CBT) across various centers in Odisha and outside.' },
      { question: 'Are candidates from other states eligible for OJEE seats?', answer: 'Yes, but other state candidates are only eligible for private college seats under the All India Quota. Government college seats are strictly reserved for Odisha state native candidates.' }
    ]
  },
  {
    id: 'cuet-ug',
    name: 'Common University Entrance Test - Under Graduate (CUET UG)',
    category: 'CUET',
    shortDescription: 'A national-level entrance examination conducted by the National Testing Agency (NTA) for admission into undergraduate programs (BA, BSc, BCom, BTech, BBA, Integrated PG) in Central, State, Deemed, and Private Universities across India.',
    eligibility: {
      ageLimit: 'No age limit is specified by NTA for appearing in CUET UG. However, candidates must satisfy the age criteria of individual participating universities.',
      educationalQualification: 'Passed or appearing in Class 12 (or equivalent) from any recognized educational board (CBSE, ICSE, State Boards). Minimum marks requirement depends on the target university.',
      nationality: 'Citizen of India, or foreign nationals who meet NTA eligibility criteria.',
      reservationDetails: 'Central University reservation policies apply: OBC-NCL: 27%, SC: 15%, ST: 7.5%, EWS: 10%, PwBD: 5% in each category.'
    },
    selectionProcess: [
      'Stage 1: CUET UG Computer-Based Objective Examination',
      'Stage 2: Declaration of NTA Scores (Percentiles & Normalized Scores)',
      'Stage 3: Centralized and Individual University Counselling registration (CSAS for Delhi University, etc.)',
      'Stage 4: Publication of Merit lists & Seat Allotment by participating universities'
    ],
    examPattern: [
      { subject: 'Section IA & IB - Languages (choose up to 3)', questions: 40, marks: 200, duration: '45 Mins per language' },
      { subject: 'Section II - Domain Specific Subjects (choose up to 6)', questions: 40, marks: 200, duration: '45-60 Mins per domain' },
      { subject: 'Section III - General Test (Aptitude, Reasoning, GK)', questions: 50, marks: 250, duration: '60 Mins' }
    ],
    syllabus: [
      {
        stage: 'Section IA & IB - Languages',
        topics: [
          'Reading Comprehension based on different types of passages–Factual, Literary and Narrative, [Literary Aptitude and Vocabulary]',
          'Grammar concepts, synonyms, antonyms, sentence completion, idioms and phrases'
        ]
      },
      {
        stage: 'Section II - Domain Specific Subjects (Mapped to Class 12 Syllabus)',
        topics: [
          'Physics: Electrostatics, Current Electricity, Magnetic Effects of Current, Electromagnetic Induction, Optics, Modern Physics',
          'Chemistry: Solid State, Solutions, Electrochemistry, Chemical Kinetics, Coordination Compounds, Haloalkanes, Organic compounds with Functional groups, Biomolecules',
          'Mathematics: Relations & Functions, Algebra, Calculus, Differential Equations, Linear Programming, Probability',
          'History, Geography, Economics, Business Studies, Accountancy, Political Science - Mapped to standard Class 12 NCERT syllabi'
        ]
      },
      {
        stage: 'Section III - General Test',
        topics: [
          'General Knowledge, Current Affairs, General Mental Ability, Numerical Ability',
          'Quantitative Reasoning (Simple application of basic mathematical concepts arithmetic/algebra/geometry/mensuration taught till Grade 8)',
          'Logical and Analytical Reasoning'
        ]
      }
    ],
    importantTopics: [
      'Language: Reading Comprehension passages, Vocabulary, Correct word usage',
      'Domain subjects: NCERT Class 12 exercises, chemical reactions, electrostatics, calculus & vectors',
      'General Test: Mental math shortcuts, current international events, blood relations, distance and time'
    ],
    preparationStrategy: '1. Thoroughly read and solve Class 12 NCERT textbooks for all domain subjects. CUET is entirely based on NCERT topics.\n2. Practice solving questions quickly, as the exam requires answering 40 out of 50 questions in just 45 minutes for most domain subjects.\n3. Read news daily for General Test GK and practice basic quantitative aptitude up to Class 8 level.\n4. Solve multiple NTA official mock tests to get used to the computer-based testing interface.',
    bestBooks: [
      { title: 'NTA CUET UG Section II Domain Test Guides', author: 'Arihant Experts' },
      { title: 'CUET UG General Test Smart Preparation Book', author: 'Oswaal Editorial Board' },
      { title: 'High School English Grammar and Composition', author: 'Wren & Martin' }
    ],
    pyqPapers: [
      { year: 2025, title: 'CUET UG Language & General Test Question Paper', downloadUrl: '#' },
      { year: 2024, title: 'CUET UG Domain Subject Chemistry & Physics Paper', downloadUrl: '#' },
      { year: 2024, title: 'CUET UG Domain Subject Mathematics Paper', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'cuet-mock-gen', title: 'CUET UG General Test Full Length Mock', questionsCount: 50, durationMinutes: 60 },
      { id: 'cuet-mock-math', title: 'CUET UG Domain Mathematics Practice Test', questionsCount: 40, durationMinutes: 45 }
    ],
    dates: {
      applicationStart: '2026-02-27',
      applicationLastDate: '2026-04-05',
      correctionWindow: '2026-04-06 to 2026-04-08',
      admitCardRelease: '2026-05-13',
      examDate: '2026-05-24',
      answerKeyRelease: '2026-06-05',
      resultDate: '2026-06-30'
    },
    cutOffDetails: 'CUET UG does not declare a centralized cut-off. Individual universities publish their own cut-offs/merit lists (e.g. DU CSAS portal) in terms of normalized CUET scores. For top colleges in DU (like SRCC, Hindu, St. Stephen\'s), cut-offs hover around 98.5+ to 99.8 percentile (785+ marks out of 800).',
    counsellingDetails: 'Post NTA results, candidates must register on the admission portals of individual universities they applied to (e.g. Common Seat Allocation System - CSAS for Delhi University, BHU Admission Portal, etc.). Seats are allocated in multiple rounds based on candidates\' CUET score merits and preferences.',
    vacancyDetails: 'Offers admission to over 2.5 Lakh undergraduate seats across 45+ Central Universities and 100+ state/private universities.',
    salary: 'Undergraduate starting placements average ₹5 LPA to ₹18 LPA for top-tier central universities (like Delhi University - SRCC, SSCBS).',
    requiredDocuments: [
      'Class 10 Marksheet & Passing Certificate',
      'Class 12 Marksheet & Certificate (or Admit Card if appearing)',
      'Category Certificate (OBC-NCL/SC/ST/EWS) if applicable',
      'PwBD / Kashmiri Migrant Certificates if claiming reservation',
      'Valid Photo Identity Proof (Aadhar/Voter ID/School ID)'
    ],
    applicationFees: {
      general: 1000,
      reserved: 800,
      details: 'General: ₹1000 for up to 3 subjects, and ₹400 for each additional subject. Reserved (OBC/EWS): ₹800 (for 3 subjects) + ₹375 per extra subject. SC/ST/PwD: ₹750 (for 3 subjects) + ₹350 per extra subject.'
    },
    howToApply: [
      'Visit the official NTA CUET UG portal (exams.nta.ac.in/CUET-UG).',
      'Click on New Registration and complete the form using basic details and email address.',
      'Fill the comprehensive application form, specifying your choice of universities and specific course programs.',
      'Select the Domain subjects and Languages you wish to appear in (up to 6 total).',
      'Upload scanned copy of photograph, signature, and category certificate (if applicable).',
      'Pay the fee online based on the number of subjects selected. Print the final confirmation page.'
    ],
    officialWebsite: 'https://exams.nta.ac.in/CUET-UG',
    officialNotificationPdfUrl: 'https://exams.nta.ac.in/CUET-UG/docs/CUET-UG-2026-Information-Bulletin.pdf',
    officialContactInfo: 'NTA Help Desk, First Floor, NSIC-MDBP Building, Okhla Industrial Area, Phase-III, New Delhi - 110020. Phone: 011-40759000. Email: cuet-ug@nta.ac.in',
    faqs: [
      { question: 'Is general test compulsory in CUET UG?', answer: 'No, it is optional. However, many university courses (like BMS, BBA, or certain BA programs) require the General Test score. Candidates should carefully review the eligibility criteria of their target university programs before deciding.' },
      { question: 'How many domain subjects can I choose?', answer: 'A candidate can choose a maximum of 6 subjects across all sections (Languages, Domain Subjects, and General Test).' }
    ]
  },
  {
    id: 'cuet-pg',
    name: 'Common University Entrance Test - Post Graduate (CUET PG)',
    category: 'CUET',
    shortDescription: 'A national-level computer-based entrance examination conducted by the National Testing Agency (NTA) for admission into PG courses (MA, MSc, MCom, MBA, MCA, LLM, MTech) in various Central, State, and participating private universities across India.',
    eligibility: {
      ageLimit: 'No age limit is set by NTA for appearing in CUET PG. However, candidates must satisfy the age criteria of individual participating universities.',
      educationalQualification: 'Bachelor\'s degree in relevant discipline from a recognized university with minimum 50% aggregate marks (45% for SC/ST candidates) or appearing in the final year of graduation.',
      nationality: 'Citizen of India, or meet general NTA qualifications for foreign nationals.',
      reservationDetails: 'Central Government norms apply: SC: 15%, ST: 7.5%, OBC-NCL: 27%, EWS: 10%, PwD: 5%.'
    },
    selectionProcess: [
      'Stage 1: NTA CUET PG Online CBT Examination',
      'Stage 2: Publication of scorecard containing normalized NTA Marks',
      'Stage 3: Individual university counselling registration and choice-filling (e.g., DU PG portal)',
      'Stage 4: Document Verification and Admission Offer Acceptance'
    ],
    examPattern: [
      { subject: 'Domain Knowledge Questions (Subject Specific)', questions: 75, marks: 300, duration: '105 Minutes' }
    ],
    syllabus: [
      {
        stage: 'Domain Subject Knowledge (75 Questions)',
        topics: [
          'Advanced Postgraduate Aptitude based on chosen stream (e.g. MSc Chemistry: Organic, Inorganic, Physical Chemistry)',
          'MSc Physics: Mathematical Methods, Mechanics, Electromagnetism, Quantum Mechanics, Thermodynamics',
          'MCA: Mathematics, Logical Reasoning, Computer Architecture, Data Structures, Operating Systems',
          'MBA: Quantitative Aptitude, Logical Reasoning, Verbal Ability & Reading Comprehension, Data Interpretation'
        ]
      }
    ],
    importantTopics: [
      'MSc Chemistry: Coordination Chemistry, Spectroscopy, Organic syntheses',
      'MCA: Graph theory, Operating System scheduling, Stack/Queue DS in C++',
      'MBA: Reading Comprehension speed, Logical Arrangements, Percentage and Ratios'
    ],
    preparationStrategy: '1. Deeply study the undergraduate core curriculum of your domain subject. CUET PG questions are conceptual and test deep graduation-level knowledge.\n2. Practice answering 75 core questions in 105 minutes. Speed is essential as negative marking (-1 mark for wrong answers) exists.\n3. Review previous year papers from 2022 to 2025 to understand question patterns.\n4. Attempt online mock tests to practice balancing speed and accuracy under time constraints.',
    bestBooks: [
      { title: 'NTA CUET PG Objective Domain Guides', author: 'R. Gupta\'s Editorial Board' },
      { title: 'CUET PG MCA Entrance Companion', author: 'Arihant Experts' },
      { title: 'Postgraduate Entrance Exam Workbook', author: 'Oswaal Books' }
    ],
    pyqPapers: [
      { year: 2025, title: 'CUET PG MCA Subject Question Paper', downloadUrl: '#' },
      { year: 2024, title: 'CUET PG MBA General Paper with keys', downloadUrl: '#' },
      { year: 2024, title: 'CUET PG MSc Chemistry Subject Paper', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'cuet-pg-mock-mca', title: 'CUET PG MCA Full Length Mock Test', questionsCount: 75, durationMinutes: 105 },
      { id: 'cuet-pg-mock-mba', title: 'CUET PG MBA Core Aptitude Mock', questionsCount: 75, durationMinutes: 105 }
    ],
    dates: {
      applicationStart: '2025-12-25',
      applicationLastDate: '2026-01-31',
      correctionWindow: '2026-02-02 to 2026-02-04',
      admitCardRelease: '2026-03-05',
      examDate: '2026-03-18',
      answerKeyRelease: '2026-03-28',
      resultDate: '2026-04-18'
    },
    cutOffDetails: 'Participating universities publish merit rank lists based on NTA score sheets. For popular programs like MCA/MBA at Jawaharlal Nehru University (JNU) or Delhi University (DU), cut-off normalized scores hover around 240+ out of 300.',
    counsellingDetails: 'No joint counselling is conducted. Candidates apply directly on the admission portals of individual universities (like DU CSAS-PG, JNU portal, BHU portal). Seats are allocated based on CUET PG scores, university preferences, and category reservations.',
    vacancyDetails: 'Over 80,000 postgraduate seats in 80+ Central and participating state/private universities across India.',
    salary: 'Postgraduate starting salaries average ₹6 LPA to ₹22 LPA (highest for MBA, MCA, and M.Tech programs from top-tier central institutes).',
    requiredDocuments: [
      'Class 10 & 12 Certificate',
      'Graduation Degree & Consolidated Semesters Marksheets',
      'Category / Cast Certificate (SC/ST/OBC-NCL/EWS) if claiming quota',
      'Valid ID Proof (Aadhar/PAN/Passport)',
      'PwD and migration certificate (if applicable)'
    ],
    applicationFees: {
      general: 1200,
      reserved: 1000,
      details: 'General Candidates: ₹1200 (for up to 2 papers) + ₹600 per additional paper. OBC/EWS: ₹1000 + ₹500 per additional paper. SC/ST/Third Gender: ₹900 + ₹500 per additional paper.'
    },
    howToApply: [
      'Go to official CUET PG portal (exams.nta.ac.in/CUET-PG).',
      'Click on registration, fill in basic details and verify with OTP.',
      'Fill the application form, choosing universities and your PG course codes (like SCQP09 for MCA, COQP12 for MBA).',
      'Choose exam center preferences (up to 2).',
      'Upload signature, passport photograph, and caste certificate.',
      'Pay the registration fees online based on your papers. Download and save the confirmation PDF.'
    ],
    officialWebsite: 'https://exams.nta.ac.in/CUET-PG',
    officialNotificationPdfUrl: 'https://exams.nta.ac.in/CUET-PG/docs/CUET-PG-2026-Information-Bulletin.pdf',
    officialContactInfo: 'National Testing Agency, Okhla Phase-III, New Delhi. Phone: 011-40759000. Email: cuet-pg@nta.ac.in',
    faqs: [
      { question: 'Is there a negative marking in CUET PG?', answer: 'Yes. For every correct response, +4 marks are awarded, and for every incorrect response, -1 mark is deducted. Unanswered questions receive 0 marks.' },
      { question: 'Can I choose multiple subject tests in CUET PG?', answer: 'Yes, candidates can select a maximum of 4 paper codes. They must ensure that the test slots do not overlap by checking the NTA schedule.' }
    ]
  },
  {
    id: 'clat-ug',
    name: 'Common Law Admission Test - Under Graduate (CLAT UG)',
    category: 'Law',
    shortDescription: 'National-level entrance exam conducted by the Consortium of National Law Universities (NLUs) for admission to 5-year integrated law programs (BA LLB, BBA LLB, etc.) in 24 participating NLUs across India.',
    eligibility: {
      ageLimit: 'No upper age limit is prescribed for appearing in CLAT UG.',
      educationalQualification: 'Passed 10+2 or equivalent exam with a minimum of 45% marks (40% for SC/ST candidates). Candidates appearing in the qualifying examination are also eligible to apply.',
      nationality: 'Citizen of India, NRI, OCI, or PIO cardholder.',
      reservationDetails: 'NLU-specific reservation policies apply (State Quota, SC, ST, OBC, EWS, Women, PwD).'
    },
    selectionProcess: [
      'Stage 1: Offline Pen-and-Paper Entrance Test (CLAT UG OMR)',
      'Stage 2: Publication of Merit Ranks & Category Merit Lists',
      'Stage 3: Centralized Online Admission Counselling (NLU Counselling Portal)',
      'Stage 4: Choice-locking, Seat Allotment, & Admission Fee payment'
    ],
    examPattern: [
      { subject: 'English Language', questions: 24, marks: 24, duration: '2 Hours' },
      { subject: 'Current Affairs including General Knowledge', questions: 28, marks: 28, duration: '2 Hours' },
      { subject: 'Legal Reasoning', questions: 32, marks: 32, duration: '2 Hours' },
      { subject: 'Logical Reasoning', questions: 24, marks: 24, duration: '2 Hours' },
      { subject: 'Quantitative Techniques (Math)', questions: 12, marks: 12, duration: '2 Hours' }
    ],
    syllabus: [
      {
        stage: 'English & Current Affairs',
        topics: [
          'English Language: Reading Comprehension of 450-word passages, Vocabulary, Inference-based questions, Grammar correction.',
          'Current Affairs & GK: Monographic passages on national & international events, Science & Technology, Arts & Culture, Historical developments.'
        ]
      },
      {
        stage: 'Reasoning & Mathematics',
        topics: [
          'Legal Reasoning: Application of legal principles (Torts, Contracts, Criminal, Constitutional Law) to factual scenarios. No pre-existing knowledge of law is tested; principles are provided.',
          'Logical Reasoning: Critiquing arguments, identifying premises, logical connections, patterns, analogies.',
          'Quantitative Techniques: Extracting numerical data from charts, graphs, tables, and applying basic operations (Arithmetic, Percentages, Ratio/Proportion, Mensuration up to Class 10).'
        ]
      }
    ],
    importantTopics: [
      'Legal: Landmark judgments, Law of Torts, Law of Contracts, Criminal Liability, Constitutional amendments',
      'GK: Current geopolitics, Awards & Honours, Indian Constitution, Supreme Court updates',
      'Logical: Syllogisms, Statement-Assumption, Strength of Arguments'
    ],
    preparationStrategy: '1. Focus on reading speed and comprehension, as CLAT UG is heavily passage-based. Read editorials daily.\n2. Master the core legal concepts of Contracts, Torts, and Criminal Law to quickly interpret legal passages.\n3. Solve weekly mock tests and practice previous years\' papers from 2020 onwards to get used to the passage-centric format.\n4. Manage time effectively: aim for 1 minute per question with negative marking of 0.25 for incorrect answers.',
    bestBooks: [
      { title: 'Word Power Made Easy', author: 'Norman Lewis' },
      { title: 'Universal\'s Guide to CLAT & LLB Entrance Examination', author: 'Manish Arora' },
      { title: 'Analytical Reasoning', author: 'M.K. Pandey' }
    ],
    pyqPapers: [
      { year: 2025, title: 'CLAT UG Official Question Paper with Answer Key', downloadUrl: '#' },
      { year: 2024, title: 'CLAT UG Previous Year Solved Paper', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'clat-ug-mock-1', title: 'CLAT UG Comprehensive National Mock 1', questionsCount: 120, durationMinutes: 120 },
      { id: 'clat-ug-mock-2', title: 'CLAT UG Legal Reasoning Sectional Test', questionsCount: 32, durationMinutes: 30 }
    ],
    dates: {
      applicationStart: '2026-07-01',
      applicationLastDate: '2026-11-10',
      correctionWindow: '2026-11-12 to 2026-11-15',
      admitCardRelease: '2026-11-25',
      examDate: '2026-12-06',
      answerKeyRelease: '2026-12-08',
      resultDate: '2026-12-24'
    },
    cutOffDetails: 'Admission to top NLUs (like NLSIU Bangalore, NALSAR Hyderabad, NUJS Kolkata) requires a rank in the top 100 to 500. Cut-offs vary from 80+ marks out of 120 depending on the difficulty of the paper.',
    counsellingDetails: 'Centralized counselling conducted by Consortium of NLUs. Candidates must pay a counselling fee of ₹30,000 (general) or ₹20,000 (reserved) to lock choices. Up to five list allocations are conducted.',
    vacancyDetails: 'Total intake of around 3,200 undergraduate seats across 24 National Law Universities.',
    salary: 'Corporate placements from top-tier NLUs range between ₹12 LPA to ₹22 LPA starting basic packages. Law officers and advisors average ₹8 LPA.',
    requiredDocuments: [
      'Class 10 Board Marksheet and Passing Certificate',
      'Class 12 Passing Certificate / Marksheet',
      'Caste/Category Certificate (if applicable)',
      'Domicile Certificate (for claiming state quota seats)',
      'PwD/NRI Certificate (if applicable)'
    ],
    applicationFees: {
      general: 4000,
      reserved: 3500,
      details: 'General/OBC/NRI/PIO: ₹4000. SC/ST/BPL: ₹3500. Official previous year question paper book costs an additional ₹500.'
    },
    howToApply: [
      'Visit consortiumofnlus.ac.in and click on CLAT 2026 portal.',
      'Register as a new user with mobile number and email.',
      'Log in, select Undergraduate program, and fill in academic and personal details.',
      'Specify preference of NLUs (NLSIU, NALSAR, etc.) in descending order.',
      'Upload passport size photo, signature, and domicile certificate.',
      'Pay application fees online and print confirmation receipt.'
    ],
    officialWebsite: 'https://consortiumofnlus.ac.in',
    officialNotificationPdfUrl: 'https://consortiumofnlus.ac.in/clat-2026/Information-Brochure-UG.pdf',
    officialContactInfo: 'Consortium of NLUs, P.B. No. 7201, Nagarbhavi, Bangalore - 560072. Phone: 080-47162020. Email: clat@consortiumofnlus.ac.in',
    faqs: [
      { question: 'Is there a negative marking in CLAT UG?', answer: 'Yes, 0.25 marks are deducted for every wrong answer. Unattempted questions receive 0 marks.' },
      { question: 'Are state quota seats available in NLUs?', answer: 'Yes, most National Law Universities have dynamic domicile quotas ranging from 25% to 50% for residents of the state where the NLU is established.' }
    ]
  },
  {
    id: 'clat-pg',
    name: 'Common Law Admission Test - Post Graduate (CLAT PG)',
    category: 'Law',
    shortDescription: 'National-level entrance exam conducted by the Consortium of National Law Universities (NLUs) for admission to 1-year LLM programs in participating NLUs and recruitment in top PSUs like ONGC, IOCL, etc.',
    eligibility: {
      ageLimit: 'No upper age limit for appearing in CLAT PG.',
      educationalQualification: 'LL.B. Degree or an equivalent examination with a minimum of 50% marks (45% for SC/ST categories). Candidates appearing in the final semester LL.B. are also eligible.',
      nationality: 'Citizen of India, NRI, OCI, or PIO.',
      reservationDetails: 'Subject to individual NLU seat matrix and government rules.'
    },
    selectionProcess: [
      'Stage 1: Offline Computer-Based/OMR Entrance Test (120 Marks)',
      'Stage 2: NLU Counselling Registration & Allocation list',
      'Stage 3: PSU Recruitment Interview rounds (for candidate PSU applicants)'
    ],
    examPattern: [
      { subject: 'Constitutional Law', questions: 40, marks: 40, duration: '2 Hours' },
      { subject: 'Other Law Subjects (Torts, Contracts, Criminal, IPR, Jurisprudence)', questions: 80, marks: 80, duration: '2 Hours' }
    ],
    syllabus: [
      {
        stage: 'Core Law & Jurisprudence',
        topics: [
          'Constitutional Law: Preamble, Fundamental Rights, Directive Principles, Judiciary, Emergency Provisions, Center-State Relations, Amendments.',
          'Jurisprudence: Analytical, Historical, Sociological, and Natural Law Schools, Legal Concepts (Rights, Duties, Ownership, Possession).',
          'Other Subjects: Law of Contracts, Torts, Criminal Law, International Law, Intellectual Property Rights, Environmental Law, Family Law, Labor Law, Corporate Law.'
        ]
      }
    ],
    importantTopics: [
      'Constitutional: Article 21 interpretation, Basic Structure Doctrine, Judicial Review',
      'Jurisprudence: Austin, Bentham, Kelsen theories, custom & precedent definitions',
      'Recent developments: Landmark Supreme Court Judgments in the preceding 12 months'
    ],
    preparationStrategy: '1. Read the full text of landmark and recent Supreme Court judgments in detail. Questions frequently cite actual legal passages.\n2. Solve previous year papers to master the core principles of Jurisprudence, Contracts, and Constitutional Law.\n3. Dedicate time to read standard commentaries like VN Shukla or MP Jain for Constitutional Law.\n4. Keep updating yourself on newly enacted legislative codes and amendments.',
    bestBooks: [
      { title: 'Constitutional Law of India', author: 'V.N. Shukla' },
      { title: 'Jurisprudence and Legal Theory', author: 'V.D. Mahajan' },
      { title: 'Singhal\'s Solved Papers for LLM Entrances', author: 'Singhal Law Publications' }
    ],
    pyqPapers: [
      { year: 2025, title: 'CLAT PG LLM Entrance Solved Paper', downloadUrl: '#' },
      { year: 2024, title: 'CLAT PG Previous Year Question Paper', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'clat-pg-mock-1', title: 'CLAT PG Full Length LLM Mock Test', questionsCount: 120, durationMinutes: 120 }
    ],
    dates: {
      applicationStart: '2026-07-01',
      applicationLastDate: '2026-11-10',
      correctionWindow: '2026-11-12 to 2026-11-15',
      admitCardRelease: '2026-11-25',
      examDate: '2026-12-06',
      answerKeyRelease: '2026-12-08',
      resultDate: '2026-12-24'
    },
    cutOffDetails: 'Admission to Tier-1 NLUs (NLSIU, NALSAR) requires scoring 75+ marks out of 120 and securing a rank under 150. PSU recruitment cuts close much higher, usually under Rank 50 for General.',
    counsellingDetails: 'Conducted alongside CLAT UG. NLU seats allocated based on Rank-cum-preference list across multiple rounds.',
    vacancyDetails: 'Offers admission to over 1,100 LLM seats across participating NLUs.',
    salary: 'NLU LLM placements average ₹8 LPA. PSU law officer recruits start at standard PSU executive pay scales ranging from ₹14 LPA to ₹20 LPA.',
    requiredDocuments: [
      'LLB Degree Certificate or Provisional LLB Certificate',
      'LLB Marksheets (all semesters)',
      'Class 10 & 12 Board certificates',
      'Caste Certificate / Domicile Certificate if claiming reservation benefits'
    ],
    applicationFees: {
      general: 4000,
      reserved: 3500,
      details: 'General/OBC/NRI/PIO: ₹4000. SC/ST/BPL: ₹3500.'
    },
    howToApply: [
      'Log on to consortiumofnlus.ac.in and go to CLAT 2026 PG registration.',
      'Fill up demographic details and upload photo and signature.',
      'Enter your LL.B graduation percentages, lock NLU order of preferences.',
      'Submit the form and pay the registration fee of ₹4000 online.'
    ],
    officialWebsite: 'https://consortiumofnlus.ac.in',
    officialNotificationPdfUrl: 'https://consortiumofnlus.ac.in/clat-2026/Information-Brochure-PG.pdf',
    officialContactInfo: 'Consortium of NLUs, Bangalore. Phone: 080-47162020. Email: clat@consortiumofnlus.ac.in',
    faqs: [
      { question: 'Is CLAT PG used for government job recruitments?', answer: 'Yes. Major Public Sector Undertakings (PSUs) like ONGC, PowerGrid, IOCL, GAIL, and BHEL recruit Legal Executives directly based on CLAT PG rank merits followed by GD/Interview rounds.' },
      { question: 'Can final year LLB students apply?', answer: 'Yes, provided they produce their final pass marksheet during NLU counselling.' }
    ]
  },
  {
    id: 'ailet',
    name: 'All India Law Entrance Test (AILET)',
    category: 'Law',
    shortDescription: 'National-level offline law entrance exam conducted by National Law University, Delhi (NLU Delhi) for admission into its undergraduate BA LLB (Hons.), Postgraduate LLM, and PhD programs.',
    eligibility: {
      ageLimit: 'No upper age limit is applicable for AILET UG & PG.',
      educationalQualification: 'For BA LLB: Passed 10+2 with at least 45% marks (40% for SC/ST/PwD). For LLM: LLB degree with at least 50% marks (45% for SC/ST/PwD).',
      nationality: 'Indian Nationals, Foreign Nationals, OCIs, or PIOs.',
      reservationDetails: 'Reservation of seats: SC: 15%, ST: 7.5%, PwD: 5%, OBC (Non-Creamy): 22%, EWS: 10%. Supernumerary seats for Kashmiri Migrants and Residents of Jammu and Kashmir.'
    },
    selectionProcess: [
      'Stage 1: Offline Written Entrance Test (150 Marks)',
      'Stage 2: Publication of Category-wise Merit Lists & Waitlists',
      'Stage 3: Offline/Online NLU Delhi Counseling Rounds & Fee Payment'
    ],
    examPattern: [
      { subject: 'English Language', questions: 50, marks: 50, duration: '90 Minutes' },
      { subject: 'Current Affairs & General Knowledge', questions: 30, marks: 30, duration: '90 Minutes' },
      { subject: 'Logical Reasoning', questions: 70, marks: 70, duration: '90 Minutes' }
    ],
    syllabus: [
      {
        stage: 'AILET UG Syllabus (3 Sections)',
        topics: [
          'English Language: Vocabulary, Grammar, Active/Passive Voice, Reading Comprehension passages.',
          'Current Affairs & GK: National issues, awards, economy news, international alliances, sports, history milestones.',
          'Logical Reasoning: Critical reasoning, verbal reasoning, puzzle solving, coding-decoding, blood relations. Legal principles may be included to test logical ability (not legal knowledge).'
        ]
      }
    ],
    importantTopics: [
      'Logical: Syllogisms, assumptions, cause and effect, linear seating arrangements',
      'English: Synonyms/Antonyms, Idioms, contextual meanings in long passages',
      'GK: Supreme Court news, constitutional posts, major central acts passed in Parliament'
    ],
    preparationStrategy: '1. Time is of the essence. You have to solve 150 questions in just 90 minutes. Practice intense speed-testing drills.\n2. Work heavily on logical reasoning. With 70 marks, this section alone determines selection success.\n3. Stay up to date with national affairs by reviewing general knowledge guides and newspapers regularly.\n4. Avoid spending too much time on any single complex puzzle during the exam.',
    bestBooks: [
      { title: 'AILET Prep Master Companion', author: 'GK Publications' },
      { title: 'Non-Verbal and Verbal Reasoning Guide', author: 'R.S. Aggarwal' },
      { title: 'Legal Awareness and Legal Reasoning', author: 'A.P. Bhardwaj' }
    ],
    pyqPapers: [
      { year: 2025, title: 'AILET UG Solved Exam Paper with keys', downloadUrl: '#' },
      { year: 2024, title: 'AILET Previous Year Question Paper', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'ailet-mock-1', title: 'AILET Full Length Sprint Test 1', questionsCount: 150, durationMinutes: 90 },
      { id: 'ailet-mock-2', title: 'AILET Logical Reasoning Speed Drill', questionsCount: 70, durationMinutes: 40 }
    ],
    dates: {
      applicationStart: '2026-08-01',
      applicationLastDate: '2026-11-15',
      correctionWindow: '2026-11-16 to 2026-11-18',
      admitCardRelease: '2026-11-28',
      examDate: '2026-12-13',
      answerKeyRelease: '2026-12-15',
      resultDate: '2026-12-30'
    },
    cutOffDetails: 'For NLU Delhi, AILET cut-offs are notoriously high due to the small seat intake. Safe scores typically hover around 85+ marks out of 150 (Rank under 80 for general).',
    counsellingDetails: 'Conducted independently of general CLAT by NLU Delhi at its Dwarka Campus/online portal. Multiple rounds of allocation are conducted.',
    vacancyDetails: 'Intake of 120 seats in BA LLB (Hons.), 80 seats in LLM, and 18 seats in PhD programs.',
    salary: 'Placements are excellent, with Tier-1 recruiters and corporate firms offering average packages of ₹14 LPA to ₹22 LPA.',
    requiredDocuments: [
      '10th and 12th Board Marksheets & Passing Certificates',
      'AILET 2026 Admit Card and Result Card',
      'Caste/OBC Certificate (if claiming quota benefits)',
      'Character Certificate from last school/college attended'
    ],
    applicationFees: {
      general: 3500,
      reserved: 1500,
      details: 'General/OBC/EWS: ₹3500. SC/ST/PwD: ₹1500. Below Poverty Line (BPL) SC/ST candidates are exempted from paying fees.'
    },
    howToApply: [
      'Visit nationallawuniversitydelhi.in and click on AILET Admissions.',
      'Register, choose the course you want, and fill up the fields.',
      'Select exam center city of choice (any major Indian capital).',
      'Upload photo, signature, and submit the application fees online.'
    ],
    officialWebsite: 'https://nationallawuniversitydelhi.in',
    officialNotificationPdfUrl: 'https://nationallawuniversitydelhi.in/ailet2026/Information-Bulletin.pdf',
    officialContactInfo: 'National Law University Delhi, Sector-14, Dwarka, New Delhi - 110078. Phone: 011-28034255. Email: ailetadmissions@nludelhi.ac.in',
    faqs: [
      { question: 'Is NLU Delhi part of the CLAT Consortium?', answer: 'No. NLU Delhi does not accept CLAT scores. It conducts its own independent exam (AILET) for all its law admissions.' },
      { question: 'Does AILET have negative marking?', answer: 'Yes, a negative marking of 0.25 is applicable for every incorrect answer.' }
    ]
  },
  {
    id: 'lsat-india',
    name: 'Law School Admission Test - India (LSAT India)',
    category: 'Law',
    shortDescription: 'A standard international-format law entrance test conducted by LSAC (Law School Admission Council) for admission into 3-year LLB, 5-year integrated law, and LLM programs in top private law colleges across India.',
    eligibility: {
      ageLimit: 'No upper age limit for appearing in LSAT India.',
      educationalQualification: 'Passed 10+2 with 45% marks for undergraduate programs. Graduation in law (LLB) with 50% for postgraduate LLM programs.',
      nationality: 'Indian citizens or foreign nationals.',
      reservationDetails: 'No centralized reservation. Individual private law schools (like OP Jindal, NMIMS) apply their respective policies.'
    },
    selectionProcess: [
      'Stage 1: Home-Proctored Online Computer-Based Exam (LSAT India)',
      'Stage 2: Calculation of Percentile Score and Scaled Scores',
      'Stage 3: Direct application to LSAC-affiliated colleges using LSAT percentile results'
    ],
    examPattern: [
      { subject: 'Analytical Reasoning', questions: 23, marks: 23, duration: '35 Minutes' },
      { subject: 'Logical Reasoning (Section 1)', questions: 22, marks: 22, duration: '35 Minutes' },
      { subject: 'Logical Reasoning (Section 2)', questions: 22, marks: 22, duration: '35 Minutes' },
      { subject: 'Reading Comprehension', questions: 24, marks: 24, duration: '35 Minutes' }
    ],
    syllabus: [
      {
        stage: 'Cognitive Ability & Logic (No memorization required)',
        topics: [
          'Analytical Reasoning: Deductive logic, complex groupings, ordering arrangements, spatial reasoning.',
          'Logical Reasoning: Analyzing arguments, identifying weaknesses, strong premises, hidden assumptions, evaluating claims.',
          'Reading Comprehension: Reading complex, graduate-level academic passages from Humanities, Social Sciences, Law, and Biology, and inferring arguments and contextual logic.'
        ]
      }
    ],
    importantTopics: [
      'Analytical: Seating arrangements, calendar puzzles, distribution grids',
      'Logical: Strengthening/weakening arguments, parallel reasoning, flaws in logic',
      'RC: Tone of passage, main idea identification, inferential deduction'
    ],
    preparationStrategy: '1. Memorization of laws or GK is entirely useless here. LSAT India tests purely logic, reasoning, and reading comprehension.\n2. Master analytical reasoning by practicing standard LSAT game setups (grid charts, ordering lines).\n3. Learn to read quickly and actively analyze arguments within the short 35-minute section limit.\n4. Avoid stress as there is no negative marking; make sure to attempt every single question.',
    bestBooks: [
      { title: 'The PowerScore LSAT Logical Reasoning Bible', author: 'David M. Killoran' },
      { title: 'LSAC Official LSAT India SuperPrep Book', author: 'LSAC' },
      { title: 'The Next 10 Actual, Official LSAT PrepTests', author: 'LSAC' }
    ],
    pyqPapers: [
      { year: 2025, title: 'LSAT India Official Sample Practice Test', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'lsat-mock-1', title: 'LSAC Official Free Diagnostic Practice Mock', questionsCount: 92, durationMinutes: 140 }
    ],
    dates: {
      applicationStart: '2025-10-15',
      applicationLastDate: '2026-05-10',
      correctionWindow: 'Not applicable',
      admitCardRelease: '2026-05-15',
      examDate: '2026-05-28',
      answerKeyRelease: 'No official keys released',
      resultDate: '2026-06-15'
    },
    cutOffDetails: 'Private schools like JGLS (Jindal Global Law School) require a 90+ percentile for top law streams. Other universities offer seats to candidates with 60+ percentiles.',
    counsellingDetails: 'Affiliated colleges conduct independent counseling and seat allocation based on the LSAT India percentile scores submitted by candidates.',
    vacancyDetails: 'Offers admission to over 10,000 seats across 50+ private law colleges in India.',
    salary: 'Corporate recruitments average ₹6 LPA to ₹18 LPA (highest at Jindal Global Law School and NMIMS).',
    requiredDocuments: [
      '10th and 12th Board certificates',
      'Graduation certificate (for LLM applicants)',
      'Government Photo ID proof for online exam verification'
    ],
    applicationFees: {
      general: 3999,
      reserved: 3999,
      details: 'Unified registration fee of ₹3999 for all categories. Early bird discounts might apply.'
    },
    howToApply: [
      'Register online at lsatindia.in and create a candidate profile.',
      'Fill in the application details and choose your preferred exam slot (dates are spread over 3-4 days).',
      'Complete online system check and practice with free tools.',
      'Pay application fees of ₹3999 online and download exam guidelines booklet.'
    ],
    officialWebsite: 'https://www.lsatindia.in',
    officialNotificationPdfUrl: 'https://www.lsatindia.in/assets/LSAT_India_2026_Official_Brochure.pdf',
    officialContactInfo: 'LSAC India Support Team. Phone: +91-8929777555. Email: lsatindia@lsac.org',
    faqs: [
      { question: 'Is LSAT India conducted online or offline?', answer: 'It is conducted strictly as an online, remote-proctored, home-based examination. Candidates must have a laptop with active webcam and stable internet.' },
      { question: 'Is there a negative marking in LSAT India?', answer: 'No. There is no negative marking for incorrect answers.' }
    ]
  },
  {
    id: 'cuet-law',
    name: 'CUET UG & PG - Law Entrance Exams',
    category: 'Law',
    shortDescription: 'National-level Computer Based Test (CBT) for admission into BA LLB, LLB, and LLM courses in top Central and State universities (like BHU, Allahabad University, Delhi University, etc.) across India.',
    eligibility: {
      ageLimit: 'No age limit specified by NTA. Subject to participating university criteria.',
      educationalQualification: 'Passed 10+2 with 50% aggregate marks (for BA LLB integrated) or completed Graduation with 50% marks (for LLB).',
      nationality: 'Citizen of India.',
      reservationDetails: 'Standard reservation policies of central universities (OBC: 27%, SC: 15%, ST: 7.5%, EWS: 10%, PwD: 5%).'
    },
    selectionProcess: [
      'Stage 1: NTA CUET Online Computer Based Test (CBT)',
      'Stage 2: Calculation of Percentile & Normalized Scores by NTA',
      'Stage 3: Individual University Registration (DU PG, BHU, etc.) & choice locking',
      'Stage 4: Publication of Merit allocation lists by universities'
    ],
    examPattern: [
      { subject: 'Section IA - Languages', questions: 40, marks: 200, duration: '45 Minutes' },
      { subject: 'Section II - Domain Test (Legal Studies)', questions: 40, marks: 200, duration: '45 Minutes' },
      { subject: 'Section III - General Test (GK & Reasoning)', questions: 50, marks: 250, duration: '60 Minutes' }
    ],
    syllabus: [
      {
        stage: 'Section II - Legal Studies Domain',
        topics: [
          'Structure of Judiciary: Supreme Court, High Courts, Subordinate Courts, Tribunals, Appointment & Retirement of Judges.',
          'Topics of Law: Law of Property, Law of Contracts, Law of Torts, Introduction to Criminal Laws.',
          'Arbitration, Tribunal Adjudication, Alternative Dispute Resolution (ADR).',
          'Human Rights in India: Constitutional provisions, Human Rights Commission acts.',
          'Legal Profession in India: History of legal education, Advocates Act.',
          'Legal Services: Legal aid, Lok Adalats, para-legal services.'
        ]
      }
    ],
    importantTopics: [
      'Legal Studies: Landmark cases on fundamental rights, ADR techniques, judicial appointments',
      'Languages: Grammar, analogies, synonyms/antonyms',
      'General Test: Indian polity, arithmetic up to Class 8, verbal reasoning'
    ],
    preparationStrategy: '1. Read Class 12 NCERT Legal Studies textbook cover to cover. The CUET domain paper is entirely based on this textbook.\n2. Work on basic grammar and daily GK for English and General Test papers.\n3. Attempt NTA mock exams to understand the screen interface.\n4. Focus on fast reading to score high in languages and logical reasoning.',
    bestBooks: [
      { title: 'Class XII Legal Studies NCERT Textbook', author: 'NCERT' },
      { title: 'NTA CUET UG Legal Studies Guide', author: 'Arihant Experts' },
      { title: 'General Test Preparation Guide for CUET', author: 'Oswaal Editorial Board' }
    ],
    pyqPapers: [
      { year: 2025, title: 'CUET UG Legal Studies Core Solved Paper', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'cuet-law-mock-1', title: 'CUET Legal Studies Full Domain Mock', questionsCount: 40, durationMinutes: 45 }
    ],
    dates: {
      applicationStart: '2026-02-27',
      applicationLastDate: '2026-04-05',
      correctionWindow: '2026-04-06 to 2026-04-08',
      admitCardRelease: '2026-05-13',
      examDate: '2026-05-24',
      answerKeyRelease: '2026-06-05',
      resultDate: '2026-06-30'
    },
    cutOffDetails: 'For Banaras Hindu University (BHU) BA LLB or Delhi University (DU) PG LLB, competitive scores usually exceed 97+ percentile (roughly 220+ marks in core legal/aptitude domains).',
    counsellingDetails: 'No joint counselling. Students apply on DU CSAS, BHU online portal, or Allahabad University portal using their normalized CUET score cards.',
    vacancyDetails: 'Over 4,500 law seats across major central, state, and private universities in India.',
    salary: 'Graduates starting placements average ₹5 LPA to ₹12 LPA (highest for Delhi University LLB & BHU BA LLB).',
    requiredDocuments: [
      'Class 10 and 12 Board Marksheets & Passing Certificates',
      'CUET Score Card issued by NTA',
      'Category Certificate (if claiming OBC/SC/ST/EWS)',
      'Character Certificate from last school/college attended'
    ],
    applicationFees: {
      general: 1000,
      reserved: 800,
      details: 'General: ₹1000 for up to 3 subjects, and ₹400 for each additional subject. SC/ST/PwD: ₹750 + ₹350 per extra subject.'
    },
    howToApply: [
      'Visit exams.nta.ac.in/CUET-UG or exams.nta.ac.in/CUET-PG.',
      'Complete new registration and fill out the detailed form.',
      'Choose universities (e.g. DU, BHU) and select Law/Legal Studies as core domain subjects.',
      'Upload passport photograph, signature, and submit fees online.'
    ],
    officialWebsite: 'https://exams.nta.ac.in',
    officialNotificationPdfUrl: 'https://exams.nta.ac.in/CUET-UG/docs/CUET-Law-Syllabus.pdf',
    officialContactInfo: 'NTA Helpdesk, New Delhi. Phone: 011-40759000. Email: cuet-ug@nta.ac.in',
    faqs: [
      { question: 'Is Class 12 Legal Studies mandatory to choose in school for CUET Law?', answer: 'No. Any candidate who has passed Class 12 (Science/Commerce/Arts) is eligible to select the Legal Studies domain in CUET and apply for Law.' },
      { question: 'Which major universities accept CUET Law scores?', answer: 'Top institutions include Delhi University (DU), Banaras Hindu University (BHU), Allahabad University, Babasaheb Bhimrao Ambedkar University, and Central University of Kashmir.' }
    ]
  },
  {
    id: 'ojee-law',
    name: 'OJEE Law (Odisha Law Entrance)',
    category: 'Law',
    shortDescription: 'State-level selection counselling process conducted by the OJEE Board/Odisha State Higher Education Department for admission to 3-Year LLB, 5-Year Integrated LLB, and LLM courses in Odisha state law colleges.',
    eligibility: {
      ageLimit: 'No upper age limit for LLB and LLM courses as per Bar Council of India guidelines.',
      educationalQualification: 'For Integrated 5-Year: passed 10+2 with at least 45% (40% for SC/ST). For 3-Year LLB: passed graduation with at least 45% (40% for SC/ST).',
      nationality: 'Citizen of India. Domicile/permanent residency of Odisha is required for government state quota seats.',
      reservationDetails: 'Odisha state reservation guidelines apply (SC: 12%, ST: 8%, Green Card: 5%, Physically Challenged: 5%).'
    },
    selectionProcess: [
      'Stage 1: Entrance test (or selection based on Graduation/12th Marks merit as decided by SAMS/OJEE Board annually)',
      'Stage 2: Registration on SAMS Odisha / OJEE Law Counselling Portal',
      'Stage 3: Centralized choice-filling, document verification, and seat allocation'
    ],
    examPattern: [
      { subject: 'Legal General Knowledge', questions: 30, marks: 120, duration: '90 Minutes' },
      { subject: 'English Language', questions: 30, marks: 120, duration: '90 Minutes' },
      { subject: 'General Aptitude & Reasoning', questions: 40, marks: 160, duration: '90 Minutes' }
    ],
    syllabus: [
      {
        stage: 'OJEE Law Entrance Syllabus',
        topics: [
          'Legal General Knowledge: Basics of Indian Constitution, famous landmark legal disputes, basic legal terms and maxims.',
          'English: Reading comprehension, syntax, vocabulary, active passive voice, analogies.',
          'General Aptitude & Reasoning: Analytical reasoning, puzzles, series completion, logical arguments, basic high school mathematics.'
        ]
      }
    ],
    importantTopics: [
      'Legal: Preamble, Fundamental Rights, Directive Principles, Legal Terms (e.g. Habeas Corpus, Mens Rea)',
      'Aptitude: Coding-Decoding, Blood Relations, Number Series'
    ],
    preparationStrategy: '1. Focus extensively on basic concepts of the Indian Constitution, as it forms the bulk of the legal section.\n2. Practice reading passages and basic high school logic puzzles to secure full marks in English and reasoning.\n3. Go through Odisha local general knowledge and recent legal milestones.\n4. Maintain a structured revision sheet for standard Latin legal maxims.',
    bestBooks: [
      { title: 'SAMS Odisha Law Entrance Guide', author: 'Odisha Book Store Experts' },
      { title: 'Universal\'s Legal Maxims and Terms', author: 'Universal Law Publishing' }
    ],
    pyqPapers: [
      { year: 2025, title: 'Odisha LLB Entrance Previous Year Question Paper', downloadUrl: '#' }
    ],
    mockTests: [
      { id: 'ojee-law-mock', title: 'OJEE Law Complete Length Mock Exam', questionsCount: 100, durationMinutes: 90 }
    ],
    dates: {
      applicationStart: '2026-03-10',
      applicationLastDate: '2026-04-25',
      correctionWindow: '2026-04-26 to 2026-04-28',
      admitCardRelease: '2026-05-18',
      examDate: '2026-06-05',
      answerKeyRelease: '2026-06-12',
      resultDate: '2026-06-25'
    },
    cutOffDetails: 'Top institutions like Madhusudan Law University, Cuttack or University Law College, Vani Vihar, Bhubaneswar close admissions at high merit percentages (under rank 200 state wide).',
    counsellingDetails: 'Conducted online via SAMS (Student Academic Management System) Odisha / OJEE cell. Verification of nativity certificate is mandatory for claiming state-quota seats.',
    vacancyDetails: 'Provides admission to over 2,200 LLB, LLM, and Integrated LLB seats across state-run law colleges in Odisha.',
    salary: 'Graduates enter bar practice or seek corporate advisor roles in Odisha mining/industrial firms, starting at ₹3.5 LPA to ₹8 LPA.',
    requiredDocuments: [
      'Class 10 and 12 certificates & marksheets',
      'Graduation Degree & marksheets (for 3-Year LLB applicants)',
      'Odisha Resident / Nativity Certificate (highly mandatory)',
      'Category/Caste certificate (if applicable)'
    ],
    applicationFees: {
      general: 500,
      reserved: 500,
      details: 'Standard application and registration processing fee is ₹500 for all candidates.'
    },
    howToApply: [
      'Register on the SAMS Odisha Higher Education website (samsodisha.gov.in) or ojee.nic.in.',
      'Fill up the Common Application Form (CAF) with academic and reservation metrics.',
      'Choose your preferred law colleges (such as Madhusudan Law University, Cuttack) in priority order.',
      'Pay online fee of ₹500 and print the registered CAF application.'
    ],
    officialWebsite: 'https://samsodisha.gov.in',
    officialNotificationPdfUrl: 'https://samsodisha.gov.in/Admissions_Brochure_Law.pdf',
    officialContactInfo: 'SAMS Helpdesk/OJEE Cell, Bhubaneswar, Odisha. Phone: 155335 (Toll Free). Email: sams.odisha@gov.in',
    faqs: [
      { question: 'Is Madhusudan Law University affiliated with this counselling?', answer: 'Yes, Madhusudan Law University is the premier state-run law university of Odisha and participates directly in the centralized SAMS Odisha Law admission counselling.' },
      { question: 'Do non-Odisha candidates get reservation benefits?', answer: 'No. Native Odisha reservation and state-quota benefits are strictly reserved for permanent residents of Odisha with valid Nativity Certificates.' }
    ]
  }
];

export const CURRENT_AFFAIRS_DATA: CurrentAffairItem[] = [
  {
    id: 'ca-1',
    title: 'Union Budget 2026-27 Highlights',
    category: 'Economy',
    summary: 'A detailed summary of the latest Union Budget focusing on infrastructure, health, education, and direct tax changes, essential for UPSC and Banking exams.',
    date: '2026-02-01',
    content: 'The Finance Minister presented the Union Budget for the fiscal year 2026-27 in the parliament. Key highlights include an increased capital expenditure outlay of 11.5 lakh crore, the introduction of special tax rebates for digital startups, a massive allocation of 1.2 lakh crore for green hydrogen production, and the announcement of a streamlined single-window clearance portal for semiconductor manufacturing. For personal income tax, a minor adjustment in the standard deduction has been announced under the new tax regime, increasing it from ₹75,000 to ₹90,000. These economic changes are highly crucial for upcoming UPSC GS Paper III and banking awareness sections.'
  },
  {
    id: 'ca-2',
    title: 'India Launches Lunar Ascent Mission LVM3-M5',
    category: 'Science & Tech',
    summary: 'ISRO successfully launches the landmark LVM3-M5 rocket carrying the Chandra-Svea rover designed to sample high-altitude lunar polar dust.',
    date: '2026-05-18',
    content: 'The Indian Space Research Organisation (ISRO) successfully launched the LVM3-M5 rocket from Sriharikota, putting the lunar landing module safely into orbit. The mission, named Lunar Ascent, aims to land a rover on the highly unexplored rim of the polar craters, studying high-altitude moon dust and analyzing the chemical content of surface sub-ice blocks. It represents a massive technological step forward, featuring a fully indigenous smart navigation hazard detection system. This development is extremely relevant for science & tech portions of UPSC, SSC CGL, and state PSC exams.'
  },
  {
    id: 'ca-3',
    title: 'G20 Summit 2026 Declares Universal AI Ethical Pact',
    category: 'International',
    summary: 'G20 countries sign the historical Delhi Pact establishing a universal legal framework for AI governance, safety compliance, and cyber-resilience.',
    date: '2026-04-12',
    content: 'Under the presidency of the G20, member nations gathered to sign the universal "Delhi Pact on Artificial Intelligence Governance". The framework mandates that member countries establish uniform safety-testing protocols for large-scale generative models and outline clear legal accountability rules for deepfake content creation. The pack also establishes a $20 Billion global cybersecurity fund aimed at assisting developing nations in upgrading critical infrastructure against ransomware attacks. This topic will be central to the International Relations (IR) syllabus of all administrative and management exams.'
  }
];

export const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'UPSC CSE 2026 Prelims Admit Card Released',
    examId: 'upsc-cse',
    type: 'admit_card',
    date: '2026-05-10',
    description: 'The Union Public Service Commission has uploaded the e-Admit Cards for Civil Services Preliminary Examination 2026 on its official website. Candidates can download it using their Registration ID or Roll Number.'
  },
  {
    id: 'notif-2',
    title: 'SSC CGL 2026 Application Window Open',
    examId: 'ssc-cgl',
    type: 'update',
    date: '2026-06-11',
    description: 'Staff Selection Commission has released the official notification for CGL Exam 2026. Online registration starts today. The last date to submit the application is July 10, 2026.'
  },
  {
    id: 'notif-ojee-admit',
    title: 'OJEE 2026 Admit Cards Out Now',
    examId: 'ojee',
    type: 'admit_card',
    date: '2026-04-20',
    description: 'The OJEE committee has released the admit cards for the upcoming Odisha Joint Entrance Examination. Candidates can log in to ojee.nic.in to download their hall tickets.'
  },
  {
    id: 'notif-cuet-ug-open',
    title: 'CUET UG 2026 Registration Portal Open',
    examId: 'cuet-ug',
    type: 'update',
    date: '2026-02-27',
    description: 'National Testing Agency (NTA) has started the online registration process for CUET UG 2026. Interested students can apply online through exams.nta.ac.in/CUET-UG.'
  },
  {
    id: 'notif-cuet-pg-answer',
    title: 'CUET PG 2026 Official Answer Key Released',
    examId: 'cuet-pg',
    type: 'result',
    date: '2026-03-28',
    description: 'NTA has published the provisional answer keys and candidate response sheets for CUET PG 2026. Challenges can be submitted online till March 30.'
  },
  {
    id: 'notif-3',
    title: 'JEE Advanced 2026 Official Answer Key Released',
    examId: 'jee-advanced',
    type: 'result',
    date: '2026-06-01',
    description: 'The organizing IIT has uploaded the provisional answer keys and scanned OMR responses of candidates for both JEE Advanced Paper 1 and 2. Feedback and correction requests can be filed until June 3.'
  }
];
