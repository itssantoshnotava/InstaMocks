import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView, PDFFile, RecentMock, MockConfig, Question } from './types';
import { INITIAL_PDFS, RECENT_MOCKS, SAMPLE_QUESTIONS_PHYSICS, OTHER_QUESTIONS } from './mockData';
import { useAuth } from './context/AuthContext';
import { AlertCircle, X, Brain } from 'lucide-react';

// Component imports
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import UploadView from './components/UploadView';
import ConfigView from './components/ConfigView';
import ChatView from './components/ChatView';
import MockAttemptUI from './components/MockAttemptUI';
import ResultsView from './components/ResultsView';

export default function App() {
  const { user, profile, loading, error, loginWithGoogle, clearError } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [pdfs, setPdfs] = useState<PDFFile[]>(INITIAL_PDFS);
  const [recentMocks, setRecentMocks] = useState<RecentMock[]>(RECENT_MOCKS);
  const [isDriveConnected, setIsDriveConnected] = useState(false);

  // Active state handlers
  const [activeConfig, setActiveConfig] = useState<MockConfig | null>(null);
  const [activeSubjectForConfig, setActiveSubjectForConfig] = useState<string>('Physics');
  const [activeResults, setActiveResults] = useState<{
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
  } | null>(null);

  // Guard routing: if user logs out or session is lost, force landing/login redirect.
  // If user is logged in and they are on landing, automatically navigate them to the dashboard.
  useEffect(() => {
    if (!loading) {
      if (!user) {
        setCurrentView('landing');
      } else if (currentView === 'landing') {
        setCurrentView('dashboard');
      }
    }
  }, [user, loading]);

  // Navigation handlers
  const handleViewChange = (view: AppView) => {
    if (!user && view !== 'landing') {
      setCurrentView('landing');
      return;
    }
    setCurrentView(view);
  };

  const handleStartApp = () => {
    if (!user) {
      loginWithGoogle();
    } else {
      setCurrentView('dashboard');
    }
  };

  // Demo Mock start function (directly boots 10 questions hard physics mock)
  const handleQuickMockDemo = () => {
    if (!user) {
      loginWithGoogle();
      return;
    }
    const demoConfig: MockConfig = {
      subject: 'Physics',
      title: 'Quick Mechanics Demo Mock',
      numQuestions: 10,
      difficulty: 'Hard',
      timeLimitMinutes: 10,
      markingScheme: { positive: 4, negative: -1 }
    };
    setActiveConfig(demoConfig);
    setCurrentView('attempt');
  };

  // Start exam from configuration panel
  const handleStartMockExecution = (config: MockConfig) => {
    if (!user) {
      setCurrentView('landing');
      return;
    }
    setActiveConfig(config);
    setCurrentView('attempt');
  };

  // Finish exam from simulator
  const handleFinishExamSimulation = (results: any) => {
    setActiveResults(results);

    // Save mock into dashboard recent list
    const newMockLog: RecentMock = {
      id: `mock-${Date.now()}`,
      title: activeConfig?.title || 'Simulated Test',
      subject: activeConfig?.subject || 'Physics',
      score: `${results.score}/${results.maxScore}`,
      percentage: results.percentage,
      accuracy: results.accuracy,
      date: 'Today',
      timeTaken: results.timeTaken,
      questionsCount: results.totalQuestions
    };

    setRecentMocks((prev) => [newMockLog, ...prev]);
    setCurrentView('results');
  };

  // Skip / Quit exam room
  const handleQuitExamRoom = () => {
    setCurrentView('config');
  };

  // Select a mock log from list to review detailed answer explanations
  const handleSelectRecentMockForReview = (id: string) => {
    const log = recentMocks.find((m) => m.id === id);
    if (!log) return;

    // Load matching questions based on subject
    let baseList = log.subject === 'Physics' ? SAMPLE_QUESTIONS_PHYSICS : OTHER_QUESTIONS[log.subject];
    if (!baseList || baseList.length === 0) {
      baseList = SAMPLE_QUESTIONS_PHYSICS;
    }

    // Tally questions
    const Qs: Question[] = [];
    const simulatedAnswers: { [key: number]: number } = {};
    const count = log.questionsCount;

    for (let i = 0; i < count; i++) {
      const original = baseList[i % baseList.length];
      const qId = i + 1;
      Qs.push({ ...original, id: qId });
      
      // Simulate that user answered some correctly and some incorrectly
      const isCorrectIndex = i % 4 !== 0; // 75% correct
      simulatedAnswers[qId] = isCorrectIndex ? original.correctOptionIndex : (original.correctOptionIndex + 1) % 4;
    }

    // Build fake results metadata
    const parsedTotal = count * 4;
    const correctCount = Math.floor(count * 0.8);
    const incorrectCount = count - correctCount;
    const parsedScore = (correctCount * 4) + (incorrectCount * -1);

    setActiveResults({
      score: parsedScore,
      maxScore: parsedTotal,
      percentage: log.percentage,
      accuracy: log.accuracy,
      correctAnswersCount: correctCount,
      incorrectAnswersCount: incorrectCount,
      unattemptedCount: 0,
      totalQuestions: count,
      userAnswers: simulatedAnswers,
      questionsPlayed: Qs,
      timeTaken: log.timeTaken,
      date: log.date
    });

    setCurrentView('results');
  };

  // Choose from dashboard and navigate to config automatically sets the initial subject selected
  const handleStartConfigWithSubject = (subject: string) => {
    setActiveSubjectForConfig(subject);
    setCurrentView('config');
  };

  // PDF state handlers
  const handleAddPdf = (newPdf: PDFFile) => {
    setPdfs((prev) => [newPdf, ...prev]);
  };

  const handleDeletePdf = (id: string) => {
    setPdfs((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAcceptSuggestedConfigFromChat = (config: MockConfig) => {
    setActiveSubjectForConfig(config.subject);
    handleStartMockExecution(config);
  };

  // Premium, unified session loading tracker
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center relative p-6">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        
        <div className="relative flex flex-col items-center gap-5 text-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-2xl bg-blue-500 opacity-20"></span>
              <Brain className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-white font-display">InstaMocks</h1>
            <p className="text-xs text-gray-400 font-mono tracking-wide">Syncing authentication channel...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 selection:bg-blue-600/30 selection:text-blue-200 relative">
      
      {/* Dynamic Authentication Error Warning Alert */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 max-w-md w-full"
          >
            <div className="p-4 bg-red-950/90 border border-red-900/40 rounded-xl shadow-xl backdrop-blur-md flex gap-3 items-start justify-between">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Authentication Fault</h4>
                  <p className="text-xs text-red-300/90 mt-1 leading-normal">{error}</p>
                </div>
              </div>
              <button
                onClick={clearError}
                className="p-1 hover:bg-white/5 rounded-lg text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        1. STANDALONE VIEWS:
        - Landing block
        - Active simulator exam room (No sidebar for full focus mode)
      */}
      {currentView === 'landing' && (
        <LandingPage 
          onStart={handleStartApp} 
          onQuickMock={handleQuickMockDemo} 
        />
      )}

      {currentView === 'attempt' && activeConfig && (
        <MockAttemptUI
          config={activeConfig}
          onFinishExam={handleFinishExamSimulation}
          onQuitExam={handleQuitExamRoom}
        />
      )}

      {/* 
        2. APPLICATION FRAMEWORK VIEWS:
        Dashboard with Sidebar navigation
      */}
      {currentView !== 'landing' && currentView !== 'attempt' && (
        <div className="flex min-h-screen">
          
          {/* Main Navigation Sidebar */}
          <Sidebar
            currentView={currentView}
            onViewChange={handleViewChange}
            onBackToLanding={() => setCurrentView('landing')}
          />

          {/* Main Content scroll window with sidebar safe offsets (pl-64) */}
          <main className="flex-1 pl-64 min-h-screen flex flex-col">
            <div className="p-8 max-w-7xl mx-auto w-full flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {currentView === 'dashboard' && (
                    <DashboardView
                      pdfs={pdfs}
                      recentMocks={recentMocks}
                      onNavigate={handleViewChange}
                      onSelectRecentMock={handleSelectRecentMockForReview}
                      onStartConfigWithSubject={handleStartConfigWithSubject}
                    />
                  )}

                  {currentView === 'upload' && (
                    <UploadView
                      pdfs={pdfs}
                      onAddPdf={handleAddPdf}
                      onDeletePdf={handleDeletePdf}
                    />
                  )}

                  {currentView === 'config' && (
                    <ConfigView
                      initialSubject={activeSubjectForConfig}
                      onStartMock={handleStartMockExecution}
                    />
                  )}

                  {currentView === 'chat' && (
                    <ChatView
                      onAcceptSuggestedConfig={handleAcceptSuggestedConfigFromChat}
                    />
                  )}

                  {currentView === 'results' && (
                    <ResultsView
                      results={activeResults}
                      onRestartSetup={() => setCurrentView('config')}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>

        </div>
      )}
    </div>
  );
}
