export interface PDFFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  pages: number;
  status: 'processed' | 'processing' | 'ocr_pending';
  subject: string;
  questionsDetected: number;
}

export interface MockConfig {
  id?: string;
  subject: string;
  title: string;
  numQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  timeLimitMinutes: number;
  markingScheme: {
    positive: number;
    negative: number;
  };
  sourceFileId?: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctOptionIndex: number; // 0-3
  subTopic: string;
  explanation: string;
  flagged?: boolean;
}

export interface RecentMock {
  id: string;
  title: string;
  subject: string;
  score: string;
  percentage: number;
  accuracy: number;
  date: string;
  timeTaken: string;
  questionsCount: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedConfig?: MockConfig;
}

export type AppView = 'landing' | 'dashboard' | 'upload' | 'config' | 'chat' | 'results' | 'attempt';
