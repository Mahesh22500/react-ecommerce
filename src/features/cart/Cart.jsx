import { useEffect } from "react";
import { ColorRing, RotatingLines } from "react-loader-spinner";

import { Navigate } from "react-router-dom";

import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCart, getItemsById } from "./cartApi";
import {
  deleteItemFromCartAsync,
  getItemsByIdAsync,
  updateItemInCartAsync,
} from "./cartSlice";

const Cart = () => {

  
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const items = useSelector((state) => state.cart.items);
  useEffect(()=>{

    
    
    dispatch(getItemsByIdAsync(loggedInUser.id));

  },[])

  const dispatch = useDispatch();

  const handleUpdateItem = (e, item) => {
    dispatch(
      updateItemInCartAsync({
        id: item.id,
        update: { quantity: e.target.value },
      })
    );
  };

  

  const itemsStatus = useSelector(state=>state.cart.status)

  // console.log("items in cart",items);


  const handleRemoveItem = (itemId) => {
    dispatch(deleteItemFromCartAsync(itemId));
  };

  return (
    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
          {" "}
          Cart
        </h1>
        

        <div className="flex items-center justify-center">


        {itemsStatus== 'loading' ? <div>
          <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />
                        
        </div> :null}

        </div>

        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {/* {!items.length && <Navigate to="/"></Navigate>} */}
            {items && items.map((item) => (
              <li key={item.product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.product.thumbnail}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={item.product.href}>{item.product.title}</a>
                      </h3>
                      <p className="ml-4">{item.product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.product.brand}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      <label
                        htmlFor="quantity"
                        className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                      >
                        Qty
                      </label>
                      <select
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(e, item)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>$262.00</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
