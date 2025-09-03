import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

interface ButtonProps {
  label?: string;
  labelColor?: string;
  bgColor?: string;
  IconColor?: string;
}

const { height, width } = Dimensions.get("window");

export default function BackButton({
  label,
  labelColor,
  bgColor,
  IconColor,
}: ButtonProps) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.back()}
      style={[styles.container, bgColor && { backgroundColor: bgColor }]}
    >
      <Feather
        name="chevron-left"
        size={height * 0.035}
        color={IconColor ?? "#343434"}
      />
      {label && (
        <Text style={[styles.label, labelColor && { color: labelColor }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.018,
    paddingHorizontal: width * 0.05,
  },
  label: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: width * 0.03,
  },
});
