import { useForm } from "react-hook-form";
import { clearEror, createUserAsync } from "../authSlice";

import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserAsync } from "../../user/userSlice";
import { RotatingLines } from "react-loader-spinner";
const Signup = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data) => {
    // console.log("form data", data);

    const userData = {
      email: data.email,
      password: data.password,
      addresses: [],
      role: "user",
    };

    dispatch(createUserAsync(userData));
  };

  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const loggedInStatus = useSelector(state=>state.auth.status)
  const errorMessage = useSelector(state=>state.auth.errorMessage)

  
  if (errorMessage) {
    setTimeout(() => {
      alert(errorMessage);
      dispatch(clearEror());
    }, 300);
  }

  if(errorMessage){
    alert(errorMessage);
  }

  if (loggedInUser) {
    dispatch(fetchLoggedInUserAsync(loggedInUser.id));
  }
 
  return (
    <div>
      
      {loggedInUser ? <Navigate to="/"></Navigate> : null}
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://i.pinimg.com/originals/41/ae/5e/41ae5ee27b597ca62c81e0b22054e9bd.jpg"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit(handleSignUp)}
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
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    {...register("password", {
                      required: {
                        value:true,
                        message:"Password is required"
                      },
                      minLength: {
                        value: 4,
                        message: "Password must contain minimum 8 characters",
                      },
                    })}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                
              {errors.password?.type === "minLength" && (
                <div role="alert" className="text-red-700">
                  {errors.password.message}
                </div>
              )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm password
                  </label>
                  <div className="text-sm">
                    
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    {...register("confirmPassword", {
                      required: {
                        value:true,
                        message:"confirm password is required"
                      },
                      
                    })}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                
              {errors.confirmPassword?.type === "minLength" && (
                <div role="alert" className="text-red-700">
                  {errors.confirmPassword.message}
                </div>
              )}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
