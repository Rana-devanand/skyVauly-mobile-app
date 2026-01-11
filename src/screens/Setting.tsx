import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmModal from "@src/components/common/ConfirmModal";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react"; // Import useState
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../services/api";
import { RootState } from "../store/store";

export default function Settings() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [modalVisible, setModalVisible] = useState(false); // Modal state
  const [logout, { isLoading }] = useLogoutMutation();

  const logoutUser = async () => {
    try {
      await AsyncStorage.multiRemove([
        "userId",
        "access_token",
        "refresh_token",
      ]);

      await logout();
      router.replace("/");
    } catch (e) {
      console.log("Logout error", e);
    }
  };

  // Function to handle logout button press
  const handleLogoutPress = () => {
    setModalVisible(true);
  };

  // Function to handle modal confirm
  const handleConfirmLogout = () => {
    setModalVisible(false);
    logoutUser();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Settings</Text>
        <TouchableOpacity style={styles.proBtn}>
          <Text style={styles.proText}>Upgrade to PRO</Text>
        </TouchableOpacity>
      </View>

      {/* Profile */}
      <View style={styles.profileRow}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=32" }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/editProfile")}>
          <Feather name="edit-2" size={18} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Data Section */}
      <Text style={styles.section}>Data</Text>

      <SettingItem icon="file-import" label="Import / Export" />
      <SettingItem icon="cloud-upload-outline" label="Cloud Backup" />
      <SettingItem icon="chart-pie" label="Used Space" />

      {/* More Section */}
      <Text style={styles.section}>More</Text>

      <SettingItem icon="help-circle-outline" label="Help" />
      <SettingItem icon="file-document-outline" label="Terms & Conditions" />
      <SettingItem icon="shield-check-outline" label="Privacy & Policy" />

      {/* Logout */}
      <TouchableOpacity onPress={handleLogoutPress}>
        <Text style={styles.logout}>Log Out</Text>
      </TouchableOpacity>

      {/* Confirm Modal */}
      <ConfirmModal
        visible={modalVisible}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to login again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleConfirmLogout}
        onCancel={() => setModalVisible(false)}
        loading={isLoading}
      />
    </View>
  );
}

function SettingItem({ icon, label }: any) {
  return (
    <TouchableOpacity style={styles.itemRow}>
      <MaterialCommunityIcons name={icon} size={22} color="#6A5AE0" />
      <Text style={styles.itemLabel}>{label}</Text>
      <Feather name="chevron-right" size={18} color="#999" />
    </TouchableOpacity>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E2A47",
  },
  proBtn: {
    backgroundColor: "#EAF1FF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  proText: {
    color: "#6A5AE0",
    fontWeight: "600",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
    marginBottom: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    color: "#888",
    fontSize: 12,
  },
  section: {
    marginTop: 20,
    marginBottom: 8,
    fontWeight: "700",
    color: "#1E2A47",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FC",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  itemLabel: {
    flex: 1,
    marginLeft: 12,
    fontWeight: "500",
  },
  logout: {
    textAlign: "center",
    color: "#FF5C5C",
    fontWeight: "600",
    marginTop: 30,
  },
});
