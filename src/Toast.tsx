// Toast.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
} from "react-native";

type ToastType = {
  message: string;
  duration: number;
  onClose: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  position?: "bottom" | "top";
};

const { height } = Dimensions.get("screen");
const Toast = ({
  message,
  duration,
  onClose,
  textStyle,
  containerStyle,
  position,
}: ToastType) => {
  const [visible, setVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    if (message) {
      setVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
          onClose();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.toast, { opacity: fadeAnim }, containerStyle, {bottom: position === 'top' ? height * 0.85 : height * 0.1}]}
    >
      <Text style={[styles.message, textStyle]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: "black",
    borderRadius: 5,
  },
  message: {
    color: "white",
    textAlign: "center",
  },
});

export default Toast;
