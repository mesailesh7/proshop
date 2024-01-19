import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table stripped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
            </tr>
          </thead>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
