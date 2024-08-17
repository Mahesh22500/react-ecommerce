
import './App.css';
import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetail from './features/product-list/components/ProductDetail';
import ProductDetailPage from './pages/ProductDetailPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home></Home>),
  },
  {
    path: "/signup",
    element: (<SignupPage></SignupPage>),
  },
  {
    path: "/login",
    element: (<LoginPage></LoginPage>),
  },
  {
    path:"/cart",
    element:(<CartPage></CartPage>)
  },
  {
    path:"/checkout",
    element:(<Checkout></Checkout>)
  },
  {
    path:"/product-detail",
    element:(<ProductDetailPage></ProductDetailPage>)
  },
]);

function App() {
  return (
    <>

<RouterProvider router={router} />


    </>
    
  );
}

export default App;
