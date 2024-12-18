import React, { useEffect, useState } from "react";
import { ColorRing, RotatingLines } from "react-loader-spinner";

import { Navigate } from "react-router-dom";

import { clearEror, loginUserAsync } from "../authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchLoggedInUserAsync, loginUser } from "../../user/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log("errors", errors);

  // if(errors){
  //   setError(errors);
  // }

  const handleLogin = (loginData) => {
    console.log("loginData", loginData);
    dispatch(loginUserAsync(loginData));

    // // console.log("After login");
  };

  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  const loggedInStatus = useSelector((state) => state.auth.status);

  const errorMessage = useSelector((state) => state.auth.errorMessage);

  if (errorMessage) {
    setTimeout(() => {
      alert(errorMessage);
      dispatch(clearEror());
    }, 300);
  }

  if (loggedInUser) {
    dispatch(fetchLoggedInUserAsync(loggedInUser.id));
  }
  console.log("loggedInUser", loggedInUser);

  return (
    <div>
      <div className="flex items-center justify-center ">
      {loggedInStatus == "loading" ? (
        <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      ) : null}
      </div>
      {loggedInUser ? <Navigate to="/"></Navigate> : null}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={`https://tailwindui.com/plus/img/logos/mark.svg?color=black &shade=1000`}
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(handleLogin)}
            action="#"
            method="POST"
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("email", {
                    required: { value: true, message: "Email is required" },

                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                      message: "Invalid email",
                    },
                  })}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="admin@xyz"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                />
              </div>

              {errors.email?.type === "required" && (
                <div role="alert" className="text-red-700">
                  {errors.email.message}
                </div>
              )}

              {errors.email?.type === "pattern" && (
                <div role="alert" className="text-red-700">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-black-600 hover:text-black-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 4,
                      message: "Password must contain minimum 4 characters",
                    },
                    message: "password is required",
                  })}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                />
              </div>

              {errors.password?.type === "minLength" && (
                <div role="alert" className="text-red-700">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-black-600 hover:text-black-500"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
