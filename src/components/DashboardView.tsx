import { motion } from 'motion/react';
import { AreaChart, FileText, CheckCircle2, TrendingUp, Sparkles, BookOpen, Clock, Play, GraduationCap, ChevronRight, Zap } from 'lucide-react';
import { PDFFile, RecentMock } from '../types';

interface DashboardViewProps {
  pdfs: PDFFile[];
  recentMocks: RecentMock[];
  onNavigate: (view: any) => void;
  onSelectRecentMock: (id: string) => void;
  onStartConfigWithSubject: (subject: string) => void;
}

export default function DashboardView({ 
  pdfs, 
  recentMocks, 
  onNavigate, 
  onSelectRecentMock,
  onStartConfigWithSubject
}: DashboardViewProps) {
  
  const stats = [
    { title: 'Total PYQs Uploaded', value: pdfs.length, icon: FileText, change: '+2 built this week', color: 'text-blue-400 bg-blue-950/40 border-blue-900/30' },
    { title: 'Simulated Mock Tests', value: recentMocks.length, icon: CheckCircle2, change: '150+ minutes practiced', color: 'text-purple-400 bg-purple-950/40 border-purple-900/30' },
    { title: 'Average Accuracy', value: '81.6%', icon: TrendingUp, change: 'Top 5% of portal users', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-900/30' },
    { title: 'Topics Covered', value: '14 Sub-topics', icon: GraduationCap, change: 'Mechanics, Calculus, Organic...', color: 'text-amber-400 bg-amber-950/40 border-amber-900/30' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative p-7 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-gray-900 border border-blue-900/30 overflow-hidden shadow-2xl">
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-48 h-48 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none"></div>
        
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-900/40 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> High-Yield Prep Mode Active
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Welcome back, Sai Santosh!
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            Your uploaded PYQ papers have been transcribed. You have a recommended custom Physics mock test on <strong className="text-blue-400">Rotational Dynamics</strong> waiting to be simulated. 
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onStartConfigWithSubject('Physics')}
              className="px-4.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              Simulate Physics Mock Test
            </button>
            <button 
              onClick={() => onNavigate('upload')}
              className="px-4.5 py-2.5 bg-gray-950 hover:bg-gray-900 border border-gray-800 text-gray-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              Upload New PYQ Draft
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-5 bg-gray-900 border border-gray-800 rounded-2xl flex flex-col justify-between hover:border-gray-700/80 transition-all shadow-md group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{stat.title}</span>
                <div className={`p-2.5 rounded-xl border ${stat.color} group-hover:scale-105 transition-all`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <div className="font-display font-extrabold text-2xl tracking-tight text-white">{stat.value}</div>
                <div className="text-[10px] font-medium text-gray-500">{stat.change}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Layout Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Mocks list */}
        <div className="col-span-1 lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold font-display text-white">Recent Mock Evaluations</h2>
              <p className="text-xs text-gray-400">Performance logs of previously simulated tests.</p>
            </div>
            <button 
              onClick={() => onNavigate('results')}
              className="text-xs text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              View Analytics <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {recentMocks.map((mock) => (
              <div 
                key={mock.id}
                className="bg-gray-900 border border-gray-800 p-5 rounded-2xl hover:border-gray-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-sm">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-950 text-gray-400 text-[10px] font-semibold border border-gray-800/60 rounded">
                      {mock.subject}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium font-mono">{mock.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-tight">{mock.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-gray-500" /> {mock.questionsCount} Qs</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gray-500" /> Duration {mock.timeTaken}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-800">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Graded Score</div>
                    <div className="text-base font-extrabold text-blue-400 font-mono mt-0.5">{mock.score}</div>
                    <div className="text-[10px] text-gray-500 font-mono">Accuracy: {mock.accuracy}%</div>
                  </div>
                  <button
                    onClick={() => onSelectRecentMock(mock.id)}
                    className="px-4 py-2 bg-gray-950 hover:bg-gray-800 text-xs font-semibold rounded-lg border border-gray-800 hover:border-gray-700 text-gray-200 cursor-pointer transition-colors"
                  >
                    Review Cards
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Study Streaks / Target widget */}
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white font-display">Target Mock Activity Streaks</h4>
                <p className="text-[11.5px] text-gray-500">Practice consistency over the last 7 days.</p>
              </div>
              <span className="text-xs text-amber-500 font-semibold font-mono flex items-center gap-1">
                <Zap className="w-4.5 h-4.5 text-amber-400" /> 4 Days Streak!
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2.5 pt-2">
              {[
                { label: 'Wed', progress: '100%', state: 'active', hours: '45m' },
                { label: 'Thu', progress: '40%', state: 'completed', hours: '20m' },
                { label: 'Fri', progress: '0%', state: 'missed', hours: '0m' },
                { label: 'Sat', progress: '100%', state: 'completed', hours: '50m' },
                { label: 'Sun', progress: '100%', state: 'completed', hours: '1h 10m' },
                { label: 'Mon', progress: '80%', state: 'active', hours: '35m' },
                { label: 'Tue (Today)', progress: '120%', state: 'current', hours: '30m' },
              ].map((day, dIdx) => (
                <div key={day.label} className="text-center space-y-2">
                  <div className="h-14 bg-gray-950 border border-gray-800/80 rounded-lg flex flex-col justify-end p-1 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div 
                      style={{ height: day.progress }} 
                      className={`w-full rounded-sm transition-all duration-500 ${
                        day.state === 'current' 
                          ? 'bg-gradient-to-t from-blue-600 to-indigo-500' 
                          : day.state === 'completed' || day.state === 'active' 
                          ? 'bg-blue-900/40 border-t-2 border-blue-500' 
                          : 'bg-transparent'
                      }`}
                    ></div>
                  </div>
                  <div className="text-[10px] text-gray-500 font-semibold truncate leading-none">{day.label}</div>
                  <div className="text-[8px] font-mono text-gray-400 truncate mt-0.5">{day.hours}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Uploaded PDFs Summary & Subject suggestions */}
        <div className="col-span-1 lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-display text-white">Uploaded PYQ Source Files</h2>
            <button 
              onClick={() => onNavigate('upload')}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium cursor-pointer hover:underline"
            >
              Upload PDF <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden p-5 space-y-4">
            <div className="space-y-3">
              {pdfs.slice(0, 3).map((pdf) => (
                <div 
                  key={pdf.id}
                  className="flex items-center justify-between p-3.5 bg-gray-950 rounded-xl border border-gray-800/80 hover:border-gray-800 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 bg-gray-900 border border-gray-800 rounded-lg text-blue-400 font-mono text-[10px] shrink-0 font-bold">
                      PDF
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-gray-300 truncate max-w-[150px] sm:max-w-[200px]" title={pdf.name}>
                        {pdf.name}
                      </div>
                      <div className="text-[10px] text-gray-500 font-medium">
                        {pdf.pages} Pages • {pdf.size}
                      </div>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded border font-mono ${
                    pdf.status === 'processed' 
                      ? 'bg-green-950/40 text-green-400 border-green-900/30' 
                      : pdf.status === 'processing' 
                      ? 'bg-yellow-950/40 text-yellow-500 border-yellow-900/30 animate-pulse' 
                      : 'bg-gray-800/50 text-gray-400 border-gray-700/50'
                  }`}>
                    {pdf.status === 'processed' ? 'Processed' : pdf.status === 'processing' ? 'Hashing' : 'OCR Pending'}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-800/60 text-center">
              <span className="text-[11px] text-gray-500 font-semibold">
                Showing {Math.min(3, pdfs.length)} of {pdfs.length} files.
              </span>
            </div>
          </div>

          {/* Quick Subject Launcher */}
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Subject Mock Target</h4>
            <div className="space-y-2.5">
              {[
                { name: 'Physics', desc: 'Mechanics, Electrodynamics & Waves', score: 'Avg 80%', color: 'from-blue-600 to-indigo-600', count: 18 },
                { name: 'Mathematics', desc: 'Calculus, Vectors & Matrices', score: 'Avg 72%', color: 'from-purple-600 to-indigo-600', count: 12 },
                { name: 'Chemistry', desc: 'Organic Mechanisms & Physical Equilibrium', score: 'Avg 80%', color: 'from-pink-600 to-rose-600', count: 15 },
                { name: 'Biology', desc: 'Cell Biology, Ecology & Genetics', score: 'No tests taken', color: 'from-emerald-600 to-teal-600', count: 30 },
              ].map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => onStartConfigWithSubject(sub.name)}
                  className="w-full text-left p-3.5 bg-gray-950/50 hover:bg-gray-950 border border-gray-800/80 hover:border-gray-700 rounded-xl flex items-center justify-between transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-10 rounded-full bg-gradient-to-b ${sub.color}`} />
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{sub.name}</div>
                      <div className="text-[10px] text-gray-400 leading-normal mt-0.5">{sub.desc}</div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-[10px] font-bold text-gray-300 font-mono">{sub.score}</span>
                    <span className="text-[9px] text-gray-500 font-mono">{sub.count} Qs Transcribed</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
