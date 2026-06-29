import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, User, Bot, HelpCircle, FileText, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage, Exam, StudyPlan, Quiz } from '../types';

interface AIChatProps {
  exams: Exam[];
  onSaveStudyPlan: (plan: StudyPlan) => void;
  onSaveQuiz: (quiz: Quiz) => void;
  onNavigateToDashboard: () => void;
}

export default function AIChat({
  exams,
  onSaveStudyPlan,
  onSaveQuiz,
  onNavigateToDashboard,
}: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "👋 Welcome to the **ExamVerse AI Coach**! I am powered by Gemini 3.5. How can I help you today?\n\nHere are some of my expert capabilities:\n- **Personalized Study Plans**: I can craft custom multi-week schedules.\n- **Exam Recommendation**: Recommend matches based on your age, stream, or qualifications.\n- **Interactive Quizzes**: Generate customized multi-choice questions with answers.\n- **Document OCR**: Summarize key eligibility parameters directly from official notification PDFs/images.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [aiMode, setAiMode] = useState<'chat' | 'ocr' | 'study_plan' | 'quiz'>('chat');
  const [fileBase64, setFileBase64] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileMimeType, setFileMimeType] = useState<string>('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() && !fileBase64) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      text: fileBase64 ? `[Document: ${fileName}] ${text}` : text,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (aiMode === 'ocr' && fileBase64) {
        const response = await fetch('/api/gemini/ocr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileBase64, mimeType: fileMimeType }),
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error);

        setMessages((prev) => [
          ...prev,
          {
            id: 'bot-' + Date.now(),
            role: 'model',
            text: `📄 **Notification PDF OCR Results:**\n\n${data.text}`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
        // Reset OCR file
        setFileBase64('');
        setFileName('');
        setFileMimeType('');
        setAiMode('chat');
      } else {
        // Chat, Study Plan or Quiz creation
        const response = await fetch('/api/gemini/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `[Language: ${selectedLanguage}] ${text}`,
            chatHistory: messages,
            type: aiMode,
          }),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        if (aiMode === 'study_plan' && data.weeklySchedule) {
          // It successfully generated a study plan
          const plan: StudyPlan = data;
          onSaveStudyPlan(plan);
          setMessages((prev) => [
            ...prev,
            {
              id: 'bot-' + Date.now(),
              role: 'model',
              text: `✨ **Personalized Study Plan Generated!**\n\nI have successfully crafted a highly focused **${plan.durationWeeks}-Week Study Plan** for **${plan.examName}**.\n\n*Study Plan: ${plan.title}*\n\n👉 **I have saved this plan to your Student Dashboard under the "Study Planner" tab where you can track tasks weekly!**`,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
          setAiMode('chat');
        } else if (aiMode === 'quiz' && data.questions) {
          // Successfully generated a quiz
          const quiz: Quiz = data;
          onSaveQuiz(quiz);
          setMessages((prev) => [
            ...prev,
            {
              id: 'bot-' + Date.now(),
              role: 'model',
              text: `🧠 **Custom Multi-Choice Quiz Generated!**\n\nI have prepared a high-yield quiz on **${quiz.examName || 'your requested subject'}** titled: "${quiz.title}".\n\n👉 **You can access and play this immediately in the "Interactive Quizzes" tab!**`,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
          setAiMode('chat');
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: 'bot-' + Date.now(),
              role: 'model',
              text: data.text || 'I processed your request, but could not produce a valid text reply.',
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        }
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-err-' + Date.now(),
          role: 'model',
          text: `❌ **Failed to communicate with AI:** ${err.message || String(err)}. Please verify your Gemini API Key in Settings > Secrets.`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileMimeType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      setFileBase64(base64String);
      setAiMode('ocr');
    };
    reader.readAsDataURL(file);
  };

  const quickPrompts = [
    { label: 'Compare UPSC and SSC CGL', text: 'Please compare the selection process, exam difficulty, and job profile of UPSC Civil Services versus SSC Combined Graduate Level (CGL).' },
    { label: 'Recommend exams for B.Tech', text: 'I completed my B.Tech graduation and I am 23 years old. Which government or IT certifications do you recommend I apply for?' },
    { label: 'Explain CSAT Math shortcut', text: 'Explain a quick, conceptual trick to solve Time and Work questions commonly asked in CSAT and SSC exams.' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden flex flex-col h-[75vh] md:h-[80vh] shadow-xl">
      {/* Header bar */}
      <div className="p-4 md:p-6 bg-linear-to-r from-blue-600 via-blue-700 to-sky-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/10 text-blue-100">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold">ExamVerse AI Companion</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold tracking-wider uppercase animate-pulse">Live Coach</span>
            </div>
            <p className="text-xs text-slate-400">Ask study strategies, syllabus details, or generate custom schedules</p>
          </div>
        </div>

        {/* Configurations */}
        <div className="flex items-center gap-3 self-stretch sm:self-auto">
          {/* Language selection */}
          <select
            id="ai-language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="text-xs bg-white/10 text-slate-200 border border-white/10 rounded-xl px-3 py-2 outline-hidden focus:ring-2 focus:ring-blue-500/40 font-semibold"
          >
            <option className="text-slate-800" value="English">🇬🇧 English</option>
            <option className="text-slate-800" value="Hindi">🇮🇳 Hindi / हिन्दी</option>
            <option className="text-slate-800" value="Spanish">🇪🇸 Spanish / Español</option>
            <option className="text-slate-800" value="French">🇫🇷 French / Français</option>
            <option className="text-slate-800" value="German">🇩🇪 German / Deutsch</option>
          </select>

          {/* Mode indicators */}
          <select
            id="ai-mode-select"
            value={aiMode}
            onChange={(e) => setAiMode(e.target.value as any)}
            className="text-xs bg-white/10 text-slate-200 border border-white/10 rounded-xl px-3 py-2 outline-hidden focus:ring-2 focus:ring-blue-500/40 font-semibold"
          >
            <option className="text-slate-800" value="chat">💬 Normal Conversation</option>
            <option className="text-slate-800" value="study_plan">📅 Generate Study Plan</option>
            <option className="text-slate-800" value="quiz">🧠 Generate Quiz</option>
            <option className="text-slate-800" value="ocr">📄 Notification OCR Summary</option>
          </select>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950/20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 max-w-2xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-bold text-xs shadow-xs ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-linear-to-tr from-blue-900 to-sky-900 text-blue-300 border border-blue-500/20'
            }`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-blue-400" />}
            </div>

            {/* Message bubble */}
            <div className={`p-4 rounded-2xl text-sm leading-relaxed space-y-2 border ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 shadow-xs'
            }`}>
              {/* Message text with basic markdown formatting */}
              <div className="whitespace-pre-wrap">
                {msg.text.split('\n').map((line, idx) => {
                  // Handle bullet points
                  if (line.trim().startsWith('- ')) {
                    return (
                      <li key={idx} className="ml-4 list-disc pl-1">
                        {line.trim().substring(2)}
                      </li>
                    );
                  }
                  // Handle bold markers **
                  if (line.includes('**')) {
                    const parts = line.split('**');
                    return (
                      <p key={idx}>
                        {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-extrabold">{p}</strong> : p)}
                      </p>
                    );
                  }
                  return <p key={idx}>{line}</p>;
                })}
              </div>
              <span className={`block text-[9px] text-right ${msg.role === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 max-w-2xl">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-blue-300 flex items-center justify-center border border-blue-500/20">
              <Bot className="w-4 h-4 text-blue-400 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2 shadow-xs">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              <span>ExamVerse AI is thinking and formulating response...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Inputs panel */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-3">
        {/* Quick actions row */}
        {messages.length === 1 && !isLoading && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Quick Suggestions:</span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  id={`quick-prompt-${idx}`}
                  onClick={() => handleSendMessage(p.text)}
                  className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-600 transition shadow-2xs font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" /> {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom form */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* File Upload Trigger for OCR */}
          <div className="relative shrink-0 flex items-center">
            <input
              id="ai-file-upload"
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="ai-file-upload"
              className={`w-full sm:w-auto px-4 py-3 rounded-xl border border-dashed text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition ${
                fileBase64
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-400'
              }`}
            >
              <FileText className={`w-4 h-4 ${fileBase64 ? 'text-emerald-500' : 'text-slate-400'}`} />
              <span>{fileBase64 ? `Uploaded: ${fileName.substring(0, 12)}...` : 'Upload Notification (PDF/Img)'}</span>
            </label>
          </div>

          <div className="relative flex-1 flex items-center">
            <input
              id="ai-chat-input"
              type="text"
              placeholder={
                aiMode === 'study_plan'
                  ? 'Type: "Generate study plan for UPSC CSE 8 weeks"'
                  : aiMode === 'quiz'
                  ? 'Type: "Generate quiz for NEET biology human physiology"'
                  : 'Ask about eligibility, best books, preparation hacks...'
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
              className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <button
              id="ai-send-msg-btn"
              onClick={() => handleSendMessage()}
              disabled={isLoading}
              className="absolute right-2 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
