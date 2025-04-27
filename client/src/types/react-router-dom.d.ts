declare module 'react-router-dom' {
  import { ReactNode } from 'react';
  
  export interface LinkProps {
    to: string;
    className?: string;
    children?: ReactNode;
  }
  
  export const Link: React.FC<LinkProps>;
  export function useNavigate(): (path: string) => void;

  // Add missing react-router-dom exports
  export interface RouteProps {
    path?: string;
    element?: JSX.Element | null;
    children?: React.ReactNode;
  }

  export const Route: React.FC<RouteProps>;
  export const Routes: React.FC<{ children?: React.ReactNode }>;
  export const Navigate: React.FC<{ to: string; replace?: boolean }>;
  export const BrowserRouter: React.FC<{ children?: React.ReactNode }>;
} 