import React from 'react'
import Navbar from '../features/navbar/Navbar'
import Logout from '../features/auth/components/Logout'

const LogOutPage = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Logout></Logout>
    </div>
  )
}

export default LogOutPage