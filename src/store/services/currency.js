import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../slice/messageSlice';
import { ErrorHandler } from '../../component/Notification/ErrorHandler';

const Create = (data) => {
  return axios.post(`/v1/country`, data);
};

const All = () => {
  return axios.get(`/v1/country`);
};

export const CreateCurrency = createAsyncThunk(
  'CreateCurrency/Post',
  async ({ data, setShowModal, setFormdata }, thunkAPI) => {
    try {
      const response = await Create(data);
      thunkAPI.dispatch(setMessage('Currency Created Succesfully'));
      thunkAPI.dispatch(AllCurrency({ data }));

      setFormdata((s) => ({
        ...s,
        controls: {
          ...s.controls,
          country: '',
        },
      }));
      setShowModal(false);

      return response.data;
    } catch (error) {
      const message = ErrorHandler(error);

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const AllCurrency = createAsyncThunk('AllCurrency/GET', async ({ data }, thunkAPI) => {
  try {
    const response = await All();
    thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
  } catch (error) {
    const message = ErrorHandler(error);

    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
