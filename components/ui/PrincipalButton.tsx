import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ComponentType } from "react";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

interface PrincipalButtonProps {
  text?: string;
  disabled?: boolean;
  haptics?: () => void;
  width?: number | string;
  height?: number;
  Icon?: ComponentType<IconProps>;
  activeOpacity?: number;
  activityIndicator?: boolean;
  activityIndicatorColor?: string;
  onPress?: () => void;
}

export default function PrincipalButton({
  width = "100%",
  height = 44,
  text,
  disabled = false,
  activeOpacity = 0.9,
  haptics,
  onPress,
  Icon,
  activityIndicator = false,
  activityIndicatorColor,
}: PrincipalButtonProps) {
  const handlePress = () => {
    if (haptics) {
      haptics();
    }
    if (onPress) {
      onPress();
    }
  };
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { width: width },
        { height: height },
        { backgroundColor: disabled ? "#F2F1F9" : "#281C9D" },
      ]}
      disabled={disabled}
      activeOpacity={activeOpacity}
      onPress={handlePress}
    >
      {activityIndicator ? (
        <ActivityIndicator
          size="small"
          color={activityIndicatorColor ?? "#FFFFFF"}
        />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
});
