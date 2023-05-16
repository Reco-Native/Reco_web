import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../slice/messageSlice';
import { ErrorHandler } from '../../component/Notification/ErrorHandler';

const CreateCategory = (data) => {
  return axios.post(`/v1/category`, data);
};

const AllCategories = () => {
  return axios.get(`/v1/category`);
};

export const PostCategory = createAsyncThunk(
  'PostCategory/Post',
  async ({ data, setShowModal, setFormdata }, thunkAPI) => {
    try {
      const response = await CreateCategory(data);
      thunkAPI.dispatch(setMessage('Category Created Succesfully'));
      thunkAPI.dispatch(GetCategories({ data }));

      setFormdata((s) => ({
        ...s,
        controls: {
          ...s.controls,
          category: '',
          categoryName: '',
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

export const GetCategories = createAsyncThunk('GetCategories/GET', async ({ data }, thunkAPI) => {
  try {
    const response = await AllCategories();
    thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
  } catch (error) {
    const message = ErrorHandler(error);

    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
