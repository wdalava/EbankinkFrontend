import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/ui/BackButton";
import { COLORS, SIZES } from "@/constants/Colors";
import ManInPhoneSVG from "@/components/ui/manInPhoneSVG";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { RegisterSchema } from "@/schemas/registerSchmas";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PrincipalButton from "@/components/ui/PrincipalButton";
import { hapticLight } from "@/utils/haptics";

const { height, width } = Dimensions.get("window");

type formData = z.infer<typeof RegisterSchema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const phoneNumberInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);

  const router = useRouter();

  // Initialisation form
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      password: "",
      password_confirm: "",
    },
  });

  const nameValue = watch("name");
  const phoneNumberValue = watch("phoneNumber");
  const passwordValue = watch("password");
  const passwordConfirmValue = watch("password_confirm");

  // Submit
  const onSubmit = () => {
    setLoading(true);

    const timer = setTimeout(() => {
      console.log("Submited");
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  };

  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleShowPasswordConfirm = useCallback(() => {
    setShowPasswordConfirm((prev) => !prev);
  }, []);

  // focus phone input
  const focusPhoneNumberInput = () => {
    phoneNumberInputRef.current?.focus();
  };

  // focus password input
  const focusPasswordInput = () => {
    passwordInputRef.current?.focus();
  };

  // focus password confirm input
  const focusPasswordConfirmInput = () => {
    passwordConfirmInputRef.current?.focus();
  };

  // toggle terms
  const handleAcceptTerms = () => {
    setTermsAccepted((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <BackButton
        label="Sign in"
        IconColor={COLORS.white}
        labelColor={COLORS.white}
      />
      <KeyboardAvoidingView
        style={styles.safeArea}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={styles.safeArea}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          bounces={true}
        >
          {/* Title */}
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Welcome to us,</Text>
            <Text style={styles.titleDescription}>
              Hello there, create New account
            </Text>
          </View>

          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustration}>
              <View style={styles.illustrationPhone}>
                <View style={styles.illustrationPhoneBar}></View>
                <ManInPhoneSVG />
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
            {/* Name */}
            <View style={styles.formContainer}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Full name"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="words"
                      keyboardType="default"
                      returnKeyType="next"
                      autoComplete="name"
                      autoCorrect={false}
                      accessibilityLabel="Votre nom et prénom"
                      accessibilityHint="Enter your full name"
                      onSubmitEditing={focusPhoneNumberInput}
                      editable={!loading}
                      style={styles.input}
                    />
                  </View>
                )}
              />

              {errors.name && (
                <Text style={styles.error}>{errors.name.message}</Text>
              )}
            </View>

            {/* Phone number */}
            <View style={styles.formContainer}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      ref={phoneNumberInputRef}
                      placeholder="Phone number"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      autoComplete="tel"
                      accessibilityLabel="Votre numéro de téléphone"
                      accessibilityHint="Enter your phone number"
                      onSubmitEditing={focusPasswordInput}
                      editable={!loading}
                      style={styles.input}
                    />
                  </View>
                )}
              />

              {errors.phoneNumber && (
                <Text style={styles.error}>{errors.phoneNumber.message}</Text>
              )}
            </View>

            {/* Password */}
            <View style={styles.formContainer}>
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      ref={passwordInputRef}
                      placeholder="Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="default"
                      returnKeyType="next"
                      accessibilityLabel="Votre mot de passe"
                      textContentType="newPassword"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      accessibilityHint="Enter your password"
                      onSubmitEditing={focusPasswordConfirmInput}
                      editable={!loading}
                      style={styles.input}
                    />

                    <Pressable
                      onPress={handleShowPassword}
                      style={styles.passwordShow}
                      accessibilityLabel={
                        showPassword
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"
                      }
                      accessibilityHint="Appuyer pour changer la visibilité du mot de passe"
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
            </View>

            {/* Password Confirm */}
            <View style={styles.formContainer}>
              <Controller
                name="password_confirm"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      ref={passwordConfirmInputRef}
                      placeholder="Confirm password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="default"
                      returnKeyType="done"
                      accessibilityLabel="confirmations de votre mot de passe"
                      secureTextEntry={!showPasswordConfirm}
                      autoCapitalize="none"
                      autoCorrect={false}
                      accessibilityHint="Confirmez votre mot de passe"
                      onSubmitEditing={handleSubmit(onSubmit)}
                      editable={!loading}
                      style={styles.input}
                    />

                    <Pressable
                      onPress={handleShowPasswordConfirm}
                      style={styles.passwordShow}
                      accessibilityLabel={
                        showPasswordConfirm
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"
                      }
                      accessibilityHint="Appuyer pour changer la visibilité du mot de passe"
                    >
                      <MaterialCommunityIcons
                        name={
                          showPasswordConfirm
                            ? "eye-outline"
                            : "eye-off-outline"
                        }
                        size={20}
                        color={
                          value ? COLORS.textPrimary : COLORS.textSecondary
                        }
                      />
                    </Pressable>
                  </View>
                )}
              />

              {errors.password_confirm && (
                <Text style={styles.error}>
                  {errors.password_confirm.message}
                </Text>
              )}
            </View>

            {/* Terms */}
            <View style={styles.termsContainer}>
              <Pressable
                style={[
                  styles.toggleTermsBtn,
                  {
                    borderColor: termsAccepted
                      ? COLORS.primary
                      : COLORS.textSecondary,
                  },
                  { borderWidth: termsAccepted ? 2 : 1 },
                ]}
                onPress={handleAcceptTerms}
              >
                {termsAccepted ? (
                  <MaterialCommunityIcons
                    name="check"
                    size={width * 0.035}
                    color={COLORS.primary}
                  />
                ) : (
                  ""
                )}
              </Pressable>
              <Text style={styles.termsText}>
                By creating an account your aggree {`\n`}to our
                <Text style={styles.termsTextBlue}> Term and Condtions</Text>
              </Text>
            </View>

            {/* Validate button */}
            <PrincipalButton
              onPress={handleSubmit(onSubmit)}
              text={!loading ? "Sign up " : ""}
              disabled={
                loading ||
                !nameValue ||
                !phoneNumberValue ||
                !passwordValue ||
                !passwordConfirmValue ||
                !termsAccepted
              }
              haptics={hapticLight}
              activityIndicator={loading}
              activityIndicatorColor={COLORS.primary}
            />
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
    color: COLORS.primary,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
  },
  titleDescription: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    marginTop: 5,
    color: COLORS.textPrimary,
  },
  illustrationContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.marginBottom.medium,
  },
  illustration: {
    position: "relative",
    backgroundColor: COLORS.backgroundLight2,
    width: width * 0.38,
    height: width * 0.38,
    borderRadius: (width * 0.38) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  deco1: {
    position: "absolute",
    width: SIZES.deco1Size,
    height: SIZES.deco1Size,
    borderRadius: SIZES.deco1Size / 2,
    backgroundColor: COLORS.decorationYellow,
    bottom: height * 0.022,
    left: width * 0.022,
  },
  deco2: {
    width: SIZES.deco2Size,
    height: SIZES.deco2Size,
    borderRadius: SIZES.deco2Size / 2,
    position: "absolute",
    backgroundColor: COLORS.decorationBlue,
    right: 0,
    bottom: height * 0.025,
  },
  deco3: {
    position: "absolute",
    backgroundColor: COLORS.decorationRed,
    width: SIZES.deco3Size,
    height: SIZES.deco3Size,
    borderRadius: SIZES.deco3Size / 2,
    right: -width * 0.06,
    top: 0,
  },
  deco4: {
    position: "absolute",
    width: SIZES.deco2Size,
    height: SIZES.deco2Size,
    borderRadius: SIZES.deco2Size / 2,
    backgroundColor: COLORS.primary,
    top: -height * 0.015,
    left: width * 0.08,
  },
  deco5: {
    position: "absolute",
    backgroundColor: COLORS.decorationGreen,
    width: SIZES.deco2Size,
    height: SIZES.deco2Size,
    borderRadius: SIZES.deco2Size / 2,
    left: -width * 0.06,
    top: height * 0.06,
  },
  illustrationPhone: {
    backgroundColor: "#5655B9",
    width: width * 0.11,
    height: height * 0.09,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  illustrationPhoneBar: {
    position: "absolute",
    top: 0,
    width: width * 0.06,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLORS.white,
  },
  form: {
    marginBottom: SIZES.marginBottom.medium,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: SIZES.borderRadius,
    height: SIZES.inputHeight,
    borderColor: COLORS.border,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    fontFamily: "Poppins_500Medium",
  },
  passwordShow: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    height: "100%",
  },
  termsContainer: {
    flexDirection: "row",
    marginBottom: SIZES.marginBottom.medium,
  },
  termsText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textPrimary,
  },
  termsTextBlue: {
    color: COLORS.primary,
    fontFamily: "Poppins_600SemiBold",
  },
  toggleTermsBtn: {
    width: width * 0.053,
    height: height * 0.024,
    borderRadius: 5,
    marginRight: width * 0.04,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
  },
  error: {
    color: COLORS.error,
    fontSize: 10,
    marginTop: 4,
    fontFamily: "Poppins_400Regular",
  },
});
