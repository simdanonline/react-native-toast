// ToastContext.js
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
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
  }: ToastProp) => {},
});

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState<ToastProp>({
    message: "",
    duration: 2000,
    position: "bottom",
  });

  const showToast = useCallback(
    ({
      message,
      duration = 2000,
      containerStyle,
      textStyle,
      position,
      content,
    }: ToastProp) => {
      setToast({
        message,
        content,
        duration,
        containerStyle,
        textStyle,
        position,
      });
    },
    []
  );

  const handleClose = useCallback(() => {
    setToast({ message: "", duration: 2000 });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {(toast.message || toast.content) ? (
        <Toast
          message={toast.message}
          content={toast.content}
          duration={toast.duration}
          onClose={handleClose}
          containerStyle={toast.containerStyle}
          textStyle={toast.textStyle}
          position={toast.position}
        />
      ) : null}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
