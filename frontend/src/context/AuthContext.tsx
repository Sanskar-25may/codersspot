import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

export interface UserProfile {
  id: string;
  role: string;
  specialization?: string;
  bio?: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  name?: string;
  phone_number?: string;
  role: 'STUDENT' | 'FACULTY' | 'ADMIN';
  is_blocked: boolean;
  image?: string;
  profile?: UserProfile;
  onboarded: boolean;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (payload: any) => Promise<void>;
  verifyOTP: (payload: any) => Promise<void>;
  onboard: (payload: any) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch current user details
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await api.get('/user/profile/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (err) {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      fetchUserProfile(token);
    } else {
      setIsLoading(false);
    }

    // Global listener for automatic logouts on refresh token expirations
    const handleLogout = () => {
      logout();
    };
    window.addEventListener('auth_logout_redirect', handleLogout);
    return () => window.removeEventListener('auth_logout_redirect', handleLogout);
  }, []);

  const login = async (credentials: any) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login/', credentials);
      const { access, refresh } = response.data;
      
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      setAccessToken(access);
      
      await fetchUserProfile(access);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Authentication login failed.");
      setIsLoading(false);
      throw err;
    }
  };

  const register = async (payload: any) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await api.post('/auth/register/', payload);
      const { user: registeredUser, tokens } = response.data;
      
      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
      setAccessToken(tokens.access);
      setUser(registeredUser);
      setIsLoading(false);
    } catch (err: any) {
      const messages = err.response?.data 
        ? Object.values(err.response.data).flat().join(" ") 
        : "Registration failed.";
      setError(messages);
      setIsLoading(false);
      throw err;
    }
  };

  const verifyOTP = async (payload: any) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await api.post('/auth/verify-otp/', payload);
      const { user: verifiedUser, tokens } = response.data;
      
      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
      setAccessToken(tokens.access);
      setUser(verifiedUser);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.error || "OTP code verification failed.");
      setIsLoading(false);
      throw err;
    }
  };

  const onboard = async (payload: any) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await api.post('/user/onboarding/', payload);
      setUser(response.data.user);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.error || "Profile onboarding failed.");
      setIsLoading(false);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setUser(null);
    setError(null);
    setIsLoading(false);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      isLoading,
      login,
      register,
      verifyOTP,
      onboard,
      logout,
      clearError,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
