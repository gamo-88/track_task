import React, { useEffect, useState } from 'react'
"use client";

import { Badge, Button, Label, Banner, TextInput } from "flowbite-react";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import {  userStore } from '../../manageStore';
import { supabase } from '../lib/SuperbaseClient';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState()
    const navigate = useNavigate()
    
    const USER = userStore((state) => state.USER)
    const updateUser = userStore((state) => state.updateUser)

    // useEffect(() => {
    //   supabase.auth.getSession().then(({ data: { session } }) => {
    //     setSession(session)
    //   })

    //   const {
    //     data: { subscription },
    //   } = supabase.auth.onAuthStateChange((_event, session) => {
    //     setSession(session)
    //   })

    //   return () => subscription.unsubscribe()
    // }, [])


    const handleGoogleSignIn = async ()=>{
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if (data.user) {
        updateUser(data.user)
        console.log(data.user)
        navigate("/task")
      }

    }
    const handleSignIn = async (e)=>{
        e.preventDefault()
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
          })
          
if (data.user) {
    navigate("/task")
    updateUser(data.user)
}

    
    setErrorMessage(error?.message)
    


    }



  return (
    <div className='contain h-svh flex flex-col items-center   bg-green-50'>

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
            Welcome to Track-task. Sign In to follow.
          </p>
        </div>
        <div className="flex shrink-0 items-center">
        <span className="mr-1">Go to</span><Link to="/signUp" className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75' >Sign up</Link>

        </div>
      </div>
    </Banner>
        
        
       { errorMessage&&<Badge color="failure" className='flex justify-center items-center text-red-600 py-3 w-fit text-center text-lg'>{errorMessage}</Badge>}


<div className="pt-14">

    
<form className="flex  flex-col gap-4 items-center px-10" onSubmit={handleSignIn} >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput value={email} id="email"  name='email' type="email" placeholder="name@xyz.com ..." rightIcon={MailOutlineOutlinedIcon} required shadow onChange={(e)=>setEmail(e.target.value)} className='w-96' sizing="lg"  />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput value={password} id="password" type="password" placeholder='Your password ...' rightIcon={KeyOutlinedIcon} required shadow onChange={(e)=>setPassword(e.target.value)} sizing="lg" className='w-96' />
      </div>

      <div className="flex items-center gap-2">
        <p>Don't have an account? <Link to="/signUp" className='goToSignUp text-blue-300 underline' >Sign up</Link> </p>
      </div>

      <Button type="submit" className='w-96'>Submit</Button>
    </form>

    {/* <div className="othersignInMode flex  flex-col items-center">

        <div className="withGoogle mt-4 flex flex-col items-center" >
            <img src="images/googlePic.png" alt="google image" className='googleImage h-10 w-10 cursor-pointer items-center rounded-full'  onClick={handleGoogleSignIn} />
            <button onClick={handleGoogleSignIn}>With Google</button>
        </div>


    </div> */}
</div>

    </div>
  )
}
