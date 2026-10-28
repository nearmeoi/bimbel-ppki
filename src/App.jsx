import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExamProvider } from './context/ExamContext';
import { ToastProvider } from './components/ui/Toast';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ExamProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </ExamProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
