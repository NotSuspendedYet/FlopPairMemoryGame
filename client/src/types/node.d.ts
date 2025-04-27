declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV?: 'development' | 'production' | 'test';
    REACT_APP_API_URL?: string;
  }

  interface Process {
    env: ProcessEnv;
  }
  
  type Timeout = number;
}

declare const process: NodeJS.Process; 