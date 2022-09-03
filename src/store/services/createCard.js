import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CryptoJS from "crypto-js";
export const createCard = createApi({
  reducerPath: "createCard",
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
    addNewCard: builder.mutation({
      query: (payload) => ({
        url: "/v1/card",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Post"],
    }),
    getCards: builder.mutation({
      query: () => ({
        url: "/v1/cards",
      }),
      invalidatesTags: ["Get"],
    }),
    deleteCard: builder.mutation({
      query: (payload) => ({
        url: `/v1/card/${payload}`,
        method: "Delete",
      }),
      invalidatesTags: ["Delete"],
    }),
  }),
});
export const { useAddNewCardMutation, useGetCardsMutation, useDeleteCardMutation } = createCard;
