import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrdersAsync } from "../userSlice";

const UserOrders = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.loggedInUser);

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
   {
    userOrders.length > 0 && userOrders.map(userOrder=>(
        <div>
               <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      
        
               <h2 className="text-2xl my-5 font-bold tracking-tight text-gray-900">
        
          Order #{userOrder.id}
        </h2>
                
        <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
       
          {
              userOrder.items.map((item) => (
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
                          <a href={item.product.href}>{item.product.name}</a>
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
              ))
            }
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

        <div className="mx-16">
        <h2>
                  Shipping Address
                </h2>
        <div className="mt-4 flex gap-x-4">
                    {/* <input
                      checked={idx == selectedAddress}
                      onClick={handleSelectedAddress}
                      name="address"
                      type="radio"
                      value={idx}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    /> */}
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Name:
                        {userOrder.address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        Street:
                        {userOrder.address.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        PinCode: 
                        {userOrder.address.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {userOrder.address.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                        City:
                      {userOrder.address.city}
                    </p>
                  </div>
            </div>

            </div>
    )
)
   }


    </div>
  );
};

export default UserOrders;