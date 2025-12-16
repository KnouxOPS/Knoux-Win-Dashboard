import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage, onDismiss: () => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const icons = {
    success: <CheckCircle2 className="text-green-400" size={20} />,
    error: <XCircle className="text-red-400" size={20} />,
    info: <AlertCircle className="text-blue-400" size={20} />
  };

  return (
    <div className="pointer-events-auto bg-bg-card border border-white/10 shadow-xl rounded-lg p-4 flex gap-3 min-w-[300px] animate-in slide-in-from-right-10 fade-in duration-300">
      <div className="shrink-0 mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1">
        <h4 className="font-semibold text-sm text-white">{toast.title}</h4>
        <p className="text-xs text-text-sub mt-1">{toast.message}</p>
      </div>
    </div>
  );
};