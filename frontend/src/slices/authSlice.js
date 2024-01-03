import { createSlice } from "@reduxjs/toolkit";

// initial state is that start stage of the data and it's and object
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth", //name
  initialState, //
  reducers: {
    setCredientials: (state, action) => {
      state.userInfo = action.payload; //
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredientials, logout } = authSlice.actions; // exporting the actions

export default authSlice.reducer; // exporting the reducer
