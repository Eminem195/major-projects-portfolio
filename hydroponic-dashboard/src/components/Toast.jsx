import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useState } from "react";
import { FaCheck, FaExclamationTriangle, FaInfo, FaTimes } from "react-icons/fa";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  }, []);

  const success = useCallback((message) => addToast(message, "success"), [addToast]);
  const error = useCallback((message) => addToast(message, "error"), [addToast]);
  const warning = useCallback((message) => addToast(message, "warning"), [addToast]);
  const info = useCallback((message) => addToast(message, "info"), [addToast]);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "success": return <FaCheck />;
      case "error": return <FaTimes />;
      case "warning": return <FaExclamationTriangle />;
      default: return <FaInfo />;
    }
  };

  return (
    <ToastContext.Provider value={{ success, error, warning, info }}>
      {children}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className={`toast toast-${toast.type}`}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <span className="toast-icon">{getIcon(toast.type)}</span>
              <span className="toast-message">{toast.message}</span>
              <button className="toast-close" onClick={() => removeToast(toast.id)}>
                <FaTimes />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}