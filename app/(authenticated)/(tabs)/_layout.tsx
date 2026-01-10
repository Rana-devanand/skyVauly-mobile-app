import { Feather, Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function CustomTabBar({ state, navigation }: any) {
  const tabs = [
    {
      name: "index",
      label: "Home",
      icon: (c: string) => <Feather name="home" size={22} color={c} />,
    },
    {
      name: "bookmarks",
      label: "Bookmarks",
      icon: (c: string) => <Feather name="bookmark" size={22} color={c} />,
    },
    {
      name: "collections",
      label: "Collections",
      icon: (c: string) => <Feather name="box" size={22} color={c} />,
    },
    {
      name: "settings",
      label: "Settings",
      icon: (c: string) => <Feather name="settings" size={22} color={c} />,
    },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {tabs.slice(0, 2).map((tab, index) => {
          const focused = state.index === index;
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() =>
                router.push({
                  pathname: "/(authenticated)/(tabs)/[tab]",
                  params: { tab: tab.name },
                })
              }
            >
              {tab.icon(focused ? "#4F46E5" : "#9CA3AF")}
              <Text style={[styles.label, focused && styles.active]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* CENTER BUTTON */}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>

        {tabs.slice(2).map((tab, index) => {
          const realIndex = index + 2;
          const focused = state.index === realIndex;
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() =>
                router.push({
                  pathname: "/(authenticated)/(tabs)/[tab]",
                  params: { tab: tab.name },
                })
              }
            >
              {tab.icon(focused ? "#4F46E5" : "#9CA3AF")}
              <Text style={[styles.label, focused && styles.active]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="bookmarks" />
      <Tabs.Screen name="collections" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
  },
  container: {
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 8,
  },
  tab: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  active: {
    color: "#4F46E5",
    fontWeight: "600",
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
    elevation: 10,
  },
});
