import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, AlertTriangle, ChevronLeft, ChevronRight, Bookmark, ArrowLeft, RefreshCw, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { MockConfig, Question } from '../types';
import { SAMPLE_QUESTIONS_PHYSICS, OTHER_QUESTIONS } from '../mockData';

interface MockAttemptUIProps {
  config: MockConfig;
  onFinishExam: (results: {
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
  }) => void;
  onQuitExam: () => void;
}

export default function MockAttemptUI({ config, onFinishExam, onQuitExam }: MockAttemptUIProps) {
  // Load questions based on subject
  const getSubjectQuestions = (): Question[] => {
    let baseList = config.subject === 'Physics' ? SAMPLE_QUESTIONS_PHYSICS : OTHER_QUESTIONS[config.subject];
    if (!baseList || baseList.length === 0) {
      baseList = SAMPLE_QUESTIONS_PHYSICS; // Fallback
    }

    // Adapt to requested count
    const limit = config.numQuestions;
    const final: Question[] = [];
    for (let i = 0; i < limit; i++) {
      const original = baseList[i % baseList.length];
      final.push({
        ...original,
        id: i + 1, // Re-id strictly
      });
    }
    return final;
  };

  const [questions] = useState<Question[]>(getSubjectQuestions());
  const [activeIdx, setActiveIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [flaggedIds, setFlaggedIds] = useState<{ [qId: number]: boolean }>({});
  
  // States of palette tracking
  const [visitedIds, setVisitedIds] = useState<{ [qId: number]: boolean }>({ [questions[0].id]: true });

  // Timer: count down (seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(config.timeLimitMinutes * 60);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExamForcefully();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectOption = (qId: number, optionIdx: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleToggleFlag = (qId: number) => {
    setFlaggedIds((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleNavigateQuestion = (idx: number) => {
    if (idx >= 0 && idx < questions.length) {
      setActiveIdx(idx);
      setVisitedIds((prev) => ({
        ...prev,
        [questions[idx].id]: true
      }));
    }
  };

  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs > 0 ? hrs + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Force simulation end when time expires
  const handleSubmitExamForcefully = () => {
    processAndSubmitExam();
  };

  const processAndSubmitExam = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans === undefined) {
        unattempted++;
      } else if (ans === q.correctOptionIndex) {
        correct++;
      } else {
        incorrect++;
      }
    });

    // Score Calculations
    const pos = config.markingScheme.positive;
    const neg = config.markingScheme.negative;
    const finalScore = (correct * pos) + (incorrect * neg);
    const maximumGrading = questions.length * pos;

    const percentage = Math.max(0, Math.round((finalScore / maximumGrading) * 100));
    const totalAttempted = correct + incorrect;
    const accuracy = totalAttempted > 0 ? Math.round((correct / totalAttempted) * 100) : 0;

    const timeSpentSecs = (config.timeLimitMinutes * 60) - secondsRemaining;
    const minTaken = Math.floor(timeSpentSecs / 60);
    const secTaken = timeSpentSecs % 60;
    const timeSpentStr = `${minTaken}m ${secTaken}s`;

    onFinishExam({
      score: finalScore,
      maxScore: maximumGrading,
      percentage,
      accuracy,
      correctAnswersCount: correct,
      incorrectAnswersCount: incorrect,
      unattemptedCount: unattempted,
      totalQuestions: questions.length,
      userAnswers,
      questionsPlayed: questions,
      timeTaken: timeSpentStr,
      date: 'Today'
    });
  };

  const activeQuestion = questions[activeIdx];
  const isSelected = (optIdx: number) => userAnswers[activeQuestion.id] === optIdx;
  const isFlagged = flaggedIds[activeQuestion.id];

  return (
    <div className="fixed inset-0 bg-gray-950 text-gray-100 z-50 flex flex-col font-sans">
      
      {/* Top Banner Control Rail */}
      <header className="px-6 py-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowExitModal(true)}
            id="btn-exam-quit"
            className="p-2 bg-gray-950 border border-gray-850 rounded-xl hover:text-red-400 hover:border-red-900/40 transition-all cursor-pointer"
            title="Quit Mock Exam"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#0F9D58] font-mono flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-green-500" /> Authorized Exam Room Active
            </div>
            <h1 className="font-display font-bold text-sm text-white mt-0.5">{config.title}</h1>
          </div>
        </div>

        {/* Big Countdown Timer */}
        <div className={`px-5 py-2.5 rounded-xl border font-mono text-sm font-bold flex items-center gap-2.5 shadow-inner transition-all ${
          secondsRemaining < 120 
            ? 'bg-red-950/40 border-red-900/40 text-red-400 animate-pulse' 
            : 'bg-gray-950 border-gray-850 text-white'
        }`}>
          <Clock className="w-4.5 h-4.5 text-blue-500 shrink-0" />
          <span>TIME REMAINING: {formatTime(secondsRemaining)}</span>
        </div>

        {/* Submit action */}
        <button
          onClick={() => setShowSubmitModal(true)}
          id="btn-exam-submit"
          className="px-5 py-2.5 bg-[#0F9D58] hover:bg-[#0b8043] rounded-xl text-xs font-bold text-white cursor-pointer shadow-lg shadow-emerald-500/10 transition-all flex items-center gap-1.5"
        >
          Submit Mock Paper
          <Send className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Body Grid */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Section: Active Question Card area (scrollable) */}
        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8 flex flex-col justify-between">
          
          <div className="space-y-6">
            {/* Question title index header */}
            <div className="flex justify-between items-center bg-gray-900/60 p-3 px-5 rounded-xl border border-gray-850">
              <span className="text-xs font-extrabold text-blue-400 font-mono">QUESTION {activeIdx + 1} OF {questions.length}</span>
              <span className="text-[10px] text-gray-500 font-semibold uppercase">{activeQuestion.subTopic}</span>
            </div>

            {/* Question Text styled in simple elegance */}
            <div className="space-y-4">
              <div className="text-base sm:text-lg text-gray-100 font-medium leading-relaxed font-sans select-none">
                {activeQuestion.text}
              </div>
            </div>

            {/* MCQ Option lists */}
            <div className="grid grid-cols-1 gap-3 pt-4">
              {activeQuestion.options.map((option, i) => {
                const isAns = isSelected(i);
                const charCode = ['A', 'B', 'C', 'D'][i];
                return (
                  <button
                    key={charCode}
                    onClick={() => handleSelectOption(activeQuestion.id, i)}
                    id={`option-${charCode}`}
                    className={`w-full text-left p-4.5 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${
                      isAns 
                        ? 'bg-blue-950/60 border-blue-500 text-blue-100 ring-1 ring-blue-500/30' 
                        : 'bg-gray-900 border-gray-850 text-gray-400 hover:text-white hover:bg-gray-900/70'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isAns 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-950 text-gray-500 border border-gray-800'
                    }`}>
                      {charCode}
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Navigation links footer */}
          <div className="pt-8 border-t border-gray-900/80 flex items-center justify-between">
            <button
              onClick={() => handleToggleFlag(activeQuestion.id)}
              className={`px-4.5 py-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isFlagged 
                  ? 'bg-amber-950 text-amber-500 border border-amber-900/40' 
                  : 'bg-gray-900 hover:bg-gray-850 text-gray-400 border border-gray-850'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isFlagged ? 'fill-amber-500' : ''}`} />
              {isFlagged ? 'Flagged for Review' : 'Flag Question'}
            </button>

            <div className="flex gap-2 text-xs font-semibold">
              <button
                disabled={activeIdx === 0}
                onClick={() => handleNavigateQuestion(activeIdx - 1)}
                className="px-4.5 py-3 bg-gray-900 hover:bg-gray-850 border border-gray-850 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl cursor-pointer text-gray-300 flex items-center gap-1 transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                disabled={activeIdx === questions.length - 1}
                onClick={() => handleNavigateQuestion(activeIdx + 1)}
                className="px-4.5 py-3 bg-gray-900 hover:bg-gray-850 border border-gray-850 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl cursor-pointer text-gray-300 flex items-center gap-1 transition-all"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Section: Palette sidebar menu (320px list) */}
        <aside className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col justify-between overflow-y-auto shrink-0">
          
          <div className="p-6 space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white font-display">Questions Index Palette</h3>
              <p className="text-[10.5px] text-gray-500">Monitor your coverage progression live.</p>
            </div>

            {/* Quick Stats of answers */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono leading-none">
              <div className="p-2.5 bg-gray-950 border border-gray-850 rounded-lg">
                <span className="text-green-500 font-bold block mb-1">
                  {Object.keys(userAnswers).length}
                </span>
                <span className="text-gray-500 uppercase">Answered</span>
              </div>
              <div className="p-2.5 bg-gray-950 border border-gray-850 rounded-lg">
                <span className="text-amber-500 font-bold block mb-1">
                  {Object.values(flaggedIds).filter(Boolean).length}
                </span>
                <span className="text-gray-500 uppercase">Flagged</span>
              </div>
              <div className="p-2.5 bg-gray-950 border border-gray-850 rounded-lg">
                <span className="text-blue-500 font-bold block mb-1">
                  {questions.length - Object.keys(userAnswers).length}
                </span>
                <span className="text-gray-500 uppercase">Remaining</span>
              </div>
            </div>

            {/* Nav Grid of palette buttons */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 pt-2">
              {questions.map((q, idx) => {
                const isActive = activeIdx === idx;
                const answered = userAnswers[q.id] !== undefined;
                const flagged = flaggedIds[q.id] === true;
                const visited = visitedIds[q.id] === true;

                let btnStyle = 'bg-gray-950 border-gray-850 text-gray-500';
                if (isActive) btnStyle = 'bg-blue-600 text-white font-extrabold !border-blue-500';
                else if (flagged) btnStyle = 'bg-amber-950/60 border-amber-900/40 text-amber-500';
                else if (answered) btnStyle = 'bg-green-950/60 border-green-900/40 text-green-400';
                else if (visited) btnStyle = 'bg-gray-800 border-gray-700 text-gray-300';

                return (
                  <button
                    key={q.id}
                    onClick={() => handleNavigateQuestion(idx)}
                    className={`h-11 rounded-xl border text-xs font-semibold font-mono transition-all cursor-pointer hover:border-blue-500/50 ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt Guidelines at bottom of palette */}
          <div className="p-6 border-t border-gray-800 space-y-4">
            <div className="p-3.5 bg-gray-950 border border-gray-850 rounded-xl space-y-2 text-[10.5px] text-gray-500">
              <div className="flex items-center gap-1.5 text-gray-400 font-bold">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>Need some help?</span>
              </div>
              <p className="leading-normal">
                Double tap questions or draft option indexes. Feel free to use external rough worksheets safely.
              </p>
            </div>
            
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full text-center py-3 border border-dashed border-gray-800 hover:border-blue-500 hover:text-blue-400 rounded-xl text-xs text-gray-400 font-semibold cursor-pointer transition-colors"
            >
              Verify & Complete Exam Mode
            </button>
          </div>
        </aside>
      </div>

      {/* QUIT EXAM DIALOG MODAL */}
      <AnimatePresence>
        {showExitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowExitModal(false)}></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-6 max-w-sm w-full relative z-10 space-y-6 text-center"
            >
              <div className="w-12 h-12 bg-red-950/50 border border-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto text-pulse">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-base text-white">Discard Ongoing Attempt?</h3>
                <p className="text-xs text-gray-400 leading-normal px-4">
                  Exiting will lose your current answers tracking slate. This attempt won't be saved in your Statistics dashboard.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="flex-1 py-2.5 bg-gray-950 border border-gray-800 hover:border-gray-750 text-xs font-bold text-gray-400 hover:text-white rounded-xl transition-all"
                >
                  Resume Exam
                </button>
                <button
                  onClick={() => {
                    setShowExitModal(false);
                    onQuitExam();
                  }}
                  className="flex-1 py-2.5 bg-red-650 hover:bg-red-500 text-xs font-bold text-white rounded-xl transition-all cursor-pointer"
                >
                  Discard Paper
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUBMIT EXAM CONFIRM DIALOG MODAL */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowSubmitModal(false)}></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-6 max-w-sm w-full relative z-10 space-y-6 text-center"
            >
              <div className="w-12 h-12 bg-green-950/40 border border-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-base text-white">Finished Mock Exam?</h3>
                <p className="text-xs text-gray-400 leading-normal">
                  Answered <strong className="text-green-400 font-mono">{Object.keys(userAnswers).length}</strong> of <strong className="font-mono">{questions.length}</strong> items.
                </p>
                <p className="text-[11px] text-gray-500 leading-normal px-2">
                  Once submitted, the parser will instantly grade results, and list analytical scores against weak-topics mappings.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2.5 bg-gray-950 border border-gray-800 hover:border-gray-750 text-xs font-bold text-gray-400 hover:text-white rounded-xl transition-all"
                >
                  Keep Writing
                </button>
                <button
                  onClick={() => {
                    setShowSubmitModal(false);
                    processAndSubmitExam();
                  }}
                  className="flex-1 py-2.5 bg-[#0F9D58] hover:bg-[#0b8043] text-xs font-bold text-white rounded-xl transition-all cursor-pointer"
                >
                  Confirm & Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
