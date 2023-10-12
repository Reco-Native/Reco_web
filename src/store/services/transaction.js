import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../slice/messageSlice';
import { ErrorHandler } from '../../component/Notification/ErrorHandler';

const AllTransactions = () => {
  return axios.get(`/v1/transactions`);
};

const UpdateTrans = (data, id) => {
  return axios.patch(`/v1/transact/transaction/${id}`, data);
};

export const GetTransactions = createAsyncThunk('GetTransactions/GET', async ({ data }, thunkAPI) => {
  try {
    const response = await AllTransactions();
    thunkAPI.dispatch(setMessage('Fetched Successful'));
    return response.data;
  } catch (error) {
    const message = ErrorHandler(error);

    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const UpdateTransaction = createAsyncThunk(
  'UpdateTransaction/PUT',
  async ({ data, id, setShowModal, setSelectedRowKeys }, thunkAPI) => {
    try {
      const response = await UpdateTrans(data, id);
      thunkAPI.dispatch(setMessage('Updated Successfully'));
      thunkAPI.dispatch(GetTransactions({ data }));

      setSelectedRowKeys(null);
      setShowModal(false);

      return response.data;
    } catch (error) {
      const message = ErrorHandler(error);

      alert('Something went wrong. Please try again later');
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
