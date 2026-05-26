import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sliders, Check, HelpCircle, Flame, ShieldAlert, Award, Clock, ArrowRight, BookOpen, Calculator, Volume2 } from 'lucide-react';
import { MockConfig } from '../types';

interface ConfigViewProps {
  initialSubject?: string;
  onStartMock: (config: MockConfig) => void;
}

export default function ConfigView({ initialSubject = 'Physics', onStartMock }: ConfigViewProps) {
  const [subject, setSubject] = useState(initialSubject);
  const [title, setTitle] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Extreme'>('Hard');
  const [timeLimit, setTimeLimit] = useState(30);
  const [markingScheme, setMarkingScheme] = useState<'iit' | 'sat' | 'simple' | 'custom'>('iit');
  
  const [customPositive, setCustomPositive] = useState(4);
  const [customNegative, setCustomNegative] = useState(-1);

  // Sync title with settings
  useEffect(() => {
    setTitle(`${subject} ${difficulty} Mock - ${numQuestions} Qs`);
  }, [subject, difficulty, numQuestions]);

  // Handle subject change from parent hook
  useEffect(() => {
    if (initialSubject) {
      setSubject(initialSubject);
    }
  }, [initialSubject]);

  const getPositiveMarks = () => {
    if (markingScheme === 'iit') return 4;
    if (markingScheme === 'sat') return 3;
    if (markingScheme === 'simple') return 1;
    return customPositive;
  };

  const getNegativeMarks = () => {
    if (markingScheme === 'iit') return -1;
    if (markingScheme === 'sat') return 0;
    if (markingScheme === 'simple') return 0;
    return customNegative;
  };

  const totalMarks = numQuestions * getPositiveMarks();
  const secPerQuest = Math.round((timeLimit * 60) / numQuestions);

  const handleLaunch = () => {
    onStartMock({
      subject,
      title,
      numQuestions,
      difficulty,
      timeLimitMinutes: timeLimit,
      markingScheme: {
        positive: getPositiveMarks(),
        negative: getNegativeMarks()
      }
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Assemble Interactive Mock</h1>
        <p className="text-sm text-gray-400 mt-1">Configure weights, difficulty, duration and marking schemes for the generated questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column Settings Selection (8 Columns) */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl space-y-6">
            
            {/* Subject Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Choose Target Subject Template</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Physics', 'Mathematics', 'Chemistry', 'Biology'].map((subj) => (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => setSubject(subj)}
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                      subject === subj 
                        ? 'bg-blue-600 border-blue-500 font-bold text-white shadow-md' 
                        : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white hover:bg-gray-900/60'
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions count slider & Quick selectors */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Number of Questions</label>
                <span className="text-sm font-extrabold text-blue-400 font-mono">{numQuestions} Questions</span>
              </div>
              <div className="flex gap-2">
                {[5, 10, 15, 20].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setNumQuestions(num)}
                    className={`flex-1 py-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      numQuestions === num
                        ? 'bg-blue-950 border-blue-600 text-blue-300'
                        : 'bg-gray-950 border-gray-850 text-gray-400 hover:text-white'
                    }`}
                  >
                    {num} Qs
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-gray-500">Note: Available active question models in memory will adapt to match the count limit.</p>
            </div>

            {/* Difficulty Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Simulation Difficulty</label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { level: 'Easy', color: 'hover:border-green-600 text-green-400 bg-green-950/20' },
                  { level: 'Medium', color: 'hover:border-yellow-600 text-yellow-500 bg-yellow-950/20' },
                  { level: 'Hard', color: 'hover:border-orange-600 text-orange-400 bg-orange-950/20' },
                  { level: 'Extreme', color: 'hover:border-red-600 text-red-500 bg-red-950/20' },
                ].map((item) => (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setDifficulty(item.level as any)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      difficulty === item.level 
                        ? 'bg-gray-950 border-blue-500 font-extrabold text-white !border-2 shadow-inner' 
                        : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-gray-100 ' + item.color
                    }`}
                  >
                    <div className="text-xs font-bold">{item.level}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time limit (Slider & quick buttons) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time Limit (Minutes)</label>
                <span className="text-xs font-extrabold text-blue-400 font-mono flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-500" /> {timeLimit} Minutes
                </span>
              </div>
              <div className="flex gap-2.5">
                {[10, 15, 30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setTimeLimit(mins)}
                    className={`flex-1 py-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      timeLimit === mins
                        ? 'bg-blue-950 border-blue-600 text-blue-300'
                        : 'bg-gray-950 border-gray-850 text-gray-400 hover:text-white'
                    }`}
                  >
                    {mins} Mins
                  </button>
                ))}
              </div>
            </div>

            {/* Marking Schemes Preset Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Marking Schemes presets</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { preset: 'iit' as const, label: 'IIT (+4 / -1)', desc: 'Negative marking enabled' },
                  { preset: 'sat' as const, label: 'SAT (+3 / 0)', desc: 'No penalty on wrong items' },
                  { preset: 'simple' as const, label: 'Simple (+1 / 0)', desc: 'Standard uniform grading' },
                  { preset: 'custom' as const, label: 'Custom', desc: 'Specify own grades' },
                ].map((item) => (
                  <button
                    key={item.preset}
                    type="button"
                    onClick={() => setMarkingScheme(item.preset)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                      markingScheme === item.preset 
                        ? 'bg-blue-950 border-blue-500 text-blue-200' 
                        : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white hover:bg-gray-900/60'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-gray-200">{item.label}</span>
                    <span className="text-[9px] text-gray-500 leading-normal mt-1">{item.desc}</span>
                  </button>
                ))}
              </div>

              {/* Custom panel expanded */}
              {markingScheme === 'custom' && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-950 border border-gray-850 rounded-xl">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase block">Positive Marks</span>
                    <input 
                      type="number" 
                      className="w-full bg-gray-900 border border-gray-800 p-2 text-xs rounded-lg text-white"
                      value={customPositive}
                      onChange={(e) => setCustomPositive(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase block">Negative Penalty</span>
                    <input 
                      type="number" 
                      className="w-full bg-gray-900 border border-gray-800 p-2 text-xs rounded-lg text-white"
                      value={customNegative}
                      onChange={(e) => setCustomNegative(Number(e.target.value))}
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Column Config Sum Widget (4 Columns) */}
        <div className="col-span-1 lg:col-span-4 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-white font-display">Assembled Mock Summary</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-950 rounded-xl border border-gray-850 space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subject</span>
                  <span className="text-gray-300 font-semibold">{subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Difficulty level</span>
                  <span className={`font-bold ${
                    difficulty === 'Easy' ? 'text-green-400' : difficulty === 'Medium' ? 'text-yellow-500' : difficulty === 'Hard' ? 'text-orange-400' : 'text-red-500'
                  }`}>{difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">No. of Questions</span>
                  <span className="text-gray-200 font-bold">{numQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Grading weights</span>
                  <span className="text-blue-400 font-bold flex gap-1">
                    +{getPositiveMarks()} / {getNegativeMarks()}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-800 flex justify-between">
                  <span className="text-gray-400 font-bold">Total Max Score</span>
                  <span className="text-white font-extrabold text-sm">{totalMarks} Marks</span>
                </div>
              </div>

              {/* Pacemaking suggestions */}
              <div className="flex gap-3 items-start bg-blue-950/20 border border-blue-900/30 p-3.5 rounded-xl text-xs">
                <Calculator className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-blue-300">Target Pace Analytics</div>
                  <p className="text-gray-400 leading-normal text-[11px]">
                    You have exactly <span className="font-bold text-blue-400">{secPerQuest}s</span> average per question. Pace yourself properly to maintain top accuracy.
                  </p>
                </div>
              </div>
            </div>

            {/* Launch button */}
            <button
              onClick={handleLaunch}
              id="btn-launch-mock"
              type="button"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-sm font-bold text-white rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer scale-100 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              Convert to Live Exam Room
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Guidelines info card */}
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Exam Room Regulation</h4>
            <div className="space-y-2 text-[11px] text-gray-500 leading-normal">
              <p>• Avoid reloading, navigating backward or closing tab during active exam timer.</p>
              <p>• Question palette keeps active track of attempted, flagged, and skipped indices.</p>
              <p>• Immediate grade sheets are rendered upon submitting answers.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
