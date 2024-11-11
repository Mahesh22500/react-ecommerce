import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logOut } from "../authSlice";


export default function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const user = useSelector(state=>state.auth.loggedInUser);

  if(!user)
    return <Navigate to ="/login"></Navigate>

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Do you want to log out ?
          </p>

          <div className="mt-2 flex flex-col items-center justify-center gap-x-6">
            <div
              onClick={handleLogout}
              className="my-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log out
            </div>

            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
