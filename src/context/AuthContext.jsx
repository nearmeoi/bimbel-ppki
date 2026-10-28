import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  name: 'User',
  email: 'user@gmail.com',
  role: 'student',
  targetInstansi: 'Kemenkumham RI',
  targetScore: 450,
  joinedDate: '2026-01-15',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bimbel_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('bimbel_auth') === 'true';
    } catch {
      return true; // default true for showcase/demo
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bimbel_user', JSON.stringify(user));
      localStorage.setItem('bimbel_auth', String(isAuthenticated));
    } catch (e) {
      console.warn('Failed to save auth state to localStorage', e);
    }
  }, [user, isAuthenticated]);

  const login = (email, password) => {
    const newUser = {
      ...user,
      email: email || 'user@gmail.com',
      name: email ? email.split('@')[0] : 'User',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const register = (userData) => {
    const newUser = {
      ...DEFAULT_USER,
      ...userData,
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (fields) => {
    setUser((prev) => ({ ...prev, ...fields }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
