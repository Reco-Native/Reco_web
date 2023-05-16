import { createSlice } from '@reduxjs/toolkit';
import { GetAllUsers } from '../services/users';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    allusers: {},
    decodeUser: {}
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setEncoded: (state, action) => {
      state.decodeUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllUsers.pending, (state, action) => {
        state.isFetching = 'loading';
      })
      .addCase(GetAllUsers.fulfilled, (state, action) => {
        state.isFetching = 'succeeded';
        state.allusers = action.payload;
      })
      .addCase(GetAllUsers.rejected, (state, action) => {
        state.isFetching = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUser,setEncoded } = UserSlice.actions;
export default UserSlice.reducer;
