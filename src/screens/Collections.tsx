import { StyleSheet, Text, View } from "react-native";

const Collections = () => {
  return (
    <View style={styles.container}>
      <Text>Collections</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Collections;
