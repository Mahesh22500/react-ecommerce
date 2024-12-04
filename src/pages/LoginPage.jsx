import React from 'react'
import Navbar from '../features/navbar/Navbar.jsx'
import Login  from "../features/auth/components/Login.jsx"



const LoginPage = () => {
  return (
    <div>
    {/* <Navbar></Navbar> */}

    <div className='h-screen flex flex-col items-center justify-center bg-gray-100'>
      {/* <Navbar></Navbar> */}
      <div className='border border-gray-200 border-2  h-[70%] w-[80%]  md:w-[40%] lg:w-[30%] mt-[20] bg-white'>
      <Login></Login>

      </div>
    </div>
    </div>
  )
}

export default LoginPage

