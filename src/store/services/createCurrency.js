import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CryptoJS from "crypto-js";

export const createCurrency = createApi({
  reducerPath: "createCurrency",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rico-card-service.herokuapp.com/api",
    prepareHeaders: (headers, { getState }) => {
      //   const token = getState().accessToken;
      const User = localStorage.getItem("user");
      var bytes = CryptoJS.AES.decrypt(User, "secret key 123");
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      const token = JSON.parse(originalText).accessToken;

      if (token) {
        headers.set("authorization", ` ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Post", "Get"],
  endpoints: (builder) => ({
    addNewCurrency: builder.mutation({
      query: (payload) => ({
        url: "/v1/country",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
export const { useAddNewCurrencyMutation } = createCurrency;
