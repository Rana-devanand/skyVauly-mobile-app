import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message/lib";
import { useUploadFileMutation } from "@src/services/uploadFile";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ImageUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onUpload: (url: string) => Promise<void>;
}

const ImageUploadModal = ({
  isVisible,
  onClose,
  onUpload,
}: ImageUploadModalProps) => {
  const [uploadFile] = useUploadFileMutation();
  const [selectedAsset, setSelectedAsset] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const [loading, setLoading] = useState(false);

  const pickImage = async (fromCamera: boolean) => {
    let result;

    if (fromCamera) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted")
        return Toast.show({
          type: "error",
          text1: "Camera permission required",
        });
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
    } else {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted")
        return Toast.show({
          type: "error",
          text1: "Gallery permission required",
        });
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
    }

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedAsset(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedAsset) return;
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", {
        uri: selectedAsset.uri,
        name: selectedAsset.fileName || "profile.jpg",
        type: selectedAsset.mimeType || "image/jpeg",
      } as any);

      const res = await uploadFile(formData).unwrap();
      if (res?.url) {
        await onUpload(res.url);
      }
      Toast.show({ type: "success", text1: "Profile updated successfully" });
      setSelectedAsset(null);
      onClose();
    } catch {
      Toast.show({ type: "error", text1: "Upload failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          {!selectedAsset ? (
            <>
              <Text style={styles.modalTitle}>Choose Profile Picture</Text>

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickImage(false)}
              >
                <Feather name="image" size={22} color="#6A5AE0" />
                <Text style={styles.uploadButtonText}>Select from Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickImage(true)}
              >
                <Feather name="camera" size={22} color="#6A5AE0" />
                <Text style={styles.uploadButtonText}>Take Photo</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Image
                source={{ uri: selectedAsset.uri }}
                style={styles.preview}
              />
              {loading ? (
                <ActivityIndicator size="large" color="#6A5AE0" />
              ) : (
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => setSelectedAsset(null)}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={handleUpload}
                  >
                    <Text style={styles.confirmText}>Upload</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}

          <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
            <Text style={{ color: "#999" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end", // Aligns modal content to the bottom
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF1FF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 10,
    width: "100%",
    justifyContent: "center",
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6A5AE0",
    marginLeft: 10,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#FF5C5C",
    fontWeight: "600",
  },
  preview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  cancelBtn: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F3F3F3",
    flex: 1,
    alignItems: "center",
  },
  confirmBtn: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#6A5AE0",
    flex: 1,
    alignItems: "center",
  },
  confirmText: { color: "#fff", fontWeight: "700" },
  cancelText: { color: "#555", fontWeight: "600" },
});

export default ImageUploadModal;
