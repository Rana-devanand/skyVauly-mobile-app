import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export interface UploadFileResponse {
  url: string;
  publicId: string;
  name: string;
  size: number;
  format: string;
}

export type UploadFileRequest = FormData;


export const uploadFileApi = createApi({
  reducerPath: "uploadFileApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["FileUpload"],

  endpoints: (builder) => ({
    uploadFile: builder.mutation<UploadFileResponse, UploadFileRequest>({
      query: (formData) => ({
        url: "/users/upload-doc",
        method: "POST",
        body: formData,
      }),
    }),
    
  }),
});

export const { useUploadFileMutation } =
  uploadFileApi;
