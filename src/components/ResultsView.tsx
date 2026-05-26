import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Activity, BookOpen, Clock, ChevronDown, ChevronUp, Sparkles, Brain } from 'lucide-react';
import { Question } from '../types';
import { WEAK_TOPICS } from '../mockData';

interface ResultsViewProps {
  results: {
    score: number;
    maxScore: number;
    percentage: number;
    accuracy: number;
    correctAnswersCount: number;
    incorrectAnswersCount: number;
    unattemptedCount: number;
    totalQuestions: number;
    userAnswers: { [qId: number]: number };
    questionsPlayed: Question[];
    timeTaken: string;
    date: string;
  } | null;
  onRestartSetup: () => void;
}

export default function ResultsView({ results, onRestartSetup }: ResultsViewProps) {
  const [activeTab, setActiveTab] = useState<'scorecard' | 'questions'>('scorecard');
  const [expandedQId, setExpandedQId] = useState<number | null>(null);

  // If there are no results, render a friendly empty state
  if (!results) {
    return (
      <div className="text-center p-12 bg-gray-900 border border-gray-800 rounded-2xl space-y-4 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-blue-950 flex items-center justify-center text-blue-400 mx-auto border border-blue-900/30">
          <Activity className="w-8 h-8" />
        </div>
        <h2 className="font-display font-bold text-lg text-white">No Mock Evaluations Logged Yet</h2>
        <p className="text-xs text-gray-400 leading-normal px-4">
          Configure an exam parameters cards or chat with the AI Architect to construct dynamic mocks, then attempt it to generate statistics.
        </p>
        <button
          onClick={onRestartSetup}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-white transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          Go to Configuration
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  const {
    score,
    maxScore,
    percentage,
    accuracy,
    correctAnswersCount,
    incorrectAnswersCount,
    unattemptedCount,
    totalQuestions,
    userAnswers,
    questionsPlayed,
    timeTaken
  } = results;

  const toggleExpandSolution = (qId: number) => {
    setExpandedQId((prev) => (prev === qId ? null : qId));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Title & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Mock Graduation Assessment</h1>
          <p className="text-sm text-gray-400 mt-1">Detailed breakdown of simulated marks, correct options, and sub-topics accuracy.</p>
        </div>

        <div className="flex bg-gray-900 p-1 border border-gray-850 rounded-xl">
          <button
            onClick={() => setActiveTab('scorecard')}
            className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
              activeTab === 'scorecard' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Analytics Scorecard
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
              activeTab === 'questions' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Explanations Review ({totalQuestions} Qs)
          </button>
        </div>
      </div>

      {activeTab === 'scorecard' ? (
        <div className="space-y-8">
          {/* Main Scoring visual dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Scorecard Circular Ring display (5 Columns) */}
            <div className="col-span-1 md:col-span-5 bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] pointer-events-none"></div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase font-mono">Exam Grade Outcomes</span>
                <h3 className="text-gray-400 font-semibold text-xs leading-normal">Percentage Performance</h3>
              </div>

              {/* Big Circle display */}
              <div className="h-44 w-44 rounded-full border-[8px] border-gray-950 flex flex-col items-center justify-center relative mt-6 select-none shadow-inner bg-gray-950/20">
                <div 
                  className="absolute inset-0 rounded-full border-[8px] border-blue-500 border-r-transparent border-t-transparent animate-[spin_3s_linear_infinite]"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                />
                <span className="text-3xl font-extrabold text-white font-mono">{percentage}%</span>
                <span className="text-[10px] text-gray-500 font-mono font-medium tracking-wide">SCALED SCORE</span>
              </div>

              <div className="mt-6 space-y-1">
                <div className="text-2xl font-extrabold text-blue-400 font-mono">{score} / {maxScore}</div>
                <div className="text-xs text-gray-400 font-medium font-mono">Trained accuracy rating: {accuracy}%</div>
              </div>

              <button
                onClick={onRestartSetup}
                className="w-full mt-6 py-3 bg-gray-950 hover:bg-gray-900 border border-gray-850 hover:border-gray-800 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" /> Assemble New Paper Setup
              </button>
            </div>

            {/* Metric breakouts & breakout bar stats (7 Columns) */}
            <div className="col-span-1 md:col-span-7 bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col justify-between">
              <div className="space-y-1 pb-4 border-b border-gray-850">
                <h3 className="text-sm font-bold text-white font-display">Simulated Index Breakdown</h3>
                <p className="text-[11px] text-gray-500">Breakout of answers correctness and pacing limits completed.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                <div className="p-4 bg-gray-950 rounded-2xl border border-gray-850">
                  <span className="text-[10px] text-gray-500 block font-bold uppercase">Correct Items</span>
                  <span className="text-base font-extrabold text-green-400 font-mono mt-1 block flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> {correctAnswersCount}
                  </span>
                </div>
                <div className="p-4 bg-gray-950 rounded-2xl border border-gray-850">
                  <span className="text-[10px] text-gray-500 block font-bold uppercase">Wrong Options</span>
                  <span className="text-base font-extrabold text-red-400 font-mono mt-1 block flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-500" /> {incorrectAnswersCount}
                  </span>
                </div>
                <div className="p-4 bg-gray-950 rounded-2xl border border-gray-850">
                  <span className="text-[10px] text-gray-500 block font-bold uppercase">Unattempted</span>
                  <span className="text-base font-extrabold text-gray-400 font-mono mt-1 block flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-gray-500" /> {unattemptedCount}
                  </span>
                </div>
                <div className="p-4 bg-gray-950 rounded-2xl border border-gray-850">
                  <span className="text-[10px] text-gray-500 block font-bold uppercase">Pacing Done</span>
                  <span className="text-base font-extrabold text-blue-400 font-mono mt-1 block flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-500" /> {timeTaken}
                  </span>
                </div>
              </div>

              {/* Graphical bars breakdown */}
              <div className="space-y-3 pt-4 border-t border-gray-850">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Coverage percentage ratio</span>
                <div className="h-4 w-full bg-gray-950 rounded-full overflow-hidden flex font-mono text-[9px] font-bold text-center leading-none text-white">
                  <div 
                    style={{ width: `${(correctAnswersCount / totalQuestions) * 100}%` }} 
                    className="h-full bg-green-500 flex items-center justify-center shadow-inner"
                    title="Correct"
                  >
                    {correctAnswersCount > 0 && `${Math.round((correctAnswersCount / totalQuestions) * 100)}%`}
                  </div>
                  <div 
                    style={{ width: `${(incorrectAnswersCount / totalQuestions) * 100}%` }} 
                    className="h-full bg-red-500 flex items-center justify-center shadow-inner animate-pulse"
                    title="Incorrect"
                  >
                    {incorrectAnswersCount > 0 && `${Math.round((incorrectAnswersCount / totalQuestions) * 100)}%`}
                  </div>
                  <div 
                    style={{ width: `${(unattemptedCount / totalQuestions) * 100}%` }} 
                    className="h-full bg-gray-750 flex items-center justify-center"
                    title="Skipped"
                  >
                    {unattemptedCount > 0 && `${Math.round((unattemptedCount / totalQuestions) * 100)}%`}
                  </div>
                </div>
                <div className="flex gap-4 justify-center text-[10px] text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-green-500"></span> Correct</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-500"></span> Incorrect</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-gray-750"></span> Unattempted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Weak Topics mappings */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold font-display text-white">Weakness Maps & Suggested Practice</h3>
              <p className="text-xs text-gray-400">Identify subtopics requiring concept revision directly from past year archives.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WEAK_TOPICS.map((topic) => (
                <div 
                  key={topic.name} 
                  className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex flex-col justify-between hover:border-gray-750 transition-all shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 bg-gray-950 text-gray-400 text-[9px] font-bold border border-gray-850 rounded">
                        {topic.subject}
                      </span>
                      <span className="text-[10px] text-amber-500 font-semibold font-mono">{topic.percentage}% accuracy</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-200 mt-2 leading-tight">{topic.name}</h4>
                  </div>

                  {/* Horizontal visual indicator bar */}
                  <div className="mt-5 space-y-3">
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-gray-950 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${topic.percentage}%` }}
                          className={`h-full ${
                            topic.percentage < 50 ? 'bg-red-500' : topic.percentage < 65 ? 'bg-amber-500' : 'bg-green-500'
                          }`}
                        />
                      </div>
                      <div className="flex justify-between text-[8px] text-gray-500 font-mono">
                        <span>Current rating</span>
                        <span>{topic.count} test items seen</span>
                      </div>
                    </div>

                    <button
                      onClick={onRestartSetup}
                      className="w-full text-center py-2 bg-blue-950/20 hover:bg-blue-950 text-blue-400 text-[10px] font-bold rounded-lg border border-blue-900/40 cursor-pointer transition-colors"
                    >
                      Trigger Focus Drill Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Expanded answers and solutions reviewed list (Solutions Mode) */
        <div className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-blue-950/20 to-gray-900/60 border border-blue-900/30 rounded-2xl flex items-start gap-3.5 max-w-2xl">
            <Brain className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-blue-300">AI-Annotated PDF Solution Key</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                We transcribed these solutions directly from the step-by-step appendices of your uploaded textbook guidelines. Click any item to read explanations.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {questionsPlayed.map((q, idx) => {
              const uAns = userAnswers[q.id];
              const isCorrect = uAns === q.correctOptionIndex;
              const isUnattempted = uAns === undefined;
              const isExpanded = expandedQId === q.id;

              return (
                <div 
                  key={q.id}
                  className={`bg-gray-900 border rounded-2xl overflow-hidden transition-all ${
                    isCorrect 
                      ? 'border-green-900/30 hover:border-green-800/40' 
                      : isUnattempted 
                      ? 'border-gray-800 hover:border-gray-700' 
                      : 'border-red-900/30 hover:border-red-800/40'
                  }`}
                >
                  {/* Collapsed top bar toggler */}
                  <button
                    onClick={() => toggleExpandSolution(q.id)}
                    className="w-full text-left p-5 flex items-start justify-between gap-6 cursor-pointer hover:bg-gray-950/20 transition-all select-none"
                  >
                    <div className="space-y-2 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-950 border border-gray-850 px-2 py-0.5 rounded">
                          QUESTION {idx + 1}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {q.subTopic}
                        </span>

                        {/* Grading status indicators labels */}
                        {isCorrect ? (
                          <span className="px-2 py-0.5 bg-green-950 text-green-400 text-[10px] font-bold font-mono rounded border border-green-900/30">
                            Correct Answer (+4)
                          </span>
                        ) : isUnattempted ? (
                          <span className="px-2 py-0.5 bg-gray-950 text-gray-400 text-[10px] font-bold font-mono rounded border border-gray-850">
                            Skipped (0)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-red-950 text-red-400 text-[10px] font-bold font-mono rounded border border-red-900/30">
                            Incorrect penalty (-1)
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs sm:text-sm font-semibold text-gray-200 mt-2 truncate" title={q.text}>
                        {q.text}
                      </h4>
                    </div>

                    <div className="shrink-0 text-gray-500 bg-gray-950 p-2 border border-gray-850 rounded-xl hover:text-white mt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Expanding body containing options detail and AI solution explanation */}
                  {isExpanded && (
                    <div className="p-5 bg-gray-950/60 border-t border-gray-850 space-y-6">
                      <div className="space-y-2.5">
                        <div className="text-xs sm:text-sm text-gray-100 font-semibold leading-relaxed">
                          {q.text}
                        </div>

                        {/* Options mapping with visual results indicator */}
                        <div className="grid grid-cols-1 gap-2 pt-2">
                          {q.options.map((option, oIdx) => {
                            const char = ['A', 'B', 'C', 'D'][oIdx];
                            const isCorrectOpt = oIdx === q.correctOptionIndex;
                            const isUserMarked = oIdx === uAns;

                            let optionStyle = 'bg-gray-900/40 border-gray-850 text-gray-400';
                            if (isCorrectOpt) {
                              optionStyle = 'bg-green-950/40 border-green-800 text-green-300';
                            } else if (isUserMarked) {
                              optionStyle = 'bg-red-950/40 border-red-900/50 text-red-300';
                            }

                            return (
                              <div 
                                key={char}
                                className={`p-3.5 rounded-xl border text-xs flex items-center justify-between font-medium ${optionStyle}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-5.5 h-5.5 rounded font-bold text-[10px] flex items-center justify-center shrink-0 ${
                                    isCorrectOpt 
                                      ? 'bg-green-600 text-white' 
                                      : isUserMarked 
                                      ? 'bg-red-600 text-white' 
                                      : 'bg-gray-950 text-gray-500'
                                  }`}>
                                    {char}
                                  </div>
                                  <span>{option}</span>
                                </div>

                                {/* Custom text indicator tags */}
                                {isCorrectOpt && (
                                  <span className="text-[9px] uppercase font-bold text-green-400 font-mono">Correct option</span>
                                )}
                                {isUserMarked && !isCorrectOpt && (
                                  <span className="text-[9px] uppercase font-bold text-red-400 font-mono">Your choice</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Explanation card */}
                      <div className="p-4 bg-gray-900 border border-gray-850 rounded-xl space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400">
                          <Sparkles className="w-4 h-4 text-blue-400" />
                          <span>AI Transcribed Explanation</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans font-medium whitespace-pre-line">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
