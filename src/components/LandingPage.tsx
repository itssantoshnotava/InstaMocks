import { motion } from 'motion/react';
import { BookOpen, Sparkles, Brain, Clock, ShieldCheck, ArrowRight, Zap, GraduationCap, ChevronRight, Check } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onQuickMock: () => void;
}

export default function LandingPage({ onStart, onQuickMock }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-hidden relative">
      {/* Background Gradients & Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] glow-bg-primary"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px] glow-bg-primary" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-indigo-950/10 blur-[100px]"></div>
      </div>

      {/* Header / Nav */}
      <header className="relative z-10 border-b border-gray-900 bg-gray-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-md shadow-blue-900/30">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Insta<span className="text-blue-500 font-extrabold">Mocks</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</a>
            <a href="#exam-modes" className="hover:text-blue-400 transition-colors">Standard Boards</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={onStart}
              id="btn-nav-launch"
              className="px-4.5 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-lg text-sm font-medium transition-all"
            >
              Sign In
            </button>
            <button
              onClick={onStart}
              id="btn-nav-cta"
              className="px-4.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg text-sm font-semibold shadow-lg shadow-blue-500/20 text-white flex items-center gap-1.5 transition-all"
            >
              Launch App
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-blue-950/50 border border-blue-900/40 text-blue-400 text-xs font-semibold mb-6 shadow-sm uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              AI-Powered Exam Simulator
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl md:text-6.5xl tracking-tight leading-[1.1] text-white"
            >
              Convert <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">PYQ PDFs</span> <br />
              Into Interactive Mock Tests
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Stop practicing passively. Upload previous year papers, chapters, or sheets. InstaMocks automatically transcribes questions, structures exams, calculates marking schemes, and tests you in an authentic, full-screen testing interface.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onStart}
                id="btn-hero-upload"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl text-base font-semibold text-white shadow-xl shadow-blue-500/10 flex items-center justify-center gap-2 scale-100 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Upload PYQs Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onQuickMock}
                id="btn-hero-quickplay"
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl text-base font-semibold text-gray-300 flex items-center justify-center gap-2 hover:text-white transition-all cursor-pointer"
              >
                Try 10-Min Demo Mock
                <Zap className="w-5 h-5 text-amber-400" />
              </button>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 pt-8 border-t border-gray-900/80 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 text-left"
            >
              <div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-white">99.4%</div>
                <div className="text-xs text-gray-500 tracking-wide uppercase mt-1">OCR Accuracy</div>
              </div>
              <div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-white">10K+</div>
                <div className="text-xs text-gray-500 tracking-wide uppercase mt-1">Mock Papers</div>
              </div>
              <div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-white">Instant</div>
                <div className="text-xs text-gray-500 tracking-wide uppercase mt-1">AI Explanations</div>
              </div>
            </motion.div>
          </div>

          {/* Right Interface Mockup Column */}
          <div className="col-span-1 lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 shadow-2xl custom-glow"
            >
              {/* Header inside mockup */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="px-3 py-1 bg-gray-950 text-xs font-mono rounded-md border border-gray-800/80 text-blue-400">
                  ai_transcribe.py
                </div>
              </div>

              {/* Mockup Upload Progress Card */}
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 border border-gray-800 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-950/60 rounded-lg">
                        <BookOpen className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-300 font-mono truncate max-w-[180px]">JEE_Physics_2025_Paper2.pdf</div>
                        <div className="text-[10px] text-gray-500">6.2 MB • Processing and transcribing</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-yellow-950 text-yellow-400 text-[10px] font-mono rounded border border-yellow-900/40">
                      OCR: Active
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: '0%' }}
                        animate={{ width: '74%' }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                      />
                    </div>
                    <div className="flex justify-between mt-1.5 text-[10px] text-gray-400">
                      <span>Refining math notation...</span>
                      <span className="font-mono">74%</span>
                    </div>
                  </div>
                </div>

                {/* Sub-cards inside mockup */}
                <div className="bg-gray-950/60 p-4 border border-gray-800/60 rounded-xl space-y-3">
                  <div className="text-xs font-semibold text-gray-400 flex items-center justify-between">
                    <span>Detected Sections</span>
                    <span className="text-green-400 text-[10px] font-mono">18 Questions Found</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 bg-gray-900 border border-gray-800 rounded flex items-center justify-between">
                      <span className="text-gray-400 truncate">MCQs</span>
                      <span className="font-bold text-gray-300 font-mono">10</span>
                    </div>
                    <div className="p-2 bg-gray-900 border border-gray-800 rounded flex items-center justify-between">
                      <span className="text-gray-400 truncate">Integer Type</span>
                      <span className="font-bold text-gray-300 font-mono">5</span>
                    </div>
                    <div className="p-2 bg-gray-900 border border-gray-800 rounded flex items-center justify-between">
                      <span className="text-gray-400 truncate">Multi-Correct</span>
                      <span className="font-bold text-gray-300 font-mono">3</span>
                    </div>
                    <div className="p-2 bg-gray-900 border border-gray-800 rounded flex items-center justify-between">
                      <span className="text-gray-400 truncate">Level</span>
                      <span className="font-bold font-mono text-amber-500">Advanced</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Chat Bubble */}
                <div className="bg-blue-950/30 border border-blue-900/30 p-3.5 rounded-xl flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5 shadow-sm">
                    AI
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] text-blue-200 leading-normal">
                      Configuring test complete! Do you want me to enforce IIT style negative marking (-1) on these MCQs?
                    </p>
                    <div className="flex gap-2">
                      <button className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-[10px] font-semibold text-white rounded">
                        Accept Config
                      </button>
                      <button className="px-2 py-1 bg-gray-900 border border-gray-800 text-[10px] text-gray-400 hover:text-white rounded">
                        Customize
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Float badges */}
            <div className="absolute top-[-20px] right-[-20px] bg-indigo-600/10 border border-indigo-500/40 px-3 py-1.5 rounded-lg text-indigo-300 text-xs font-mono font-bold shadow-lg shadow-indigo-950/50 backdrop-blur-sm hidden sm:block">
              LaTeX Math Support
            </div>
            <div className="absolute bottom-[-10px] left-[-30px] bg-green-500/10 border border-green-500/40 px-3.5 py-2 rounded-xl text-green-400 text-xs font-medium shadow-md backdrop-blur-sm hidden sm:block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Real Exam Simulator
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-900 bg-gray-950/50">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            How InstaMocks Prepares You For Actual Exams
          </h2>
          <p className="mt-4 text-base text-gray-400">
            A comprehensive pipeline that converts regular documents into realistic exam sessions, with details of a seasoned coaching tutor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {/* Card 1 */}
          <div className="bg-gray-900/60 border border-gray-800 p-8 rounded-2xl hover:border-gray-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-950 flex items-center justify-center text-blue-400 mb-6 shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Fast PDF Processing</h3>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                Upload scanned past year papers, chapter guides, or mock PDFs. Our modern pipeline handles OCR, complex structures, and table columns instantly.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs text-blue-400 font-medium">
              Supports scanned images & textbooks
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-900/60 border border-gray-800 p-8 rounded-2xl hover:border-gray-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-950 flex items-center justify-center text-purple-400 mb-6 shrink-0">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Subject Categorization</h3>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                AI categorizes extracted questions into subjects, sub-topics, topics, and assigns difficulty indices automatically, laying foundations for micro-analytics.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs text-purple-400 font-medium">
              Covering Math, Physics, Bio & Chemistry
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-900/60 border border-gray-800 p-8 rounded-2xl hover:border-gray-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-950 flex items-center justify-center text-amber-500 mb-6 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Real-Time Exam Simulator</h3>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                Sit for exams in a highly authentic screen environment. Features a running clock, individual navigation, custom grading, and answers tracking pallet.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs text-amber-500 font-medium">
              Configurable duration & syllabus
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-900/60 border border-gray-800 p-8 rounded-2xl hover:border-gray-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-950 flex items-center justify-center text-indigo-400 mb-6 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Interactive AI Conversational Assist</h3>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                Tweak, build, or ask the LLM companion to "Generate a hard JEE Physics mock with negative marking." It sets everything up for you in seconds.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs text-indigo-400 font-medium">
              Enabling smart conversational controls
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-gray-900/60 border border-gray-800 p-8 rounded-2xl hover:border-gray-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 mb-6 shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Weakness Map Analytics</h3>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                Review your results and immediately spot subtopics that are keeping you back. Discover accuracy ratings, answer speed, and get suggestions on where to focus.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs text-emerald-400 font-medium">
              Circular accuracy charts
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-gray-900/60 border border-gray-800 p-8 rounded-2xl hover:border-gray-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-950 flex items-center justify-center text-orange-400 mb-6 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Google Drive Sync</h3>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                Directly connect your Google Drive to import folders of question banks, textbook exercises, and archives without tedious local downloads.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs text-orange-400 font-medium">
              One-click secure import flow
            </div>
          </div>
        </div>
      </section>

      {/* Boards supported list */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-900/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-6 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-950 border border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-display">Supported Competitions & Boards</h4>
              <p className="text-xs text-gray-400 mt-0.5">IIT JEE Main/Advanced, NEET, SAT, GRE, AP Exams, IB, and Custom Chapter Uploads.</p>
            </div>
          </div>
          <button
            onClick={onStart}
            id="btn-bottom-join"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold text-white flex items-center gap-2 cursor-pointer transition-all shrink-0 shadow-lg shadow-blue-500/10"
          >
            Start Mock Conversion
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-gray-900 text-center text-xs text-gray-500">
        <p>© 2026 InstaMocks Portal. Dev-mode mock simulator with rich educational interactions with Firebase.</p>
      </footer>
    </div>
  );
}
