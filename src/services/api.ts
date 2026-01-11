import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "@src/store/reducers/authReducer";
import { baseQueryWithReauth } from "./baseQuery";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["ME"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    me: builder.query<ApiResponse<User>, void>({
      query: () => `/users/me`,
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log("ME QUERY SUCCESS:", JSON.stringify(data, null, 2));
          if (data?.data) {
            dispatch(setUser(data.data));
            if (data.data.id) {
              await AsyncStorage.setItem("userId", String(data.data.id));
            }
          } else {
            console.warn("User data missing in ME response");
          }
        } catch (e) {
          console.error("ME QUERY FAILED", e);
        }
      },
      providesTags: ["ME"],
    }),
    login: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string; user: User }>,
      { email: string; password: string }
    >({
      query: (body) => {
        return { url: `/users/login`, method: "POST", body };
      },
    }),
    register: builder.mutation<
      ApiResponse<User>,
      Omit<
        User,
        | "_id"
        | "active"
        | "provider"
        | "blocked"
        | "blockReason"
        | "createdAt"
        | "facebookId"
        | "linkedinId"
        | "image"
      > & {
        password: string;
      }
    >({
      query: (body) => {
        return { url: `/users/register`, method: "POST", body };
      },
    }),
    inviteUser: builder.mutation<
      ApiResponse<User>,
      Omit<User, "_id" | "active" | "role" | "provider"> & {
        confirmPassword: string;
      }
    >({
      query: (body) => {
        return { url: `/users/invite`, method: "POST", body };
      },
    }),
    updateUser: builder.mutation<
      ApiResponse<User>,
      Partial<User> & { id: string }
    >({
      query: ({ id, ...body }) => {
        return { url: `/users/${id}`, method: "PUT", body };
      },
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setUser(data.data));
          }
        } catch (e) {
          console.error("Update User Sync Failed", e);
        }
      },
      invalidatesTags: ["ME"],
    }),
    uploadProfile: builder.mutation<ApiResponse<void>, UpdateProfileImageDto>({
      query: (body) => {
        console.log({ body });
        return {
          url: "/users/upload-profile",
          method: "PATCH",
          body,
        };
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => {
        return { url: `/users/logout`, method: "POST" };
      },
    }),
    loginByApple: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string; user: User }>,
      { id_token: string }
    >({
      query: (body) => {
        return { url: `/users/social/apple`, method: "POST", body };
      },
    }),
    loginByGoogle: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string; user: User }>,
      { access_token: string }
    >({
      query: (body) => {
        return { url: `/users/social/google`, method: "POST", body };
      },
    }),
    loginByLinkedIn: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string; user: User }>,
      { access_token: string }
    >({
      query: (body) => {
        return { url: `/users/social/linkedin`, method: "POST", body };
      },
    }),
    loginByFacebook: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string; user: User }>,
      { access_token: string }
    >({
      query: (body) => {
        return { url: `/users/social/facebook`, method: "POST", body };
      },
    }),
    getById: builder.query<ApiResponse<{ user: User }>, string>({
      query: (id) => {
        return { url: `/users/${id}`, method: "GET" };
      },
    }),
    changePassword: builder.mutation<
      ApiResponse<{}>,
      {
        confirmPassword: string;
        password: string;
        currentPassword?: string | null;
      }
    >({
      query: (body) => {
        return { url: `/users/change-password`, method: "POST", body };
      },
    }),
    resetPassword: builder.mutation<
      ApiResponse<{}>,
      {
        confirmPassword: string;
        password: string;
        token: string;
      }
    >({
      query: (body) => {
        return { url: `/users/reset-password`, method: "POST", body };
      },
    }),
    verfiyInvitation: builder.mutation<
      ApiResponse<{}>,
      {
        confirmPassword: string;
        password: string;
        token: string;
      }
    >({
      query: (body) => {
        return { url: `/users/verify-invitation`, method: "POST", body };
      },
    }),
    forgotPassword: builder.mutation<
      ApiResponse<{}>,
      {
        email: string;
      }
    >({
      query: (body) => {
        return { url: `/users/forgot-password`, method: "POST", body };
      },
    }),
  }),
});
export const {
  useMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useInviteUserMutation,
  useUpdateUserMutation,
  useUploadProfileMutation,
  useLoginByAppleMutation,
  useLoginByFacebookMutation,
  useLoginByGoogleMutation,
  useLoginByLinkedInMutation,
  useGetByIdQuery,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerfiyInvitationMutation,
} = api;
