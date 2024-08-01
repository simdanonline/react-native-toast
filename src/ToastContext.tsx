// ToastContext.js
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import Toast from "./Toast";
import { ToastProp } from "./types";

const ToastContext = createContext({
  showToast: ({
    message,
    duration,
    containerStyle,
    textStyle,
    position,
    content,
    status,
  }: ToastProp) => {},
  hideAllToast: () => {},
  hideToast: (key) => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState<Array<ToastProp & { key: number }>>([]);
  const showToast = useCallback(
    ({
      message,
      content,
      duration = 2000,
      containerStyle,
      textStyle,
      position,
      status = "default",
    }: ToastProp) => {
      const key = Math.random();
      setToasts((prevToasts) => [
        ...prevToasts,
        {
          key,
          message,
          content,
          duration,
          containerStyle,
          textStyle,
          position,
          status,
        },
      ]);
      return key;
    },
    []
  );

  const hideAllToast = useCallback(() => {
    setToasts([]);
  }, []);

  const hideToast = useCallback((key: number) => {
    setToasts((prev) => prev.filter((toast) => toast.key !== key));
  }, []);

  const handleClose = useCallback((key: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.key !== key));
  }, []);

  useEffect(() => {
    // Automatically set the global toast function
    setGlobalToast(showToast);
  }, [showToast]);
  return (
    <ToastContext.Provider value={{ showToast, hideAllToast, hideToast }}>
      {children}
      {toasts.map((toast) => {
        const positionFilteredToasts = toasts.filter(
          (t) => t.position === toast.position
        );
        const positionIndex = positionFilteredToasts.findIndex(
          (t) => t.key === toast.key
        );
        return (
          <>
            <Toast
              key={toast.key}
              message={toast.message}
              content={toast.content}
              duration={toast.duration}
              onClose={() => handleClose(toast.key)}
              containerStyle={toast.containerStyle}
              textStyle={toast.textStyle}
              position={toast.position}
              status={toast.status}
              index={positionIndex}
            />
          </>
        );
      })}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};

let globalShowToast: ((toastProps: ToastProp) => void) | undefined = undefined;


export const setGlobalToast = (showToastFunction) => {
  globalShowToast = showToastFunction;
};

export const showGlobalToast = (toastProps: ToastProp) => {
  if (globalShowToast) {
    globalShowToast(toastProps);
  } else {
    console.warn('Toast function not set.');
  }
};