import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
};

export default function SafeAreaWrapper({ children }: Props) {
  return (
    <SafeAreaProvider style={styles.safe}>
      <View style={styles.container}>{children}</View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
});
