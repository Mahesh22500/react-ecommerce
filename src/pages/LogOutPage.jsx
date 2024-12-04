import React from "react";
import Navbar from "../features/navbar/Navbar";
import Logout from "../features/auth/components/Logout";

const LogOutPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center ">
        <div className="  h-[70%] w-[70%]  md:w-[40%] lg:w-[30%]">
          <Logout></Logout>
        </div>
      </div>
    </div>
  );
};

export default LogOutPage;
