import React from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  if (loggedInUser) return children;
  else return <Navigate to="/login"></Navigate>;
};

export default Protected;
