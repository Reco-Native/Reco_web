import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../slice/messageSlice';
import { ErrorHandler } from '../../component/Notification/ErrorHandler';

const AllWallet = () => {
  return axios.get(`/v1/wallets`);
};

const userWallet = (id) => {
  return axios.get(`/v1/wallet/user/${id}`);
};

export const GetAllWallets = createAsyncThunk('GetAllWallets/GET', async ({ data }, thunkAPI) => {
  try {
    const response = await AllWallet();
    thunkAPI.dispatch(setMessage('Withdraws Fetched Successful'));

    return response.data;
  } catch (error) {
    const message = ErrorHandler(error);

    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const GetUserwallet = createAsyncThunk('GetUserwallet/GET', async ({ data, setSelectedRowKeys }, thunkAPI) => {
  try {
    const response = await userWallet(data);
    thunkAPI.dispatch(setMessage('User wallet Fetched Successful'));
    setSelectedRowKeys(null);

    return response.data;
  } catch (error) {
    const message = ErrorHandler(error);

    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
