// Toast.js
import React, { useState, useEffect } from "react";
import { Text, Animated, StyleSheet, Dimensions } from "react-native";
import { ToastComponentProp } from "./types";

const { height } = Dimensions.get("screen");
const Toast = ({
  message,
  duration,
  onClose,
  textStyle,
  containerStyle,
  position,
  content,
}: ToastComponentProp) => {
  const [visible, setVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    if (message || content) {
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
  }, [message, content]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.toast,
        { opacity: fadeAnim },
        containerStyle,
        { bottom: position === "top" ? height * 0.85 : height * 0.1 },
      ]}
    >
      {content ? (
        content
      ) : (
        <Text style={[styles.message, textStyle]}>{message}</Text>
      )}
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
    // alignItems: "center",
    // justifyContent: "center",
  },
  message: {
    color: "white",
    textAlign: "center",
  },
});

export default Toast;
