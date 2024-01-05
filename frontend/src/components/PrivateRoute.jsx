import React from "react";
import { Outlet, Navigate } from "react-router-dom";
// An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route.
// Outlet is what we want to return if we're logged in, if there's a userit will put page or screen we're trying to load
// if we're not logged in then we're going to use the navigate component to basically just redirect us.
import { useSelector } from "react-redux";
// useSelector to find out if there's a user info piece of state present or not

const PrivateRoute = () => {
  // we want to get the info of user from auth state
  const { userInfo } = useSelector((state) => state.auth);

  /* replace at the end to replace any past history */

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
