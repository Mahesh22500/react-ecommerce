import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddressToUserAsync,
  fetchLoggedInUserOrdersAsync,
  loginUser,
  updateUserAsync,
} from "../userSlice";
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [updateEnabled, setUpdateEnabled] = useState(false);
  const [addEnabled, setAddEnabled] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);

  const user = useSelector((state) => state.user.loggedInUser);

  const handleAddressForm = (data, e, idx) => {
    e.target.reset();
    // console.log("add address clicked");

    // console.log("addresses in handleForm", userAddresses);

    let addressesNew;

    if (updateEnabled) {
      addressesNew = [...userAddresses];
      addressesNew[updateIndex] = data;
    } else {
      addressesNew = [...userAddresses, data];
    }

    // console.log("body", addressesNew);

    dispatch(
      updateUserAsync({
        id: user.id,
        update: {
          addresses: addressesNew,
        },
      })
    );

    if (updateEnabled) {
      setUpdateEnabled(false);
      setUpdateIndex(null);
    } else {
      setAddEnabled(false);
    }
    // // console.log(data);
  };

  // console.log("user", user);

  const userAddresses = user.addresses;

  const dispatch = useDispatch();

  const handleRemove = (idx) => {
    const newAddresses = userAddresses.filter((address, id) => id !== idx);
    // // console.log("updateUser", updateUser);
    dispatch(
      updateUserAsync({
        id: user.id,
        update: {
          addresses: newAddresses,
        },
      })
    );
  };

  const handleEditAddress = (idx) => {
    setAddEnabled(false);
    // console.log("edit button clicked", idx);
    setUpdateEnabled(true);
    setUpdateIndex(idx);
    // setValue("name","Mahesh");
    for (let key in userAddresses[idx]) {
      // // console.log("key",key);
      // // console.log("value",userAddresses[idx][key])
      setValue(key, userAddresses[idx][key]);
    }
  };

  const handleAddAddress = () => {
    setUpdateEnabled(false);
    setUpdateIndex(null);
    setAddEnabled(true);
    reset();
  };

  return (
    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
        {" "}
        User Profile
      </h1>
      <h1 className="text-2xl  my-5 font-bold tracking-tight text-gray-900">
        {" "}
        Email : {user.email}
      </h1>
      <h1 className="text-2xl my-5 font-bold tracking-tight text-gray-900">
        {" "}
        {user.role === "admin" ? `Role : ${user.role}` : ""}
      </h1>

      <div className="border-b border-gray-900/10 pb-12">
        {userAddresses && userAddresses.length > 0 && (
          <>
            {(updateEnabled || addEnabled) && (
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
                      {updateEnabled ? "Update Address " : "Add Address"}
                    </button>
                    <button
                      onClick={() => {
                        setAddEnabled(false);
                        setUpdateEnabled(false);
                        setUpdateIndex(null);
                      }}
                      type="button"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="flex justify-between my-5">
              <div className="text-base font-semibold leading-7 text-gray-900">
                Shipping Addresses
              </div>
              <div
                onClick={handleAddAddress}
                className="mx-2 cursor-pointer px-2 text-white bg-blue-400"
              >
                Add New Address
              </div>
            </div>
          </>
        )}
        <ul role="list">
          {userAddresses &&
            userAddresses.length > 0 &&
            userAddresses.map((address, idx) => (
              <li
                key={idx}
                className="flex justify-between gap-x-6 px-20 py-5 border-solid border-2 border-gray-200"
              >
                <div className="flex gap-x-4 ">
                  <div className="min-w-0 flex-auto">
                    <p className="text-md font-semibold leading-6 text-gray-900">
                      Name: {address.name}
                    </p>
                    <p className="mt-1 truncate text-md leading-5 text-gray-500">
                      Street: {address.street}
                    </p>
                    <p className="mt-1 truncate text-md leading-5 text-gray-500">
                      PinCode: {address.pinCode}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex md:flex-col md:items-end">
                  <p className="text-md leading-6 text-gray-900">
                    Phone: {address.phone}
                  </p>
                  <p className="text-md leading-6 text-gray-500">
                    City: {address.city}
                  </p>
                  <div className="flex mt-4">
                    <div
                      onClick={() => handleRemove(idx)}
                      className="mx-2 cursor-pointer px-2 text-white bg-blue-400"
                    >
                      Delete
                    </div>
                    <div
                      onClick={() => handleEditAddress(idx)}
                      className="px-2 cursor-pointer text-white bg-blue-400"
                    >
                      Edit
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
