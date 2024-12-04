import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { resetCart } from "../features/orders/orderSlice";

export default function OrderPlacedSuccess() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    // console.log("Inside useEffect orderplaced success")
    dispatch(resetCartAsync(user.id));
    dispatch(resetCart());
  }, []);

  const {id} = useParams();

  return (
    <>
      {/*
          This example requires updating your template:
  
          <html class="h-full">
          <body class="h-full">
          ```
        */}

        <div className="flex items-center justify-center">
          
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Hurray!</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            #{id}
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Order has been placed successfully
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
        </div>
    </>
  );
}
