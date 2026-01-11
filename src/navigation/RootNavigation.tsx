import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetTokens, setTokens } from "@src/store/action/authActions";
import { useAppDispatch, useAppSelector } from "@src/store/store";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const AUTH_ROUTES = [
  "login",
  "signup",
  "createAccount",
  "onboardingProcess",
];

const RootNavigation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAppSelector((state) => state.auth);
  // const isAuthenticated = !!accessToken; // Unused in specific logic below but good to have
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("access_token");
        const refreshToken = await AsyncStorage.getItem("refresh_token");
        const onboarding = await AsyncStorage.getItem("onboarding_done");
        const isOnboardingDone = !!onboarding;

        const inAuthGroup = segments[0] === "(authenticated)";
        const currentPath = segments.join("/"); // e.g., "login", "createAccount"

        if (accessToken && refreshToken) {
          dispatch(setTokens({ accessToken, refreshToken }));
          if (!inAuthGroup) {
            router.replace("/(authenticated)/(tabs)");
          }
        } else {
          dispatch(resetTokens());

          // If user is inside (authenticated) but has no token -> redirect out
          if (inAuthGroup) {
            if (isOnboardingDone) {
              router.replace("/login");
            } else {
              router.replace("/onboardingProcess");
            }
          } else {
            // User is NOT in auth group (public/auth pages).
            // Check if they are on a known auth route.
            const isAuthRoute = AUTH_ROUTES.some(
              (route) => currentPath === route || currentPath.startsWith(route)
            );

            // If they are on a valid auth route, let them be.
            // Otherwise/fallback, redirect them to login/onboarding.
            if (!isAuthRoute) {
              if (isOnboardingDone) {
                router.replace("/login");
              } else {
                router.replace("/onboardingProcess");
              }
            }
          }
        }
      } catch (err) {
        console.log("Auth check error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{ headerShown: false, headerTitle: "Login" }}
      />
      <Stack.Screen
        name="createAccount"
        options={{ headerShown: false, headerTitle: "Create Account" }}
      />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      {/* <Stack.Screen name="forgot-password" options={{ headerShown: false }} /> */}
      <Stack.Screen name="onboardingProcess" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootNavigation;
