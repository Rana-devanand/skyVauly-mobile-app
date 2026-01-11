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
import ImageUploadModal from "./ImageUploadModal";
import { useUpdateUserMutation } from "@src/services/api";

export default function EditProfile() {
  const router = useRouter();

  const [updateUser] = useUpdateUserMutation();
  const { user } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [used] = useState(3.31);
  const limit = 6;

  const [profileImageUri, setProfileImageUri] = useState(
    user.image || "https://i.pravatar.cc/150?img=12" // Use user's avatar or a default
  );
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  const onSave = async () => {
    if (!name.trim()) return Alert.alert("Name required");
    if (!email.includes("@")) return Alert.alert("Invalid email");

    try {
      const userId = user.id || user._id; // Cover both id and _id
      if (!userId) {
        throw new Error("User ID is missing");
      }

      await updateUser({
        id: userId,
        name: name,
        email: email,
      }).unwrap();

      Alert.alert("Success", "Profile Updated");
    } catch (e: any) {
      console.error("Update Error:", e);
      Alert.alert(
        "Update Error",
        e?.data?.message || "Failed to update profile."
      );
    }
  };

  const onDelete = () => {
    Alert.alert("Delete Account", "This action cannot be undone", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive" },
    ]);
  };

  const handleImageSelected = async (url: string) => {
    try {
      const userId = user.id || user._id;
      if (!userId) {
        throw new Error("User ID is missing");
      }
      const payload = {
        id: userId,
        email: email,
        name: name,
        image: url,
      };
      const res = await updateUser(payload).unwrap();
      if (res?.data?.image) {
        setProfileImageUri(res.data.image);
      }
    } catch (e: any) {
      Alert.alert(
        "Upload Error",
        e?.data?.message || "Failed to upload profile image."
      );
    }
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
          source={{ uri: user.image || "https://i.pravatar.cc/100?img=32" }}
          style={styles.avatar}
        />
        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editAvatarButton}
          onPress={() => setImageModalVisible(true)}
        >
          <Feather name="camera" size={16} color="#fff" /> {/* or 'camera' */}
        </TouchableOpacity>
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

      {/* Image Upload Modal */}
      <ImageUploadModal
        isVisible={isImageModalVisible}
        onClose={() => setImageModalVisible(false)}
        onUpload={handleImageSelected}
      />
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
    position: "relative", // Needed for absolute positioning of edit button
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2, // Optional: add a subtle border
    borderColor: "#eee",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: "35%", // Adjust as needed to center it on the avatar's bottom right
    backgroundColor: "#6A5AE0",
    borderRadius: 20,
    padding: 8,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
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
    fontSize: 16, // Ensure consistent text input size
    color: "#333",
  },
  section: {
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 8,
    fontSize: 18, // Make section headers slightly larger
    color: "#333",
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
    color: "#333",
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
    fontSize: 16,
  },
  delete: {
    textAlign: "center",
    color: "#FF5C5C",
    marginTop: 26,
    fontWeight: "600",
    fontSize: 16,
  },
});
