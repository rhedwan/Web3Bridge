export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit?: number; // in seconds
}

export interface GameState {
  currentQuestionIndex: number;
  score: number;
  answers: number[];
  timeLeft: number;
  isGameOver: boolean;
  isGameStarted: boolean;
  startTime: number;
  endTime?: number;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number; // in seconds
  date: string;
}

export interface QuizSettings {
  timePerQuestion: number;
  category?: string;
  difficulty?: "easy" | "medium" | "hard";
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
  correctAnswers: number[];
  userAnswers: number[];
  questions: QuizQuestion[];
}
