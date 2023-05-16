import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../slice/messageSlice';
import { ErrorHandler } from '../../component/Notification/ErrorHandler';

const CreateCard = (data) => {
  return axios.post(`/v1/card`, data);
};

const AllCards = () => {
  return axios.get(`/v1/cards`);
};

const deleteCard = (id) => {
  return axios.delete(`/v1/card/${id}`);
};
export const CreateGiftCard = createAsyncThunk(
  'CreateGiftCard/Post',
  async ({ data, setShowModal, setFormdata }, thunkAPI) => {
    try {
      const response = await CreateCard(data);
      thunkAPI.dispatch(setMessage('GiftCard Created Succesfully'));
      thunkAPI.dispatch(GetCards({ data }));

      setFormdata((s) => ({
        ...s,
        controls: {
          controls: {
            name: '',
            email: '',
            password: '',
            cardName: '',
            category: {},
            Cardamount: '',
            image: '',
            country: {},
          },
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

export const GetCards = createAsyncThunk('AllCurrency/GET', async ({ data }, thunkAPI) => {
  try {
    const response = await AllCards();
    thunkAPI.dispatch(setMessage('Fetched Successful'));
    return response.data;
  } catch (error) {
    const message = ErrorHandler(error);

    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const DeleteCard = createAsyncThunk('DeleteCard/Delete', async ({ data }, thunkAPI) => {
  try {
    const response = await deleteCard(data);
    thunkAPI.dispatch(setMessage('Card Deleted Successfully'));
    thunkAPI.dispatch(GetCards({ data }));

    return response.data;
  } catch (error) {
    const message = ErrorHandler(error);

    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
