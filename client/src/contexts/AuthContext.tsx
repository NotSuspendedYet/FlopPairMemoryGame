import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { ReactComponent, Component } from '../simplifyTypes';

// Define user type
interface User {
  _id: string;
  name: string;
  email: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Create the context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null
});

// Create the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: ReactComponent = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Make sure we're using the correct API URL - for deployment it should include /api prefix
  const API_URL = 'https://floppairmemorygame.onrender.com/api';

  // Load user data if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const config = {
            headers: {
              'x-auth-token': token
            }
          };

          const res = await axios.get(`${API_URL}/auth/user`, config);
          setUser(res.data.data);
        } catch (err) {
          localStorage.removeItem('token');
          setToken(null);
          setError('Authentication failed, please login again');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token, API_URL]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { 
        email, 
        password 
      }, {
        timeout: 10000 // 10 second timeout
      });
      
      const { token } = res.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setError(null);
    } catch (err: any) {
      console.error('Login error:', err); // Detailed error logging
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Server might be down or overloaded.');
      } else if (!err.response) {
        setError('Network error. Unable to connect to server.');
      } else {
        setError(err.response?.data?.message || 'Login failed');
      }
      throw err;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password
      }, { 
        timeout: 10000 // 10 second timeout
      });
      
      const { token } = res.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setError(null);
    } catch (err: any) {
      console.error('Registration error:', err); // Detailed error logging
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Server might be down or overloaded.');
      } else if (!err.response) {
        setError('Network error. Unable to connect to server.');
      } else {
        setError(err.response?.data?.message || 'Registration failed');
      }
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 