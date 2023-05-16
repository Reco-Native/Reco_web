import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../slice/messageSlice';
import { ErrorHandler } from '../../component/Notification/ErrorHandler';
import { secret } from '../../hooks/getToken.js/secret';
import CryptoJS from 'crypto-js';

const AllUsers = () => {
  return axios.get(`/v1/users`);
};

export const GetAllUsers = createAsyncThunk('GetAllUsers/GET', async ({ data }, thunkAPI) => {
  try {
    const response = await AllUsers();
    thunkAPI.dispatch(setMessage('Users Fetched Successful'));
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(response.data), secret()).toString();

    return ciphertext;
  } catch (error) {
    const message = ErrorHandler(error);

    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
