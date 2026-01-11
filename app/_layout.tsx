import { store } from "@src/store/store";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import AppContent from "./AppContent";
import Toast from "react-native-toast-message/lib";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Toast />
        <AppContent />
      </Provider>
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
}
