import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from './useAuth.d';

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
}; 