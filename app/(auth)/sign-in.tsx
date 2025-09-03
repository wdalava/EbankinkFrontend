import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/ui/BackButton";
import PrincipalButton from "@/components/ui/PrincipalButton";
import { hapticLight } from "@/utils/haptics";
import z from "zod";
import { LoginSchema } from "@/schemas/loginShemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "@/constants/Colors";
import BellIcon from "@/components/ui/lockSVG";

const { width, height } = Dimensions.get("window");

type FormData = z.infer<typeof LoginSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Références pour navigation entre champs
  const passwordInputRef = useRef<TextInput>(null);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const phoneNumberValue = watch("phone");
  const passwordValue = watch("password");

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: FormData) => {
    setLoading(true);

    const timer = setTimeout(() => {
      console.log("Submited");
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  };

  const handleForgotPassword = () => {
    router.push("/(auth)/sign-in");
  };

  // Fonction pour passer au champ suivant
  const focusPasswordInput = () => {
    passwordInputRef.current?.focus();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={"light-content"} />
      <BackButton
        label="Welcome"
        labelColor={COLORS.white}
        IconColor={COLORS.white}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* Title */}
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.titleDescription}>
              Hello there, sign in to continue
            </Text>
          </View>

          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustration}>
              <View
                style={{
                  borderTopWidth: 1,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderTopStartRadius: 32,
                  borderTopEndRadius: 32,
                  borderColor: COLORS.white,
                }}
              >
                <View
                  style={{
                    width: width * 0.08,
                    height: height * 0.028,
                    borderTopWidth: 5,
                    borderLeftWidth: 5,
                    borderRightWidth: 5,
                    borderTopStartRadius: 32,
                    borderTopEndRadius: 32,
                    borderColor: COLORS.primary2,
                  }}
                ></View>
              </View>
              <View
                style={{
                  width: width * 0.12,
                  height: height * 0.035,
                  borderWidth: 1,
                  backgroundColor: COLORS.primary2,
                  borderColor: COLORS.white,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BellIcon />
              </View>
              <View style={styles.deco1}></View>
              <View style={styles.deco2}></View>
              <View style={styles.deco3}></View>
              <View style={styles.deco4}></View>
              <View style={styles.deco5}></View>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Phone */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputWrapper}>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="phone-pad"
                      placeholder="Phone number"
                      returnKeyType="next"
                      autoComplete="tel"
                      accessibilityHint="Entrez votre numéro de téléphone"
                      accessibilityLabel="Numéro de téléphone"
                      editable={!loading}
                      autoCorrect={false}
                      onSubmitEditing={focusPasswordInput}
                      style={styles.input}
                    />
                  </View>
                )}
              />

              {errors.phone && (
                <Text style={styles.error}>{errors.phone.message}</Text>
              )}
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputWrapper}>
                    <TextInput
                      ref={passwordInputRef}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      returnKeyType="done"
                      placeholder="Password"
                      autoComplete="password"
                      secureTextEntry={!showPassword}
                      accessibilityLabel="Mot de passe"
                      accessibilityHint="Entrez votre mot de passe"
                      editable={!loading}
                      autoCorrect={false}
                      autoCapitalize="none"
                      onSubmitEditing={handleSubmit(onSubmit)}
                      style={styles.input}
                    />
                    <Pressable
                      style={styles.eyeButton}
                      onPress={handleShowPassword}
                      accessibilityLabel={
                        showPassword
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"
                      }
                      accessibilityHint="Appuyez pour changer la visibilité du mot de passe"
                    >
                      <MaterialCommunityIcons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color={
                          value ? COLORS.textPrimary : COLORS.textSecondary
                        }
                      />
                    </Pressable>
                  </View>
                )}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}
              <View style={styles.forgotPassword}>
                <Pressable
                  onPress={handleForgotPassword}
                  accessibilityLabel="Mot de passe oublié"
                  accessibilityHint="Appuyez pour réinitialiser votre mot de passe"
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot your password ?
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Validate Button */}
            <PrincipalButton
              text={!loading ? "Sign in" : ""}
              disabled={loading || !phoneNumberValue || !passwordValue}
              haptics={hapticLight}
              onPress={handleSubmit(onSubmit)}
              activityIndicator={loading}
              activityIndicatorColor={COLORS.primary}
            />
          </View>

          {/* Don't have an account? */}
          <View style={styles.signContainer}>
            <Text style={styles.signText}>Don't have an account?</Text>
            <Pressable
              onPress={() => router.push("/(auth)/sign-up")}
              accessibilityLabel="Créer un compte"
            >
              <Text style={styles.sign}>Sign Up</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.paddingVertical,
    backgroundColor: COLORS.white,
    borderTopEndRadius: SIZES.borderRadiusLarge,
    borderTopStartRadius: SIZES.borderRadiusLarge,
    marginTop: 16,
  },
  containerTitle: {
    marginBottom: SIZES.marginBottom.medium,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.primary,
  },
  titleDescription: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: COLORS.textPrimary,
    marginTop: 5,
  },
  illustrationContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.marginBottom.medium,
  },
  illustration: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.illustrationSize / 2,
    width: SIZES.illustrationSize,
    height: SIZES.illustrationSize,
    backgroundColor: COLORS.backgroundLight,
  },
  deco1: {
    position: "absolute",
    backgroundColor: COLORS.decorationYellow,
    borderRadius: SIZES.deco1Size / 2,
    width: SIZES.deco1Size,
    height: SIZES.deco1Size,
    bottom: height * 0.022,
    left: width * 0.022,
  },
  deco2: {
    position: "absolute",
    backgroundColor: COLORS.decorationBlue,
    borderRadius: SIZES.deco2Size / 2,
    width: SIZES.deco2Size,
    height: SIZES.deco2Size,
    bottom: height * 0.025,
    right: 0,
  },
  deco3: {
    position: "absolute",
    backgroundColor: COLORS.decorationRed,
    borderRadius: SIZES.deco3Size / 2,
    width: SIZES.deco3Size,
    height: SIZES.deco3Size,
    top: 0,
    right: -width * 0.06,
  },
  deco4: {
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.deco2Size / 2,
    width: SIZES.deco2Size,
    height: SIZES.deco2Size,
    top: -height * 0.015,
    left: width * 0.08,
  },
  deco5: {
    position: "absolute",
    backgroundColor: COLORS.decorationGreen,
    borderRadius: SIZES.deco2Size / 2,
    width: SIZES.deco2Size,
    height: SIZES.deco2Size,
    top: height * 0.06,
    left: -width * 0.08,
  },
  form: {
    marginBottom: SIZES.marginBottom.medium,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 13,
    height: SIZES.inputHeight,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    fontFamily: "Poppins_500Medium",
  },
  eyeButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    height: "100%",
  },
  forgotPassword: {
    marginTop: 8,
    alignItems: "flex-end",
    marginBottom: SIZES.marginBottom.small,
  },
  forgotPasswordText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  signContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: "auto",
    paddingBottom: 20,
  },
  signText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  sign: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: "Poppins_600SemiBold",
  },
  error: {
    color: COLORS.error,
    fontSize: 10,
    fontFamily: "Poppins_400Regular",
    marginTop: 4,
  },
});
