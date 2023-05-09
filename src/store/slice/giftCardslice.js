import { createSlice } from '@reduxjs/toolkit';
import { GetCards, CreateGiftCard, DeleteCard } from '../services/giftCard';

export const giftCardSlice = createSlice({
  name: 'giftCardSlice',
  initialState: {
    createdCard: {},
    isGetting: '',
    giftcards: {},
    isCreating: '',
    deleteCards: {},
    isdeleting: '',
  },
  reducers: {
    setClearLogin: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateGiftCard.pending, (state, action) => {
        state.isCreating = 'loading';
      })
      .addCase(CreateGiftCard.fulfilled, (state, action) => {
        state.isCreating = 'succeeded';
        state.createdCategories = action.payload;
      })
      .addCase(CreateGiftCard.rejected, (state, action) => {
        state.isCreating = 'failed';
        state.error = action.error.message;
      })
      .addCase(GetCards.pending, (state, action) => {
        state.isGetting = 'loading';
      })
      .addCase(GetCards.fulfilled, (state, action) => {
        state.isGetting = 'succeeded';
        state.giftcards = action.payload;
        state.isGetting = '';
      })
      .addCase(GetCards.rejected, (state, action) => {
        state.isGetting = 'failed';
        state.error = action.error.message;
        state.isGetting = '';
      })
      .addCase(DeleteCard.pending, (state, action) => {
        state.isGetting = 'loading';
      })
      .addCase(DeleteCard.fulfilled, (state, action) => {
        state.isGetting = 'succeeded';
        state.deleteCards = action.payload;
        state.isGetting = '';
      })
      .addCase(DeleteCard.rejected, (state, action) => {
        state.isGetting = 'failed';
        state.error = action.error.message;
        state.isGetting = '';
      });
  },
});

const { reducer } = giftCardSlice;
// export const {  } = actions;
export default reducer;
