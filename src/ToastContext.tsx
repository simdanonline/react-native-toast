// ToastContext.js
import React, { createContext, useContext, useState, useCallback } from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import Toast from "./Toast";

type ToastProp = {
  message: string;
  duration?: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  position?: "bottom" | "top";
};
const ToastContext = createContext({
  showToast: ({
    message,
    duration,
    containerStyle,
    textStyle,
    position,
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
    }: ToastProp) => {
      setToast({ message, duration, containerStyle, textStyle, position });
    },
    []
  );

  const handleClose = useCallback(() => {
    setToast({ message: "", duration: 2000 });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.message ? (
        <Toast
          message={toast.message}
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
