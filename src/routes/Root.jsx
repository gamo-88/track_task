import React from 'react'
import { Outlet } from 'react-router-dom'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
import { userStore } from '../../manageStore'

export default function Root() {
    const USER = userStore((state) => state.USER)

  return (
    <div className='bg-[#84E1BC] min-h-[100vh] flex flex-col justify-between'>
    <Outlet />
    <footer className="bg-gray-800 text-white py-4">
  <div className="container mx-auto text-center">

    <div className="text-gray-400">
      © 2024 Gamo. Tract-task.
    </div>
  </div>
</footer>
    </div>
  )
}
