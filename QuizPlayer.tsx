import React, { useState, useEffect } from 'react';
import { 
  Award, CheckCircle, XCircle, HelpCircle, ArrowRight, RefreshCw, 
  Trophy, Sparkles, Clock, ShieldAlert, HeartHandshake, UserCheck, Star
} from 'lucide-react';
import { Quiz, QuizQuestion, Exam } from '../types';

interface QuizPlayerProps {
  exams: Exam[];
  preloadedQuizzes: Quiz[];
  customQuizzes: Quiz[];
  onQuizComplete: (quiz: Quiz) => void;
  onNavigateToAI: () => void;
}

// Simulated global leaderboard
const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Aditya Srivastava', score: '9/10', speed: '4m 12s', category: 'UPSC CSE' },
  { rank: 2, name: 'Ananya Reddy', score: '9/10', speed: '4m 35s', category: 'UPSC CSE' },
  { rank: 3, name: 'Ruhani Roy', score: '8/10', speed: '3m 50s', category: 'UPSC CSE' },
  { rank: 4, name: 'Megha Sen', score: '8/10', speed: '4m 15s', category: 'SSC CGL' },
  { rank: 5, name: 'Siddharth Roy', score: '7/10', speed: '3m 22s', category: 'GATE' },
];

export default function QuizPlayer({
  exams,
  preloadedQuizzes,
  customQuizzes,
  onQuizComplete,
  onNavigateToAI,
}: QuizPlayerProps) {
  const allQuizzes = [...preloadedQuizzes, ...customQuizzes];

  const [selectedQuizId, setSelectedQuizId] = useState<string>('');
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question
  
  // Rankings state
  const [showRankings, setShowRankings] = useState(false);
  const [userRank, setUserRank] = useState<number | null>(null);

  // Timer Effect
  useEffect(() => {
    if (!activeQuiz || isQuizOver || hasAnswered) return;

    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, activeQuiz, isQuizOver, hasAnswered]);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setHasAnswered(false);
    setScore(0);
    setIsQuizOver(false);
    setTimeLeft(60);
    setUserRank(null);
  };

  const handleOptionSelect = (optionIdx: number) => {
    if (hasAnswered) return;
    setSelectedOptionIdx(optionIdx);
    setHasAnswered(true);

    const isCorrect = optionIdx === activeQuiz?.questions[currentQuestionIdx].correctAnswerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;

    if (currentQuestionIdx + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setHasAnswered(false);
      setTimeLeft(60);
    } else {
      setIsQuizOver(true);
      
      // Calculate dynamic simulated rank
      // If perfect score -> rank 3. If above 50% -> rank 6. Else -> rank 12
      const totalQuestions = activeQuiz.questions.length;
      const percentage = (score / totalQuestions) * 100;
      let finalRank = 15;
      if (percentage === 100) finalRank = 3;
      else if (percentage >= 70) finalRank = 6;
      else if (percentage >= 40) finalRank = 10;
      setUserRank(finalRank);

      // Callback to save progress
      const completedQuiz: Quiz = {
        ...activeQuiz,
        score,
        dateCompleted: new Date().toISOString().split('T')[0],
      };
      onQuizComplete(completedQuiz);
    }
  };

  const handleResetPlayer = () => {
    setActiveQuiz(null);
    setSelectedQuizId('');
  };

  const currentQuestion = activeQuiz?.questions[currentQuestionIdx];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xs text-left">
      
      {/* 1. SELECTION SCREEN */}
      {!activeQuiz ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Mock Test Portal & Rank Board</h2>
                <p className="text-xs text-slate-400 font-medium font-sans">Compare your real exam readiness against national ranks and solve active test syllabi.</p>
              </div>
            </div>

            {/* Toggle Rankings list */}
            <button
              onClick={() => setShowRankings(!showRankings)}
              className="px-4 py-2 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-700 dark:text-blue-400 font-bold text-xs rounded-xl transition"
            >
              {showRankings ? 'View Quiz Catalog' : 'View Leaderboard Rankings'}
            </button>
          </div>

          {showRankings ? (
            <div className="space-y-4 animate-fade-in bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-150 dark:border-slate-850">
              <h3 className="font-extrabold text-xs text-slate-450 uppercase tracking-widest flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" /> National Civil & STEM Test Standings
              </h3>
              <div className="space-y-2">
                {MOCK_LEADERBOARD.map((usr) => (
                  <div key={usr.rank} className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-850">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center ${
                        usr.rank === 1 ? 'bg-amber-100 text-amber-700' :
                        usr.rank === 2 ? 'bg-slate-150 text-slate-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>{usr.rank}</span>
                      <div>
                        <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200">{usr.name}</h4>
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-black">{usr.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 block">{usr.score} Accuracy</span>
                      <span className="text-[9px] font-bold text-slate-400">{usr.speed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Preloaded Quiz options */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Select A Target Mock Exam:</span>
                {allQuizzes.length > 0 ? (
                  <div className="space-y-2">
                    {allQuizzes.map((quiz, i) => (
                      <button
                        key={`${quiz.id || 'quiz'}-${i}`}
                        id={`quiz-select-btn-${quiz.id}`}
                        onClick={() => handleStartQuiz(quiz)}
                        className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-850 hover:border-blue-400 hover:bg-white transition flex items-center justify-between"
                      >
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-800 dark:text-white leading-snug">{quiz.title}</h4>
                          <span className="text-[10px] text-slate-450 uppercase font-black tracking-wider mt-0.5 block">{quiz.examName}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No quizzes loaded. Select an exam or use the AI generator.</p>
                )}
              </div>

              {/* AI Generator Box */}
              <div className="bg-linear-to-br from-blue-600 via-blue-750 to-sky-700 text-white rounded-2xl p-6 space-y-4 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-2 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-blue-100 text-[9px] font-black uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Cognitive Generator
                  </div>
                  <h3 className="font-extrabold text-lg leading-tight">Generate Live Exam Mock Tests</h3>
                  <p className="text-xs text-blue-150 leading-relaxed font-sans">
                    Construct customized syllabus mock tests dynamically. Ask our AI Coach to write one for you!
                  </p>
                </div>
                <button
                  onClick={onNavigateToAI}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 text-blue-600 font-extrabold text-xs text-center transition shadow-md block relative z-10"
                >
                  Configure AI Mock Generator
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        
        /* 2. ACTIVE QUIZ PLAYING */
        <div className="space-y-6">
          
          {/* Header Progress & Timer */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{activeQuiz.examName}</span>
              <h3 className="text-base font-extrabold text-slate-800 dark:text-white">{activeQuiz.title}</h3>
            </div>
            {!isQuizOver && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs text-slate-400 font-bold">Timer:</span>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${timeLeft < 15 ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-blue-50 text-blue-600'}`}>
                  {timeLeft}s
                </span>
              </div>
            )}
          </div>

          {!isQuizOver ? (
            /* Active Question Panel */
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx + 1) / activeQuiz.questions.length) * 100}%` }}
                />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}</span>
                <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                  {currentQuestion?.question}
                </p>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion?.options.map((option, idx) => {
                  const isSelected = selectedOptionIdx === idx;
                  const isCorrectAnswer = idx === currentQuestion.correctAnswerIndex;

                  let optionClass = 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 hover:border-slate-300';
                  if (hasAnswered) {
                    if (isCorrectAnswer) {
                      optionClass = 'bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-400 text-emerald-800 dark:text-emerald-300 font-bold';
                    } else if (isSelected) {
                      optionClass = 'bg-rose-50 dark:bg-rose-950/20 border border-rose-400 text-rose-800 dark:text-rose-300 font-bold';
                    } else {
                      optionClass = 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`quiz-option-btn-${idx}`}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-center justify-between ${optionClass}`}
                    >
                      <span>{option}</span>
                      {hasAnswered && isCorrectAnswer && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 ml-2" />}
                      {hasAnswered && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {/* Correct answer explanation box */}
              {hasAnswered && currentQuestion?.explanation && (
                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/10 border border-blue-150 dark:border-blue-950 text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                  <strong className="block mb-1">Explanation:</strong>
                  {currentQuestion.explanation}
                </div>
              )}

              {/* Bottom buttons */}
              {hasAnswered && (
                <button
                  id="quiz-next-btn"
                  onClick={handleNextQuestion}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <span>{currentQuestionIdx + 1 === activeQuiz.questions.length ? 'Finish Quiz & Calculate Rank' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            
            /* 3. SUMMARY SCREEN & MERIT CERTIFICATE */
            <div className="text-center py-8 space-y-6 max-w-lg mx-auto">
              
              {/* MERIT CERTIFICATE BOX */}
              <div className="border-4 border-double border-amber-500/70 bg-amber-50/35 dark:bg-slate-950 p-6 md:p-8 rounded-2xl text-center space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500 text-white flex items-center justify-center rotate-45 translate-x-6 -translate-y-6 shadow-sm">
                  <Star className="w-4 h-4 shrink-0 -rotate-45" />
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-[10px] text-amber-600 uppercase tracking-widest font-mono">Commission of Merit & Placement</h4>
                  <h3 className="text-xl font-black text-slate-850 dark:text-white">ExamVerse Mock Certification</h3>
                  <p className="text-[10px] text-slate-400">Awarded to an active candidate for achieving performance metrics.</p>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl max-w-sm mx-auto space-y-3 border border-slate-100 dark:border-slate-850">
                  <div className="flex justify-between text-xs"><span className="text-slate-400 font-bold">Evaluation:</span> <span className="font-black text-slate-850 dark:text-white">{activeQuiz.title}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-400 font-bold">Accuracy Score:</span> <span className="font-black text-emerald-600 dark:text-emerald-400">{score} / {activeQuiz.questions.length}</span></div>
                  
                  {userRank && (
                    <div className="flex justify-between text-xs pt-1.5 border-t border-slate-100 dark:border-slate-800 font-bold">
                      <span className="text-slate-400 flex items-center gap-1"><Trophy className="w-3.5 h-3.5 text-amber-500" /> Standing:</span>
                      <span className="text-blue-600 dark:text-blue-450 uppercase tracking-wider">Rank #{userRank} Nationwide</span>
                    </div>
                  )}
                </div>

                <p className="text-[9px] text-slate-400 leading-relaxed font-sans italic">"This certificate records high-yield revision completion under standard competitive conditions."</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleStartQuiz(activeQuiz)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-600 dark:text-slate-350 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-attempt Test
                </button>
                <button
                  onClick={handleResetPlayer}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition text-center block"
                >
                  Exit Mock Portal
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
