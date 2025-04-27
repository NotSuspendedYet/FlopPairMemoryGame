declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
}

interface GameResult {
  _id: string;
  user: string | User;
  moves: number;
  time: number;
  boardSize: '4x4' | '6x6';
  completedAt: string;
}

interface GameCard {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
} 