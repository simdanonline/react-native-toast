// Toast.js
import React, { useState, useEffect, useRef } from "react";
import { Text, Animated, StyleSheet, Dimensions } from "react-native";
import { status, ToastComponentProp } from "./types";

const { height } = Dimensions.get("screen");

const toastColor = (type: status) => {
  const color = {
    default: "#7B8089",
    error: "#FF2A04",
    warning: "#FFAF3D",
    success: "#4BB543",
    info: "#64D9FF",
  };

  return color[type ?? "default"];
};

const Toast = ({
  message,
  duration,
  onClose,
  textStyle,
  containerStyle,
  position = "bottom",
  content,
  status = "default",
  index,
}: ToastComponentProp) => {
  const [visible, setVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  const [measuredHeight, setMeasuredHeight] = useState(0);

  console.log({measuredHeight});
  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setMeasuredHeight(height);
  };
  useEffect(() => {
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
  }, []);


  if (!visible) {
    return null;
  }

  const positionStyle =
    position === "bottom"
      ? { bottom: height * 0.1 + index * (measuredHeight + 10) }
      : { top: height * 0.15 + index * (measuredHeight + 10) };

  return (
    <Animated.View
      style={[
        styles.toast,
        { opacity: fadeAnim },
        { backgroundColor: toastColor(status) },
        containerStyle,
        positionStyle,
      ]}
      onLayout={onLayout}
    >
      {content ? (
        <>{content}</>
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
