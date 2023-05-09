import { createSlice } from '@reduxjs/toolkit';
import { GetTransactions, UpdateTransaction } from '../services/transaction';

export const transactionSlice = createSlice({
  name: 'transactionSlice',
  initialState: {
    transactions: {},
    isGetting: '',
    updatingTans: {},
  },
  reducers: {
    setClearLogin: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetTransactions.pending, (state, action) => {
        state.isPosting = 'loading';
      })
      .addCase(GetTransactions.fulfilled, (state, action) => {
        state.isPosting = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(GetTransactions.rejected, (state, action) => {
        state.isPosting = 'failed';
        state.error = action.error.message;
      })
      .addCase(UpdateTransaction.pending, (state, action) => {
        state.isUpdating = 'loading';
      })
      .addCase(UpdateTransaction.fulfilled, (state, action) => {
        state.isUpdating = 'succeeded';
        state.updatingTans = action.payload;
      })
      .addCase(UpdateTransaction.rejected, (state, action) => {
        state.isUpdating = 'failed';
        state.error = action.error.message;
      });
  },
});

const { reducer } = transactionSlice;
// export const {  } = actions;
export default reducer;
