export type ScreenType =
  | 'home'
  | 'notifications'
  | 'learn'
  | 'quiz'
  | 'stt'
  | 'recommendation'
  | 'progress'
  | 'teacher-voice'
  | 'offline-sync'
  | 'battery'
  | 'health'
  | 'settings';

export interface NotificationItem {
  id: string;
  title: string;
  sender: string;
  category: 'materi' | 'kuis' | 'pr' | 'voice';
  time: string;
  read: boolean;
  actionScreen: ScreenType;
}

export interface QuizQuestion {
  id: number;
  question: string;
  context?: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  hint: string;
  explanation: string;
}

export interface LearningLesson {
  id: number;
  title: string;
  subtitle: string;
  step: number;
  totalSteps: number;
  content: string;
  visualType: 'fraction-bar' | 'fraction-pizza' | 'counting';
  visualData: { numerator: number; denominator: number };
  audioScript: string;
}
