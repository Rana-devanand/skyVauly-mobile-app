import { Image, ImageBackground } from "react-native";

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require("@assets/images/png/mainBg.png")}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      resizeMode="cover"
    >
      <Image
        source={require("@assets/images/png/splash.png")}
        style={{
          width: "70%",
          height: "70%",
          resizeMode: "contain",
        }}
      />
    </ImageBackground>
  );
};

export default SplashScreen;
