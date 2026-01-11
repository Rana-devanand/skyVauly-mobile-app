import { Feather } from "@expo/vector-icons";
import { RootState } from "@src/store/store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [used] = useState(3.31);
  const limit = 6;

  const onSave = () => {
    if (!name.trim()) return Alert.alert("Name required");
    if (!email.includes("@")) return Alert.alert("Invalid email");

    Alert.alert("Profile Updated");
  };

  const onDelete = () => {
    Alert.alert("Delete Account", "This action cannot be undone", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive" },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backRow}>
        <Feather name="arrow-left" size={20} />
        <Text style={styles.header}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatarWrap}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=32" }}
          style={styles.avatar}
        />
      </View>

      {/* Full Name */}
      <Text style={styles.label}>Full name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />

      {/* Account */}
      <Text style={styles.section}>Account</Text>

      <View style={styles.rowBetween}>
        <Text style={styles.value}>Free Basic</Text>
        <TouchableOpacity style={styles.proBtn}>
          <Text style={styles.proText}>Upgrade to PRO</Text>
        </TouchableOpacity>
      </View>

      {/* Storage */}
      <Text style={styles.label}>Used space</Text>
      <View style={styles.progressRow}>
        <Text style={styles.value}>{used} GB</Text>
        <View style={styles.bar}>
          <View style={[styles.fill, { width: `${(used / limit) * 100}%` }]} />
        </View>
        <Text style={styles.muted}>of {limit} GB</Text>
      </View>

      {/* Info */}
      <Text style={styles.label}>User ID</Text>
      <Text style={styles.value}>{user.uid}</Text>

      <Text style={styles.label}>Member since</Text>
      <Text style={styles.value}>
        {new Date(user?.created_at || "").toDateString()}
      </Text>

      {/* Save */}
      <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>

      {/* Delete */}
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 8,
  },
  avatarWrap: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#F6F7FB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  section: {
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bar: {
    flex: 1,
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginHorizontal: 8,
  },
  fill: {
    height: 6,
    backgroundColor: "#6A5AE0",
    borderRadius: 4,
  },
  value: {
    fontWeight: "600",
  },
  muted: {
    color: "#999",
    fontSize: 12,
  },
  saveBtn: {
    backgroundColor: "#6A5AE0",
    padding: 14,
    borderRadius: 14,
    marginTop: 20,
  },
  saveText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  delete: {
    textAlign: "center",
    color: "#FF5C5C",
    marginTop: 26,
    fontWeight: "600",
  },
});
