import { createSlice } from "@reduxjs/toolkit";

// initial state is that start stage of the data and it's and object
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
// This of for the local stuff like in the front end part in redux and react
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
      // NOTE: here we need to also remove the cart from storage so the next
      // logged in user doesn't inherit the previous users cart and shipping
      localStorage.clear();
      // localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredientials, logout } = authSlice.actions; // exporting the actions

export default authSlice.reducer; // exporting the reducer
