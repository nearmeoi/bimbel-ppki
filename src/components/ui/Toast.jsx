import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = {
      id,
      type: toast.type || 'info',
      title: toast.title,
      message: toast.message,
      duration: toast.duration || 3500,
    };

    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toastMethods = {
    show: addToast,
    success: (message, title = 'Berhasil') => addToast({ type: 'success', message, title }),
    error: (message, title = 'Terjadi Kesalahan') => addToast({ type: 'error', message, title }),
    warning: (message, title = 'Peringatan') => addToast({ type: 'warning', message, title }),
    info: (message, title = 'Informasi') => addToast({ type: 'info', message, title }),
  };

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/**
 * Toast Container component rendered in viewport top-right / bottom-right
 */
export const ToastContainer = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => onRemove(toast.id)} />
      ))}
    </div>
  );
};

/**
 * Individual Toast notification item
 */
export const ToastItem = ({ toast, onRemove }) => {
  const { type, title, message } = toast;

  const icons = {
    success: <CheckCircle2 className="text-green-600 flex-shrink-0" size={22} />,
    error: <AlertCircle className="text-red-600 flex-shrink-0" size={22} />,
    warning: <AlertTriangle className="text-amber-500 flex-shrink-0" size={22} />,
    info: <Info className="text-primary flex-shrink-0" size={22} />,
  };

  const borderAccents = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    warning: 'bg-amber-50',
    info: 'bg-blue-50',
  };

  return (
    <div
      role="alert"
      className={`
        pointer-events-auto border-2 border-black rounded-neo p-4 shadow-neo flex items-start gap-3 bg-white
        transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${borderAccents[type] || 'bg-white'}
      `}
    >
      {icons[type] || icons.info}
      <div className="flex-1 min-w-0">
        {title && <h4 className="text-sm font-bold text-ink leading-tight">{title}</h4>}
        {message && <p className="text-xs font-medium text-gray-700 mt-0.5 leading-snug">{message}</p>}
      </div>
      <button
        onClick={onRemove}
        aria-label="Tutup notifikasi"
        className="w-7 h-7 rounded-full border border-black flex items-center justify-center bg-white hover:bg-gray-100 flex-shrink-0 ml-1 active:scale-95"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default ToastProvider;
