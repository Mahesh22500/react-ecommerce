import React from 'react'
import Signup from '../features/auth/components/Signup'
import Navbar from '../features/navbar/Navbar'




const SignupPage = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gray-100'>
      {/* <Navbar></Navbar> */}
      <div className='border border-gray-200 border-2 h-[600px] w-[500px] mt-[20] bg-white'>
      <Signup></Signup>

      </div>
    </div>
  )
}

export default SignupPage

