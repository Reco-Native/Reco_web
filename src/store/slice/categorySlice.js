import { createSlice } from "@reduxjs/toolkit";
import { PostCategory, GetCategories } from "../services/category";

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    createdCategories: {},
    isGetting: "",
    categories: {},
    isPosting: ''
  },
  reducers: {
    setClearLogin: (state) => {
      state.user = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(PostCategory.pending, (state, action) => {
        state.isPosting = "loading";
      })
      .addCase(PostCategory.fulfilled, (state, action) => {
        state.isPosting = "succeeded";
        state.createdCategories = action.payload;
      })
      .addCase(PostCategory.rejected, (state, action) => {
        state.isPosting = "failed";
        state.error = action.error.message;
      })
      .addCase(GetCategories.pending, (state, action) => {
        state.isGetting = "loading";
      })
      .addCase(GetCategories.fulfilled, (state, action) => {
        state.isGetting = "succeeded";
        state.categories = action.payload;
        state.isGetting = "";
      })
      .addCase(GetCategories.rejected, (state, action) => {
        state.isGetting = "failed";
        state.error = action.error.message;
        state.isGetting = "";
      });
  },
});

const { reducer } = categorySlice;
// export const {  } = actions;
export default reducer;
