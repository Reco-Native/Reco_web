import { createSlice } from '@reduxjs/toolkit';
import { GetAllWallets, GetUserwallet } from '../services/wallet';

export const walletSlice = createSlice({
  name: 'walletSlice',
  initialState: {
    allwithdraws: {},
    userWallet: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllWallets.pending, (state, action) => {
        state.isFetching = 'loading';
      })
      .addCase(GetAllWallets.fulfilled, (state, action) => {
        state.isFetching = 'succeeded';
        state.allwithdraws = action.payload;
      })
      .addCase(GetAllWallets.rejected, (state, action) => {
        state.isFetching = 'failed';
        state.error = action.error.message;
      })
      .addCase(GetUserwallet.pending, (state, action) => {
        state.fetching = 'loading';
      })
      .addCase(GetUserwallet.fulfilled, (state, action) => {
        state.fetching = 'succeeded';
        state.userWallet = action.payload;
      })
      .addCase(GetUserwallet.rejected, (state, action) => {
        state.fetching = 'failed';
        state.error = action.error.message;
      });
  },
});

export default walletSlice.reducer;
