import { createSlice } from "@reduxjs/toolkit";

export const ComponentSlice = createSlice({
  name: "component",
  initialState: {
    navtoggle: false,
    token: ''
  },
  reducers: {
    setNavToggle: (state, action) => {
      state.navtoggle = action.payload;
    },
    getToken: (state, action) => {
      state.token = action.payload
    }
  },
  extraReducers: {},
});

export const { setNavToggle, getToken } = ComponentSlice.actions;
export default ComponentSlice.reducer;
