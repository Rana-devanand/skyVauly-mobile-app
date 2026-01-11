import React from "react";
import { StyleSheet, View } from "react-native";

const Separator = ({ color = "#e0e0e0", height = 1, style }: any) => {
  return (
    <View
      style={[
        styles.lineStyle,
        { backgroundColor: color, height: height },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  lineStyle: {
    width: "100%",
  },
});

export default Separator;
