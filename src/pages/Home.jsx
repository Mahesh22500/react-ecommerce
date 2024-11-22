import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItemsByIdAsync } from "../features/cart/cartSlice";
import Navbar from "../features/navbar/Navbar";
import { ProductList } from "../features/product-list/components/ProductList";
import { fetchLoggedInUser } from "../features/user/userApi";
import { fetchLoggedInUserAsync } from "../features/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector(state=>state.auth.loggedInUser)
  console.log("loggedInUser ",loggedInUser)

  useEffect(() => {
    // console.log("Inside useEffect");
    dispatch(fetchLoggedInUserAsync(loggedInUser.id))
  }, []);
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
    </div>
  );
};

export default Home;
