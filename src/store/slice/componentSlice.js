import { createSlice } from "@reduxjs/toolkit";

export const ComponentSlice = createSlice({
  name: "component",
  initialState: {
    navtoggle: false,
  },
  reducers: {
    setNavToggle: (state, action) => {
      state.navtoggle = action.payload;
    },
  },
  extraReducers: {},
});

export const { setNavToggle } = ComponentSlice.actions;
export default ComponentSlice.reducer;
