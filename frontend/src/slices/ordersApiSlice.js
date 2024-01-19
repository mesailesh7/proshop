// import { apiSlice } from "./apiSlice";
// import { ORDERS_URL } from "../constants";

// // we are injecting it in apiSlice which is connected to our store right here
// export const orderApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     createOrder: builder.mutation({
//       query: (order) => ({
//         url: ORDERS_URL, // /api/order
//         method: "POST",
//         body: order,
//       }),
//     }),
//     getOrderDetails: builder.query({
//       query: (orderId) => ({
//         url: `${ORDERS_URL}/${orderId}`, // /api/order/:orderId
//       }),
//       keepUnusedDataFor: 5, // keep data for 5 seconds
//     }),
//   }),
// });

// export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
//   orderApiSlice;

import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`, //its coming from backend/route/orderRoutes.js
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
} = ordersApiSlice;
