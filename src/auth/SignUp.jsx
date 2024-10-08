import React, { useState } from 'react'
"use client";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

import { Button, Label, TextInput, Banner } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/SuperbaseClient';
import { userStore } from '../../manageStore';
import { toast, Toaster } from 'sonner';

export default function SignUp() {
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate()


    const updateUser = userStore((state) => state.updateUser)

    const validation = ()=>{
      if(password.trim().length < 6){
        setPasswordError("At least 6 chars")
        return 0
      }
      if(name.trim().length < 3){
        setNameError("At least 3 chars")
        return 0
      }
      return 1
    }



    const handleSignUp = async (e)=>{
      e.preventDefault()
if (validation()) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,  // Store the user's display name
      }
    }
  })
if (data) {
  updateUser(data.user)
  navigate("/task")
  toast.success("ACCOUNT, SUCESSFULY CREATED")
}
if (error) {
  toast.error(error.message)
}
}
          
    }

  return (
    <div className=' h-svh flex flex-col items-center px-3    bg-green-50'>
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
        <span className="mr-1">Go to</span><Link to="/signIn" className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75' >Sign In</Link>

        </div>
      </div>
    </Banner>
        



    <form className="flex flex-col items-center gap-4 pt-14 px-10" onSubmit={handleSignUp}>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your name" />
        </div>
        <TextInput id="name" value={name} type="text" placeholder="Name ..." required onChange={(e)=>setName(e.target.value)} rightIcon={BadgeOutlinedIcon} className='w-96' sizing="lg" />
        {nameError && <p className="text-red-400">{nameError}</p>}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email ..." />
        </div>
        <TextInput id="email" value={email} type="email" placeholder="name@xyz.com" required onChange={(e)=>setEmail(e.target.value)} rightIcon={MailOutlineOutlinedIcon} className='w-96' sizing="lg" />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput id="password" value={password} type="password" placeholder="Password ..." required onChange={(e)=>setPassword(e.target.value)} rightIcon={KeyOutlinedIcon} className='w-96' sizing="lg" />
          {passwordError && <p className="text-red-400">{passwordError}</p>}
      </div>

      <div className="flex items-center gap-2">
        <p>Already have an account <Link to="/signIn" className='goToSignIn text-blue-300 underline' >Sign In</Link> </p>
      </div>

      <Button type="submit" className='w-96'>Submit</Button>

    </form>



    </div>
  )
}
