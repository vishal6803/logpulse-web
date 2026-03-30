"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { X, AlertCircle, CheckCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 p-4 min-w-[300px] border backdrop-blur-md rounded-lg shadow-2xl animate-in slide-in-from-right duration-300 ${
              toast.type === "error"
                ? "bg-red-950/80 border-red-500 text-red-200"
                : toast.type === "success"
                  ? "bg-green-950/80 border-green-500 text-green-200"
                  : "bg-slate-900/80 border-slate-700 text-slate-200"
            }`}
          >
            {toast.type === "error" && <AlertCircle size={18} />}
            {toast.type === "success" && <CheckCircle size={18} />}
            {toast.type === "info" && <Info size={18} />}

            <span className="flex-1 font-mono text-xs uppercase tracking-tight">
              {toast.message}
            </span>

            <button
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
            >
              <X size={14} className="opacity-50 hover:opacity-100" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
