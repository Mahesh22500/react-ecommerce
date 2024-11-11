import { Link, Navigate } from "react-router-dom";

import { useState } from "react";

import CartPage from "./CartPage";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addAddressToUserAsync } from "../features/user/userSlice";
import { createOrderAsync } from "../features/orders/orderSlice";

function Checkout() {
  const items = useSelector((state) => state.cart.items);

  // console.log("items", items);

  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const addresses = loggedInUser.addresses;

  // // console.log("addresses length",addresses.length)

  const dispatch = useDispatch();

  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("cash");

  const handleSelectedAddress = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handleSelectedPayment = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleOrder = (e) => {
    // console.log("order placed");

    const products = items.map((item) => ({
      product: item.product.id,
      quantity: item.quantity,
    }));

    // console.log("products in handleOrder", products);
    const order = {
      items: products,
      address: addresses[selectedAddress],
      paymentMethod: selectedPayment,
      orderPlaced: false,
      orderStatus: "Pending",
      user: loggedInUser.id,
    };

    // console.log("selectedAddress", selectedAddress);

    if (selectedAddress >= 0 && selectedPayment)
      dispatch(createOrderAsync(order));
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddressForm = (data, e) => {
    e.target.reset();
    // console.log("add address clicked");

    // console.log("addresses in handleForm", addresses);

    const body = {
      addresses: [...addresses, data],
    };

    // console.log("body", body);

    dispatch(
      addAddressToUserAsync({
        userId: loggedInUser.id,
        addresses: body,
      })
    );
    // // console.log(data);
  };

  const currentOrder = useSelector((state) => state.order.currentOrder);

  if (currentOrder)
    return <Navigate to={`/order-success/${currentOrder.id}`}></Navigate>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3 ">
          <form
            onSubmit={handleSubmit(handleAddressForm)}
            action="#"
            method="POST"
            className="bg-white px-5 py-12 mt-12"
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("name")}
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone-no"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone no
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("phone")}
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("email")}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("streetAddress")}
                        type="text"
                        name="streetAddress"
                        id="streetAddress"
                        autoComplete="streetAddress"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("city")}
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("state")}
                        type="text"
                        name="state"
                        id="state"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pinCode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("pinCode")}
                        type="text"
                        name="pinCode"
                        id="pinCode"
                        autoComplete="pinCode"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  onClick={() => {
                    reset();
                  }}
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>
            </div>
          </form>

          <div className="border-b border-gray-900/10 pb-12">
            {addresses && addresses.length > 0 && (
              <>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Addresses
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose from Existing addresses
                </p>
              </>
            )}
            <ul role="list">
              {addresses &&
                addresses.length > 0 &&
                addresses.map((address, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                  >
                    <div className="flex gap-x-4">
                      <input
                        checked={idx == selectedAddress}
                        onClick={handleSelectedAddress}
                        name="address"
                        type="radio"
                        value={idx}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
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
                  </li>
                ))}
            </ul>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Payment Methods
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose One
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      checked={selectedPayment === "cash"}
                      onClick={handleSelectedPayment}
                      id="cash"
                      name="payments"
                      type="radio"
                      value="cash"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="cash"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Cash
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      checked={selectedPayment === "card"}
                      onClick={handleSelectedPayment}
                      id="card"
                      name="payments"
                      type="radio"
                      value="card"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="card"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Card Payment
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="mx-auto mt-12 bg-white max-w-7xl px-0 sm:px-0 lg:px-0">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                Cart
              </h1>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt="#"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.href}>
                                {item.product.title}
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
                              Qty
                            </label>
                            <select value={item.quantity}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                            </select>
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
                <button
                  onClick={handleOrder}
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Order Now
                </button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
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
        </div>
      </div>
    </div>
  );
}

export default Checkout;
