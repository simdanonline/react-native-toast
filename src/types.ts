import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";

export interface ToastProp {
  message?: string;
  content?: ReactNode;
  duration?: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  position?: "bottom" | "top";
  status?: status;
}

export interface ToastComponentProp extends ToastProp {
  onClose: () => void;
  index: number;
  key: any;
}

export type status = "default" | "success" | "error" | "warning" | "info";
