import React from "react";
import Error from "./404_Error";
import Navbar from "../features/navbar/Navbar";

const ErrorPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Error></Error>
    </div>
  );
};

export default ErrorPage;
