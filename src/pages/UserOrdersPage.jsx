import React from 'react'
import UserOrders from '../features/user/components/UserOrders'
import Navbar from '../features/navbar/Navbar'

const UserOrdersPage = () => {
  return (
    <div>
        <Navbar></Navbar>
        <UserOrders></UserOrders>
    </div>
  )
}

export default UserOrdersPage