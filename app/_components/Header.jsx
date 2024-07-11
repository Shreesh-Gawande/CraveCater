"use client"
import React from 'react'
import Image from 'next/image';
import { Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

function Header() {
    const {user,isSignedIn}=useUser();
  return (
    <div className="flex justify-between items-center p-6 md:px-20 shadow-sm fixed top-0 left-0 right-0 ">
      <Image src="/CraveCaterLogo.png" alt="logo" width={75} height={20} />
      <div className="hidden md:flex border p-2 rounded-lg bg-gray-200 w-96">
        <input type='text' placeholder='Search' className="bg-transparent w-full  outline-none"/>
        <Search/>
      </div>
      {isSignedIn?
      <div className='flex gap-5 items-center'>
        <div className='flex gap-2 items-center'>
          <ShoppingCart/>
          <label className='bg-slate-200 rounded-full p-1 px-2'>0</label>
        </div>
        <UserButton/>
      </div>
      
      :<div className="flex gap-5">
        <SignInButton mode="modal">
       <Button variant="outline">Login</Button>
       </SignInButton>
       <SignUpButton mode="modal">
       <Button>Sign Up</Button>
       </SignUpButton>
      </div>}
    </div>
  )
}

export default Header
