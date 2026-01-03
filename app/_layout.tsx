import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import RootNavigation from "@/navigation/RootNavigation";
import { store } from "@/src/store/store";
import SplashScreen from "@/src/screens/Splash";

export default function RootLayout() {
  // const [loaded] = useFonts();

  // if (!loaded) {
  //   // Async font loading only occurs in development.
  //   return <SplashScreen />;
  // }

  const showStorage = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    console.log("AsyncStorage Values:", items);
    AsyncStorage.clear();
  };
  showStorage();


  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar style="auto" />
          <RootNavigation />
          <Toast />
      </Provider>
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
}
