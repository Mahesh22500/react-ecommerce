import React from "react";
import { useDispatch } from "react-redux";
import { getItemsByIdAsync } from "../features/cart/cartSlice";
import { deleteItemFromCartAsync } from "../features/cart/cartSlice";
import { updateItemInCartAsync } from "../features/cart/cartSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CartPage from "./CartPage";
import { useSelector } from "react-redux";

const PaymentPage = () => {
  const address = {
    name: "John wick",
    street: "11th Main",
    city: "Delhi",
    pinCode: 110001,
    state: "Delhi",
    phone: 12312321331,
  };


  const products = useSelector(state=>state.cart.items)


  
  return (
    <>

    <div className = "flex justify-center w-full h-screen items-center">
    <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.thumbnail}
                          alt="#"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={product.href}>{product.name}</a>
                            </h3>
                            <p className="ml-4">{product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
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
                            <select>
                              <option value="1">1</option>
                              <option value="2">2</option>
                            </select>
                          </div>

                          <div className="flex">
                         
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                <Link
                  to="/payment"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
              Payment
                </Link>

                <div className="flex mt-6 gap-x-4">
                 
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {address.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {address.city}
                    </p>
                  </div>
              </div>
              </div>
    </div>
    </>
  );
};

export default PaymentPage;
