// import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "@/src/services/api";
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
import { Divider } from "react-native-paper";
import * as yup from "yup";
import CustomInput from "../common/CustomInput";
import AuthWrapper from "./AuthWrapper";
import { store } from "@/src/store/store";
// Import your custom password field or implement below
// import AppleLogin from './AppleLogin';
// import GoogleLogin from './GoogleLogin';
// import FBLogin from './FBLogin';
// import LinkedInLogin from './LinkedInLogin';

const schema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 chars required")
    .max(16, "Maximum 16 chars allowed"),
});

type FormData = yup.InferType<typeof schema>;

export default function Login() {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginMutation();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data).unwrap();
      router.replace("/(authenticated)/(tabs)");
      showMessage({
        message: "Login successful",
        type: "success",
      });
    } catch (error: any) {
      showMessage({
        message: error?.data?.message || "Login failed",
        type: "danger",
      });
    }
  };

  const BE_API_URL = process.env.EXPO_PUBLIC_API_URL_LOCAL;
  console.log({ BE_API_URL });
  console.log("Form state:", { isValid, isSubmitting, errors });
  return (
    <AuthWrapper>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Login and start manage your documents
        </Text>
        <CustomInput
          label={"Email Address/ Username"}
          name="email"
          mode="outlined"
          placeholder="Email address or username"
          control={control}
          errorMessage={errors.email?.message}
          autoCapitalize="none"
          keyboardType="email-address"
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
        <TouchableOpacity
          style={styles.forgetPassword}
          onPress={() => {
            // router.push({
            //   pathname: "/forgot-password",
            //   params: {
            //     email: getValues("email") || "",
            //   },
            // });
          }}
        >
          <Text style={{ color: "blue" }}>Forgot password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[styles.button, isLoading && styles.buttonDisabled]}
          disabled={isLoading}
        >
          {isLoading ? (
            <View style={styles.buttonContent}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={[styles.logIn, { marginLeft: 8 }]}>
                Logging in...
              </Text>
            </View>
          ) : (
            <Text style={styles.logIn}>Log in</Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <Divider
            style={{
              flex: 1,
              height: 1,
            }}
          />
          <Text style={styles.loginWith}>Or login with</Text>
          <Divider style={{ flex: 1, height: 1 }} />
        </View>

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

        <View style={styles.linkContainer}>
          <Text style={styles.link}>Don&apos;t have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/createAccount");
            }}
          >
            <Text style={styles.linkText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    marginTop: Platform.OS === "android" ? 130 : 0,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#111827",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "grey",
    textAlign: "center",
    marginBottom: 30,
  },
  forgetPassword: {
    color: "blue",
    alignItems: "flex-end",
    paddingBottom: 30,
    paddingTop: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#6B7280",
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logIn: {
    color: "#fff",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontWeight: "bold",
    fontSize: 18,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  loginWith: {
    color: "grey",
    marginHorizontal: 12,
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
  linkContainer: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    color: "grey",
    marginVertical: 6,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  linkText: {
    color: "blue",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});
