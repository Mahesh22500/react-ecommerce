import React from 'react'
import Navbar from '../features/navbar/Navbar'
import Logout from '../features/auth/components/Logout'

const LogOutPage = () => {
  return (
    <div>
        <Navbar>
        
        </Navbar>
        <div className='flex items-center justify-center '>
          
        <div className=' w-[500px] h-[400px]'>
          
        <Logout></Logout>
        </div>

        </div>
    </div>
  )
}

export default LogOutPage