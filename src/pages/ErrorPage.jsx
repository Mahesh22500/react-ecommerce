import React from "react";
import Error from "./404_Error";
import Navbar from "../features/navbar/Navbar";
import { useSelector } from "react-redux";

const ErrorPage = () => {
  const user = useSelector(state=>state.auth.loggedInUser);
  return (
    <div>

      { user ? <Navbar></Navbar>: null}
      <Error></Error>
    </div>
  );
};

export default ErrorPage;
