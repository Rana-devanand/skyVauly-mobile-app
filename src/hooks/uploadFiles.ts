import { useUploadFileMutation } from "@src/services/uploadFile";
import * as DocumentPicker from "expo-document-picker";

export const pickAndUploadDoc = async () => {

const [upload] = useUploadFileMutation();

  const doc = await DocumentPicker.getDocumentAsync({
    type: "*/*",
    copyToCacheDirectory: true,
  });

  if (doc.canceled) return;

  const file = doc.assets[0];

  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    name: file.name,
    type: file.mimeType || "application/octet-stream",
  } as any);

  const res = await upload(formData);
  return res;   
};
