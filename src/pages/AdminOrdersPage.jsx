import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminOrders from './AdminOrders'

const AdminOrdersPage = () => {
  return (
    <div>
        <Navbar></Navbar>
        <AdminOrders></AdminOrders>
    </div>
  )
}

export default AdminOrdersPage