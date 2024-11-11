import React from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  if (loggedInUser && loggedInUser.role === "admin") return children;
  else return <Navigate to="/login"></Navigate>;
};

export default AdminProtected;
 