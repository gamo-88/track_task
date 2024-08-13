import React from 'react'
import { Outlet } from 'react-router-dom'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
import { userStore } from '../../manageStore'
import { Button, Label, TextInput, Banner } from "flowbite-react";


export default function Root() {
    const USER = userStore((state) => state.USER)

  return (
    <div className='bg-[#84E1BC] min-h-[100vh] flex flex-col justify-between'>
            <Banner>
      <div className="flex w-[calc(100%-2rem)] flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row lg:max-w-7xl">
        <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
          <span
            className="mb-2 flex items-center border-gray-200 dark:border-gray-600 md:mb-0 md:mr-4 md:border-r md:pr-4"
          >
            <img src="/images/favicon.ico" className="mr-2 h-6" alt="Flowbite Logo" />
            <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white md:pr-6">
              Track-task
            </span>
          </span>
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            Welcome to Track-task. Sign Up to follow.
          </p>
        </div>
        <div className="flex shrink-0 items-center">
        <span className="mr-1">Go to</span><Button to="/signIn" >Sign In</Button>

        </div>
      </div>
    </Banner>
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
