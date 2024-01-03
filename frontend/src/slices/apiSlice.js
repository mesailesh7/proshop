// // Creating a slice
// // a function that accepts a "slice name" and innitial state and an object of reducer functions for example addUser(state,action) {} removerUser(state,action) {}
// // and automatically generates action creators and action types that correspond to the reducers and state.
// //  Think of it like a pizza....different slices but it is still linked to the whole pizza
// //
// //

// // we could have used createSlice aso async data but right now we are dealing with api so we are using createApi
// import { createSlice } from "@reduxjs/toolkit";
// import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// const initialState = {
//   userInfo: localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.userInfo = action.payload;
//       localStorage.setItem("userInfo", JSON.stringify(action.payload));
//     },
//     logout: (state, action) => {
//       state.userInfo = null;
//       // NOTE: here we need to also remove the cart from storage so the next
//       // logged in user doesn't inherit the previous users cart and shipping
//       localStorage.clear();
//     },
//   },
// });

// export const apiSlice = createApi({
//   baseQuery: baseQueryWithAuth, // Use the customized baseQuery
//   tagTypes: ['Product', 'Order', 'User'],
//   endpoints: (builder) => ({}),
// });

// export const { setCredentials, logout } = authSlice.actions;

// export default authSlice.reducer;

import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

import { logout } from "./authSlice"; // Import the logout action

// NOTE: code here has changed to handle when our JWT and Cookie expire.
// We need to customize the baseQuery to be able to intercept any 401 responses
// and log the user out
// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-queries-with-basequery

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

async function baseQueryWithAuth(args, api, extra) {
  const result = await baseQuery(args, api, extra);
  // Dispatch the logout action on 401.
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth, // Use the customized baseQuery
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
