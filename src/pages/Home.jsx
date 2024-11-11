import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItemsByIdAsync } from "../features/cart/cartSlice";
import Navbar from "../features/navbar/Navbar";
import { ProductList } from "../features/product-list/components/ProductList";

const Home = () => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector(state=>state.user.loggedInUser)

  useEffect(() => {
    // console.log("Inside useEffect");
    dispatch(getItemsByIdAsync(loggedInUser.id));
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
