import { Image } from "expo-image";
import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface AuthWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthWrapper = ({ children, title, subtitle }: AuthWrapperProps) => {
  return (
    <ImageBackground
      source={require("@assets/base/commonBg.png")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <View style={styles.headerBackground}>
                <Image
                  source={require("@assets/images/icon.png")}
                  style={styles.headerImage}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
              {children}
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AuthWrapper;

const styles = StyleSheet.create({
  background: { flexGrow: 1 },
  scrollViewContent: {
    justifyContent: "center",
    minHeight: "100%",
  },
  container: { padding: 24, width: "100%", height: "100%" },
  headerBackground: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  headerImage: {
    position: "absolute",
    top: -20,
    height: 400,
    width: "100%",
  },

  title: {
    fontSize: 20,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "grey",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});
