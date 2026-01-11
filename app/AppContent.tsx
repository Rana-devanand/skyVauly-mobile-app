import AsyncStorage from "@react-native-async-storage/async-storage";
import RootNavigation from "@src/navigation/RootNavigation";
import SplashScreen from "@src/screens/Splash";
import { useMeQuery } from "@src/services/api";
import { setTokens } from "@src/store/reducers/authReducer";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

function AppContent() {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const messages = [
    "🔒 Securing your files...",
    "📂 Organizing documents...",
    "✨ Almost ready...",
    "🚀 Launching SkyVault..."
  ];

  // 🔹 1. Rehydrate Auth State on Mount
  useEffect(() => {
    const rehydrateAuth = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("access_token");
        const refreshToken = await AsyncStorage.getItem("refresh_token");

        if (accessToken && refreshToken) {
          dispatch(setTokens({ accessToken, refreshToken }));
        }
      } catch (e) {
        console.error("Failed to rehydrate auth tokens", e);
      } finally {
        setIsReady(true);
      }
    };

    rehydrateAuth();
  }, [dispatch]);

  // 🔹 2. Fetch User Profile
  const { data, isLoading: isUserLoading , isError } = useMeQuery(undefined, {
    skip: !isReady,
  });

  // 🔹 3. Cycle loading messages
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔹 4. Show splash until both ready
  const isLoading = !isReady || isUserLoading;

  console.log({isLoading})
  if (isLoading) {
    return <SplashScreen loadingMessage={messages[loadingMessageIndex]} />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <RootNavigation />
      <Toast />
    </>
  );
}

export default AppContent;
