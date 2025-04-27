import { ReactNode } from 'react';
import { AuthContextType } from '../hooks/useAuth.d';

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext: React.Context<AuthContextType>;
export const AuthProvider: React.FC<AuthProviderProps>; 