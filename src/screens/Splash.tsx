import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, View } from "react-native";

const SplashScreen = ({ loadingMessage }: { loadingMessage: string }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const [displayedText, setDisplayedText] = useState("");

  // Typing effect
  useEffect(() => {
    let index = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText(loadingMessage.slice(0, index + 1));
      index++;
      if (index === loadingMessage.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [loadingMessage]);

  // Fade-in animation for text
  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [loadingMessage]);

  // Bounce emoji
  useEffect(() => {
    bounceAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -8,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [loadingMessage]);

  // Correctly separate emoji at start
  const match = loadingMessage.match(
    /^(\p{Emoji_Presentation}|\p{Extended_Pictographic})+/u
  );
  const emoji = match ? match[0] : "";
  const textWithoutEmoji = loadingMessage.slice(emoji.length);

  // Slice typing effect
  const typedEmoji = emoji; // emoji shows immediately
  const typedText = displayedText.slice(emoji.length);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("@assets/base/splash-screen.png")}
        style={{ width: "100%", height: "100%", resizeMode: "cover" }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 150,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Animated.Text
          style={{
            fontSize: 18,
            color: "#555",
            opacity: fadeAnim,
            textAlign: "center",
          }}
        >
          <Animated.Text style={{ transform: [{ translateY: bounceAnim }] }}>
            {typedEmoji}
          </Animated.Text>
          {typedText}
        </Animated.Text>
      </View>
    </View>
  );
};

export default SplashScreen;
