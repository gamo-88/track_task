import React, { useState } from 'react'
"use client";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

import { Button, Label, TextInput, Banner } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/SuperbaseClient';
import { userStore } from '../../manageStore';

export default function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    const updateUser = userStore((state) => state.updateUser)



    const handleSignUp = async (e)=>{
      e.preventDefault()
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                name: name,  // Store the user's display name
              }
            }
          })
          navigate("/task")
          updateUser(data.user)
          
    }

  return (
    <div className=' h-svh flex flex-col items-center     bg-green-50'>
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
        <span className="mr-1">Go to</span><Button href="/signIn" >Sign In</Button>

        </div>
      </div>
    </Banner>
        



    <form className="flex flex-col items-center gap-4 pt-14 px-10" onSubmit={handleSignUp}>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your name" />
        </div>
        <TextInput id="name" value={name} type="text" placeholder="Name ..." required onChange={(e)=>setName(e.target.value)} rightIcon={BadgeOutlinedIcon} className='w-96' sizing="lg" />
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
      </div>

      <div className="flex items-center gap-2">
        <p>Already have an account <Link to="/signIn" className='goToSignIn text-blue-300 underline' >Sign In</Link> </p>
      </div>

      <Button type="submit" className='w-96'>Submit</Button>

    </form>



    </div>
  )
}
