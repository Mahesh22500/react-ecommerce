import React, { useEffect, useState } from "react";
import { statusOptions } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  updateOrderAsync,
} from "../features/orders/orderSlice";
import { ColorRing, RotatingLines } from "react-loader-spinner";

const AdminOrders = () => {
  const dispatch = useDispatch();

  const [editIndex, setEditIndex] = useState(-1);

  const orders = useSelector((state) => state.order.orders);
  const ordersStatus  = useSelector(state=>state.order.status)

  const handleChangeStatus = (e) => {
    // console.log("status", e.target.value);

      dispatch(
      updateOrderAsync({
        id: orders[editIndex].id,
        update: {
          orderStatus: e.target.value,
        },
      })
    );

    setEditIndex(-1);
  };

  const handleEditOrder = (id) => {
    // console.log("edit order", id);
    setEditIndex(id);
  };

  useEffect(() => {
    dispatch(fetchAllOrdersAsync());
  }, []);

  function calcTotalAmount() {
    let totalAmount = 0;
    if (orders) {
      orders.map((order) =>
        order.items.forEach((item) => {
          totalAmount += item.product.price;
        })
      );

      return totalAmount;
    }
  }

  // console.log("orders", orders);

  return (
    <div className="relative overflow-x-auto">
      {ordersStatus == "loading" ? (
        <div className="flex items-center justify-center">
          <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />
                        
        </div>
      ) : null}

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Orders number
            </th>
            <th scope="col" className="px-6 py-3">
              items
            </th>

            <th scope="col" className="px-6 py-3">
              Shipping Address
            </th>
            <th scope="col" className="px-6 py-3">
              totalAmount
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, index) => (
              <>
                {" "}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.id}
                  </th>
                  <td className="px-6 py-4">
                    {order.items.map((item) => (
                      <img
                        key={item.product.id}
                        alt="#"
                        className="w-20 h-20"
                        src={item.product.thumbnail}
                      ></img>
                    ))}
                  </td>

                  <td className="px-6 py-4">
                    {" "}
                    <div>
                      <div>{order.address.name}</div>
                      <div>{order.address.streetAddress}</div>
                      <div>{order.address.city}</div>
                      <div>{order.address.pinCode}</div>
                      <div>{order.address.pinCode}</div>
                    </div>
                  </td>

                  <td className="px-6 py-4"> {calcTotalAmount()}</td>

                  <td className="px-6 py-4">
                    {editIndex !== -1 ? (
                      <select value = {order.orderStatus} onChange={handleChangeStatus}>
                        {statusOptions.map((status) => (
                          <option >{status}</option>
                        ))}{" "}
                      </select>
                    ) : (
                      order.orderStatus
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3  ">
                      <div className="flex  justify-center rounded-md bg-blue-600 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Details
                      </div>
                      <div
                        onClick={() => handleEditOrder(index)}
                        className="flex  justify-center rounded-md bg-red-600 px-1 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        Edit
                      </div>
                    </div>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
