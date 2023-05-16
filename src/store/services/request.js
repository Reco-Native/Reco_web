import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../slice/messageSlice';
import { ErrorHandler } from '../../component/Notification/ErrorHandler';

const AllRequest = () => {
  return axios.get(`/v1/requests`);
};

const updateRequest = (data, id) => {
  return axios.put(`/v1/request/${id}`, data);
};

export const GetRequests = createAsyncThunk('GetRequests/GET', async ({ data }, thunkAPI) => {
  try {
    const response = await AllRequest();
    thunkAPI.dispatch(setMessage('Request Fetched Successful'));
    return response.data;
  } catch (error) {
    const message = ErrorHandler(error);

    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const UpdateRequest = createAsyncThunk(
  'UpdateRequest/PUT',
  async ({ data, id, setShowModal, setSelectedRowKeys }, thunkAPI) => {
    try {
      const response = await updateRequest(data, id);
      thunkAPI.dispatch(setMessage('Updated Successfully'));
      thunkAPI.dispatch(GetRequests({ data }));

      setSelectedRowKeys(null);
      setShowModal(false);

      return response.data;
    } catch (error) {
      const message = ErrorHandler(error);

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
