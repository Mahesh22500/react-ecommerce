import { store } from "./app/store.js";
import ProductFormPage from "./pages/ProductFormPage.jsx";
import ProductForm from "./pages/ProductForm.jsx";

import { Provider } from "react-redux";
import "./App.css";

import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";

import ProductDetailPage from "./pages/ProductDetailPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Protected from "./pages/Protected.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import OrderPlacedSuccessPage from "./pages/OrderPlacedSuccessPage.jsx";

import UserOrdersPage from "./pages/UserOrdersPage.jsx";
import CheckOutPage from "./pages/CheckOutPage.jsx";
import UserProfile from "./features/user/components/UserProfile.jsx";
import Logout from "./features/auth/components/Logout.jsx";
import LogOutPage from "./pages/LogOutPage.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminProtected from "./pages/AdminProtected.jsx";
import AdminProductDetail from "./pages/AdminProductDetail.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import AdminOrdersPage from "./pages/AdminOrdersPage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminProtected>
        <AdminHome></AdminHome>
      </AdminProtected>
    ),
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckOutPage></CheckOutPage>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "admin/product-detail/:id",
    element: (
      <AdminProtected>
        <AdminProductDetail></AdminProductDetail>
      </AdminProtected>
    ),
  },
  {
    path: "/pay",
    element: (
      <Protected>
        <PaymentPage></PaymentPage>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderPlacedSuccessPage></OrderPlacedSuccessPage>
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <LogOutPage></LogOutPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <AdminProtected>
        <ProductFormPage></ProductFormPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-form/add",
    element: (
      <AdminProtected>
        <ProductFormPage></ProductFormPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <AdminProtected>
        <AdminOrdersPage></AdminOrdersPage>
      </AdminProtected>
    ),
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
