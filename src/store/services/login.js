// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const loginUser = createApi({
//   reducerPath: "loginUser",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://rico.herokuapp.com/api",
//   }),
//   tagTypes: ["Post"],
//   endpoints: (builder) => ({
//     loginUser: builder.mutation({
//       query: (payload) => ({
//         url: "/auth/login",
//         method: "POST",
//         body: payload,
//       }),
//       invalidatesTags: ["Post"],
//     }),
//   }),
// });
// export const { useLoginUserMutation } = loginUser;

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../slice/messageSlice';
import CryptoJS from 'crypto-js';
import { ErrorHandler } from '../../component/Notification/ErrorHandler';
import { secret } from '../../hooks/getToken.js/secret';

const LoginURL = (data) => {
  return axios.post(`/auth/login`, data);
};

export const LoginUser = createAsyncThunk('loginUser/Post', async ({ data, setFormdata }, thunkAPI) => {
  try {
    const response = await LoginURL(data);
    thunkAPI.dispatch(setMessage(response.data.message));
    setFormdata((p) => ({
      ...p,
      password: '',
      confirmpassword: '',
    }));
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(response.data), secret()).toString();

    localStorage.setItem('user', ciphertext);
    return response.data;
  } catch (error) {
    const message = ErrorHandler(error);
    //   if (message === "Request failed with status code 401") {
    //     thunkAPI.dispatch(setSession(true));
    //   }
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
