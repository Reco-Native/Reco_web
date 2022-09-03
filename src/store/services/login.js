import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginUser = createApi({
  reducerPath: "loginUser",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rico-card-service.herokuapp.com/api",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
export const { useLoginUserMutation } = loginUser;
