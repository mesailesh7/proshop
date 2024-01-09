import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

// we are injecting it in apiSlice which is connected to our store right here
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL, // /api/order
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`, // /api/order/:orderId
      }),
      keepUnusedDataFor: 5, // keep data for 5 seconds
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
  orderApiSlice;
