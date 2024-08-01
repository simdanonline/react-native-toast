import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";

export interface ToastProp {
  message?: string;
  content?: ReactNode;
  duration?: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  position?: "bottom" | "top";
};

export interface ToastComponentProp extends ToastProp {
    onClose: () => void;
}