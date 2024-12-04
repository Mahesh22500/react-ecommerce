import React, { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";

import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrdersAsync } from "../userSlice";

const UserOrders = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.loggedInUser);

  const userStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    // console.log("Inside useEffect", user.id);
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, []);

  const userOrders = useSelector((state) => state.user.userOrders);
  // console.log(userOrders);

  return (
    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
        {" "}
        User Orders
      </h1>
      {userStatus == "loading" ? (
        <div>
          <div className="flex items-center justify-center">
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      ) : null}
      {userOrders.length > 0 &&
        userOrders.map((userOrder) => (
          <div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h2 className="text-2xl my-5 font-bold tracking-tight text-gray-900">
                Order #{userOrder.id}
              </h2>

              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {userOrder.items.map((item) => (
                    <li key={item.product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          alt={item.product.imageAlt}
                          src={item.product.thumbnail}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.href}>
                                {item.product.name}
                              </a>
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
                              Qty : {item.quantity}
                            </label>
                          </div>

                          <div className="flex">
                            <div
                              //   onClick={() => handleRemoveItem(product.id)}

                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Status : {userOrder.orderStatus}
                            </div>
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
                {/* <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link> */}
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  {/* <Link to="/">
              <button
                type="button"
               
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link> */}
                </p>
              </div>
            </div>

            <div className="mx-4 md:mx-16">
              <div className="  px-2 text-white text-center h-10 py-2 bg-blue-400">
                Shipping Address
              </div>
              <li className="flex justify-between gap-x-6 px-20 py-5 border-solid border-2 border-gray-200">
                <div className="flex gap-x-4 ">
                  <div className="min-w-0 flex-auto">
                    <p className="text-md font-semibold leading-6 text-gray-900">
                      Name: {userOrder.address.name}
                    </p>
                    <p className="mt-1 truncate text-md leading-5 text-gray-500">
                      Street: {userOrder.address.street}
                    </p>
                    <p className="mt-1 truncate text-md leading-5 text-gray-500">
                      PinCode: {userOrder.address.pinCode}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex md:flex-col md:items-end">
                  <p className="text-md leading-6 text-gray-900">
                    Phone: {userOrder.address.phone}
                  </p>
                  <p className="text-md leading-6 text-gray-500">
                    City: {userOrder.address.city}
                  </p>

                  {/* <div className="flex mt-4">
                    <div
                      // onClick={() => handleRemove(idx)}
                      className="mx-2 cursor-pointer px-2 text-white bg-blue-400"
                    >
                      Delete
                    </div>
                    <div
                      // onClick={() => handleEditAddress(idx)}
                      className="px-2 cursor-pointer text-white bg-blue-400"
                    >
                      Edit
                    </div>
                  </div> */}
                </div>
              </li>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserOrders;
