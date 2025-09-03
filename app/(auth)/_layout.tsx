import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "sign-up",
};

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
}
