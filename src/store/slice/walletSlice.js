import { createSlice } from '@reduxjs/toolkit';
import {
  GetAllWallets,
  GetUserwallet,
  GetWalletTransaction,
  AddFund,
  GetWalletTransactionStatus,
  userWalletTransaction,
  userTransactionByStatus,
} from '../services/wallet';

export const walletSlice = createSlice({
  name: 'walletSlice',
  initialState: {
    allwithdraws: {},
    userWallet: {},
    walletTransactionHistory: [],
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
      })

      .addCase(GetWalletTransaction.pending, (state, action) => {
        state.gettingHistory = 'loading';
      })
      .addCase(GetWalletTransaction.fulfilled, (state, action) => {
        state.gettingHistory = 'succeeded';
        state.walletTransactionHistory = action.payload;
      })
      .addCase(GetWalletTransaction.rejected, (state, action) => {
        state.gettingHistory = 'failed';
        state.error = action.error.message;
      })

      .addCase(AddFund.pending, (state, action) => {
        state.addingfund = 'loading';
      })
      .addCase(AddFund.fulfilled, (state, action) => {
        state.addingfund = 'succeeded';
      })
      .addCase(AddFund.rejected, (state, action) => {
        state.addingfund = 'failed';
        state.error = action.error.message;
      })

      .addCase(GetWalletTransactionStatus.pending, (state, action) => {
        state.gettingHistory = 'loading';
      })
      .addCase(GetWalletTransactionStatus.fulfilled, (state, action) => {
        state.gettingHistory = 'succeeded';
        state.walletTransactionHistory = action.payload;
      })
      .addCase(GetWalletTransactionStatus.rejected, (state, action) => {
        state.gettingHistory = 'failed';
        state.error = action.error.message;
      })

      .addCase(userWalletTransaction.pending, (state, action) => {
        state.gettingHistory = 'loading';
      })
      .addCase(userWalletTransaction.fulfilled, (state, action) => {
        state.gettingHistory = 'succeeded';
        state.walletTransactionHistory = action.payload;
      })
      .addCase(userWalletTransaction.rejected, (state, action) => {
        state.gettingHistory = 'failed';
        state.error = action.error.message;
      })

      .addCase(userTransactionByStatus.pending, (state, action) => {
        state.gettingHistory = 'loading';
      })
      .addCase(userTransactionByStatus.fulfilled, (state, action) => {
        state.gettingHistory = 'succeeded';
        state.walletTransactionHistory = action.payload;
      })
      .addCase(userTransactionByStatus.rejected, (state, action) => {
        state.gettingHistory = 'failed';
        state.error = action.error.message;
      });
  },
});

export default walletSlice.reducer;
