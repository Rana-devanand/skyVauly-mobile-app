
import { styles } from "@/components/onBoard/style";
import { useOrientation } from "@/src/utils/useOrientation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


const steps = [
  {
    title: "Welcome to SkyVault",
    subtitle:
      "A secure way to catalog, protect, and celebrate the things you value most.",
    image: require("@/assets/onboarding/onboard1.png"),
    background : "linear-gradient(90deg,rgba(226, 228, 255, 1) 1%, rgba(210, 216, 255, 1) 51%, rgba(226, 228, 255, 1) 100%)",

  },
  {
    title: "Build Your Digital Household",
    subtitle:
      "Create your household, add members, and keep every important item organized in one place",
    image: require("@/assets/onboarding/onboard2.png"),
    background : "linear-gradient(90deg,rgba(219, 241, 255, 1) 1%, rgba(185, 217, 255, 1) 51%, rgba(219, 241, 255, 1) 100%);",
  },
  {
    title: "See Your Progress Grow",
    subtitle:
      "Earn badges as you complete rooms and build your full household inventory.",
    image: require("@/assets/onboarding/onboard3.png"),
    background : "linear-gradient(90deg,rgba(255, 235, 239, 1) 1%, rgba(237, 230, 241, 1) 51%, rgba(255, 235, 239, 1) 100%);"
  },
];

const OnBoarding = () => {
  const [index, setIndex] = useState(0);
  const { isPortrait, isLandscape } = useOrientation();
  const router = useRouter();

  const handleNext = () => {
    if (index < steps.length - 1) {
      setIndex(index + 1);
    } else {
      AsyncStorage.setItem("onboarding_done", "true");
      console.log("Finished!");
      router.replace("/login");
    }
  };


  return (
    <View
      // source={require("@/assets/images/partial-react-logo.png")}
      style={[styles.background , {backgroundColor : steps[index].background}]}
    >
      <View style={isLandscape ? styles.landscapeContainer : styles.container}>
        <View style={[isPortrait ? styles.header : styles.landscapeHeader]}>
          <View
            style={
              isLandscape
                ? styles.landscapeImageContainer
                : styles.imageContainer
            }
          >
            <Image
              source={steps[index].image}
              style={isLandscape ? styles.landscapeImage : styles.image}
              resizeMode="contain"
            />
          </View>

          {isPortrait && (
            <View style={styles.content}>
              <Text style={styles.title}>{steps[index].title}</Text>
              <Text style={styles.subtitle}>{steps[index].subtitle}</Text>
            </View>
          )}
        </View>

        <View style={isPortrait ? styles.footer : styles.landscapeFooter}>
          {isLandscape && (
            <View style={styles.landscapeContent}>
              <Text style={styles.landscapeTitle}>{steps[index].title}</Text>
              <Text style={styles.landscapeSubtitle}>
                {steps[index].subtitle}
              </Text>
            </View>
          )}
          <View style={styles.dotsContainer}>
            {steps.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, index === i && styles.dotActive]}
              />
            ))}
          </View>
          <View style={styles.btnContainer}>
            {index < steps.length - 1 ? (
              <TouchableOpacity
                style={styles.skipBtn}
                onPress={() => setIndex(steps.length - 1)}
              >
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ width: 0 }} />
            )}

            <TouchableOpacity
              style={[
                styles.nextBtn,
                index === steps.length - 1 && styles.finishBtn,
              ]}
              onPress={handleNext}
            >
              <Text style={styles.nextText}>
                {index === steps.length - 1 ? "Finish" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;
