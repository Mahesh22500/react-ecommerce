import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItemsByIdAsync } from "../features/cart/cartSlice";
import Navbar from "../features/navbar/Navbar";
import { ProductList } from "../features/product-list/components/ProductList";
import { AdminProductList } from "./AdminProductList";
import { fetchLoggedInUserAsync } from "../features/user/userSlice";

const AdminHome = () => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector(state=>state.user.loggedInUser)

  useEffect(() => {
    // console.log("Inside useEffect");
    dispatch(fetchLoggedInUserAsync(loggedInUser.id))
    
  }, []);
  return (
    <div>
      <Navbar>
      </Navbar>
        <AdminProductList></AdminProductList>
    </div>
  );
};

export default AdminHome;
