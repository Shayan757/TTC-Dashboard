"use client"
import React, { useState, useEffect } from 'react'
import { EyeIcon, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFormState } from "react-dom";
import { login } from '../../../actions/auth';

import Link from 'next/link';
import { toast } from "react-toastify";
import { getUserDetails } from '../../../actions/auth';

const page = () => {
  const router = useRouter()
  const [currentState, loginAction, isPending] = useFormState(login, {});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(()=>{
  const userValidate = async () => {
    let user = await getUserDetails();
    if(user?.roleId !== null){
      if(user?.roleId == 3){
        router.push('/admin')
      }
    }
  }
  userValidate();
  },[])

  useEffect(() => {
    if (currentState?.other) {
      toast.warning(currentState?.other, {
        position: "top-right",
      });
      //alert(currentState?.other);
      setIsLoading(false)
    }
    setIsLoading(false)
  }, [currentState]);

  return (

    <div className="bg-white p-6 rounded-lg border border-gray-200 w-full max-w-md mb-4">
    <h2 className="md:text-2xl text-xl font-bold mb-4"> Log in</h2>
    <form action={loginAction} onSubmit={() => { setIsLoading(true) }}>
      <div className="mb-4">
        <label className="block text-gray-700">Email <span className="text-red-500">*</span></label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Enter your email address"
          className="w-full p-3 border rounded-md focus:outline-none focus:border-[#FFCE00]"
        />
        {currentState?.zod_errors?.email && (
          <p className="text-red-700">{currentState.zod_errors.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password <span className="text-red-500">*</span></label>
        <div className="relative">
          <input
            name="password"
            required
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className="w-full p-3 border rounded-md focus:outline-none focus:border-[#FFCE00]"
          />

          <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff className="h-6 w-6" />
            ) : (
              <EyeIcon className="h-6 w-6" />
            )}
          </span>
          {currentState?.zod_errors?.password && (
            <p className="text-red-700">{currentState.zod_errors.password}</p>
          )}
        </div>
      </div>
      <div style={{ textAlign: 'end' }} className="w-full  mb-2">
        <Link href={'/login/forget-password'} className="text-sm cursor-pointer text-yellow-600 ">Forgot Password?</Link>
      </div>
      {isLoading ?
        <>
          <button disabled className="bgColor mb-2 w-full text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none">
            Loading...
          </button>
        </> :
        <>
          <button type="submit" className="bgColor mb-2 w-full text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none">
            Log In
          </button>
        </>}
    
    </form>

  </div>
 
  )
}

export default page