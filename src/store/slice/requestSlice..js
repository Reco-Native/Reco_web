import { createSlice } from '@reduxjs/toolkit';
import { GetRequests, UpdateRequest } from '../services/request';

export const requestSlice = createSlice({
  name: 'requestSlice',
  initialState: {
    allrequest: {},
    isGetting: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetRequests.pending, (state, action) => {
        state.isGetting = 'loading';
      })
      .addCase(GetRequests.fulfilled, (state, action) => {
        state.isGetting = 'succeeded';
        state.allrequest = action.payload;
      })
      .addCase(GetRequests.rejected, (state, action) => {
        state.isGetting = 'failed';
        state.error = action.error.message;
      })
      .addCase(UpdateRequest.pending, (state, action) => {
        state.isUpating = 'loading';
      })
      .addCase(UpdateRequest.fulfilled, (state, action) => {
        state.isUpating = 'succeeded';
      })
      .addCase(UpdateRequest.rejected, (state, action) => {
        state.isUpating = 'failed';
        state.error = action.error.message;
      });
  },
});

const { reducer } = requestSlice;
// export const {  } = actions;
export default reducer;
