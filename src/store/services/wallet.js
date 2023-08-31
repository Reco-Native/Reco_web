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

const AllTransactions = () => {
  return axios.get(`/v1/wallet-transactions`);
};

const StatusTransactions = (status) => {
  if (status === 'All') {
    return AllTransactions();
  }
  return axios.get(`/v1/wallet-transaction/status/${status}`);
};

const AddSum = ({ Id, data }) => {
  return axios.post(`/v1/add-fund/add/${Id}`, data);
};

const UserTransactions = (Id) => {
  return axios.get(`/v1/wallet-transactions/user/${Id}`);
};

const UserTransactionsStatus = (Id, status) => {
  if (status === 'All') {
    return axios.get(`/v1/wallet-transactions/user/${Id}`);
  }
  return axios.get(`/v1/wallet-transaction/status/${Id}/${status}`);
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

export const GetWalletTransaction = createAsyncThunk('GetWalletTransaction/GET', async ({ data }, thunkAPI) => {
  try {
    const response = await AllTransactions();
    thunkAPI.dispatch(setMessage('Wallet  Transactions Fetched Successful'));

    return response.data;
  } catch (error) {
    const message = ErrorHandler(error);

    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const userWalletTransaction = createAsyncThunk('userWalletTransaction/GET', async ({ Id }, thunkAPI) => {
  try {
    const response = await UserTransactions(Id);
    thunkAPI.dispatch(setMessage('Wallet  Transactions Fetched Successful'));

    return response.data;
  } catch (error) {
    const message = ErrorHandler(error);

    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const userTransactionByStatus = createAsyncThunk(
  'userTransactionByStatus/GET',
  async ({ Id, status }, thunkAPI) => {
    try {
      const response = await UserTransactionsStatus(Id, status);
      thunkAPI.dispatch(setMessage('Wallet  Transactions Fetched Successful'));

      return response.data;
    } catch (error) {
      const message = ErrorHandler(error);

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const AddFund = createAsyncThunk('ADDFUND/GET', async ({ Id, data, setFormdata }, thunkAPI) => {
  try {
    const response = await AddSum({ Id, data });
    thunkAPI.dispatch(setMessage(response.data.message));
    thunkAPI.dispatch(GetWalletTransaction({ data: '' }));

    alert(`Fund of ${response.data.amount} added`);
    if (setFormdata) {
      setFormdata((p) => ({
        ...p,
        controls: {
          ...p.controls,
          fund: '',
          user: '',
        },
      }));
    }
    return response.data;
  } catch (error) {
    const message = ErrorHandler(error);

    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const GetWalletTransactionStatus = createAsyncThunk(
  'GetWalletTransactionStatus/GET',
  async ({ status }, thunkAPI) => {
    try {
      const response = await StatusTransactions(status);
      thunkAPI.dispatch(setMessage('Wallet  Transactions Fetched Successful'));

      return response.data;
    } catch (error) {
      const message = ErrorHandler(error);

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
