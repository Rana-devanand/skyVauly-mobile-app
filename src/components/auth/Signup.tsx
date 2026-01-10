import { useRegisterMutation } from "@/src/services/api";
import PasswordRequirement from "@/src/utils/PasswordRequirement";
import { createAccount } from "@/src/utils/yup";
import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import * as yup from "yup";
import CustomInput from "../common/CustomInput";
import AuthWrapper from "./AuthWrapper";

type FormData = yup.InferType<typeof createAccount>;

export default function Signup() {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(createAccount),
    mode: "onTouched",
  });
  const passwordValue = watch("password") || "";
  const hasStartedTyping = passwordValue.length > 0;

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      }).unwrap();
      showMessage({
        message: "Registration successful!",
        type: "success",
      });
      // Navigate to login or home, or let user know
      router.push("/login");
    } catch (err: any) {
      console.log("Registration error:", err);
      showMessage({
        message: err?.data?.message || "Registration failed",
        type: "danger",
      });
    }
  };

  return (
    <AuthWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Fill the details to create account</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              style={styles.google}
              source={require("@/assets/google.png")}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="apple" size={20} color="#000" />
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or Enter Details</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Form Inputs */}
        <CustomInput
          name="name"
          control={control}
          label="Full Name"
          placeholder="Enter name"
          errorMessage={errors.name?.message}
        />
        <CustomInput
          name="username"
          control={control}
          label="Username"
          placeholder="Enter unique username"
          errorMessage={errors.username?.message}
        />
        <CustomInput
          name="email"
          control={control}
          label="Email Address"
          placeholder="Email address here"
          autoCapitalize="none"
          keyboardType="email-address"
          errorMessage={errors.email?.message}
        />
        <CustomInput
          name="password"
          control={control}
          label="Password"
          placeholder="********"
          secure
          showToggle
          errorMessage={errors.password?.message}
        />
        <CustomInput
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          placeholder="********"
          secure
          showToggle
          errorMessage={errors.confirmPassword?.message}
        />

        <View style={styles.requirementsContainer}>
          <PasswordRequirement
            met={passwordValue.length >= 8}
            active={hasStartedTyping}
            text="8 characters minimum"
          />
          <PasswordRequirement
            met={/[A-Z]/.test(passwordValue)}
            active={hasStartedTyping}
            text="One uppercase letter"
          />
          <PasswordRequirement
            met={/[a-z]/.test(passwordValue)}
            active={hasStartedTyping}
            text="One lowercase letter"
          />
        </View>
        <Text style={styles.termsText}>
          By clicking register, you agree to the{" "}
          <Text onPress={() => router.push("/")} style={styles.termsLink}>
            Terms and conditions
          </Text>
        </Text>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
          style={[
            styles.submitButton,
            (!isValid || isLoading) && styles.submitButtonDisabled,
          ]}
        >
          {isLoading ? (
            <View style={styles.buttonContent}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={[styles.regiter, { marginLeft: 8 }]}>
                Registering...
              </Text>
            </View>
          ) : (
            <Text style={styles.regiter}>Register</Text>
          )}
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    marginTop: Platform.OS === "android" ? 80 : 0,
  },
  headerBackground: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    height: 40,
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginBottom: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  regiter: {
    color: "#fff",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontWeight: "bold",
    fontSize: 18,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "grey",
    textAlign: "center",
    marginBottom: 30,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1.5,
    backgroundColor: "#FAFAFA",
    borderColor: "#E9E9E9",
    borderRadius: 999,
    marginHorizontal: 8,
  },
  google: {
    width: 20,
    height: 20,
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#7E7E7E",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#6B7280",
  },
  requirementsContainer: {
    marginVertical: 12,
    marginLeft: 4,
  },
  requirementMet: {
    color: "#10B981",
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#7E7E7E",
    marginVertical: 16,
  },
  termsLink: {
    color: "blue",
    fontFamily: "PlusJakartaSans_600SemiBold",
    textDecorationLine: "underline",
  },
  submitButton: {
    backgroundColor: "blue",
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  submitButtonDisabled: {
    backgroundColor: "#93C5FD",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 16,
  },
  loginText: {
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "grey",
  },
  loginLink: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "blue",
  },
});
