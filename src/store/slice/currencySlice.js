import { createSlice } from "@reduxjs/toolkit";
import { CreateCurrency, AllCurrency } from "../services/currency";

export const currencySlice = createSlice({
  name: "currencySlice",
  initialState: {
    createdCurrency: {},
    isCreating: "",
    currencies: {},
    isFetching: ''
  },
  reducers: {
    setClearLogin: (state) => {
      state.user = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateCurrency.pending, (state, action) => {
        state.isCreating = "loading";
      })
      .addCase(CreateCurrency.fulfilled, (state, action) => {
        state.isCreating = "succeeded";
        state.createdCurrency = action.payload;
        state.isCreating = "";
      })
      .addCase(CreateCurrency.rejected, (state, action) => {
        state.isCreating = "failed";
        state.error = action.error.message;
        state.isCreating = "";
      })
      .addCase(AllCurrency.pending, (state, action) => {
        state.isFetching = "loading";
      })
      .addCase(AllCurrency.fulfilled, (state, action) => {
        state.isFetching = "succeeded";
        state.currencies = action.payload;
        state.isFetching = "";
      })
      .addCase(AllCurrency.rejected, (state, action) => {
        state.isFetching = "failed";
        state.error = action.error.message;
        state.isFetching = "";
      });
  },
});

const { reducer } = currencySlice;
// export const {  } = actions;
export default reducer;
