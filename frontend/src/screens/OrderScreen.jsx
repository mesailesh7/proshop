import { Link, useParams } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Image,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  console.log(order);

  return (
    <div>
      <h1>OrderScreen</h1>
    </div>
  );
};

export default OrderScreen;
