"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { CartUpdateContext } from '../_context/CartUpdateContext';
import GlobalApi from '../_utils/GlobalApi';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Cart from './Cart';


function Header() {
    const {user,isSignedIn}=useUser();
    const {updateCart,setUpdateCart}=useContext(CartUpdateContext);
    const [cart,setCart]=useState([])
    useEffect(()=>{
      console.log("Execute Me")
      user&&GetUserCarts()
    },[updateCart&&user])


    const GetUserCarts=()=>{
      GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(resp=>{
        console.log(resp);
        setCart(resp?.userCarts)
      });
      
    }

  return (
    <div className="flex justify-between items-center p-6 md:px-20 shadow-sm fixed top-0 left-0 right-0 ">
      <Image src="/CraveCaterLogo.png" alt="logo" width={75} height={20} />
      <div className="hidden md:flex border p-2 rounded-lg bg-gray-200 w-96">
        <input type='text' placeholder='Search' className="bg-transparent w-full  outline-none"/>
        <Search/>
      </div>
      {isSignedIn?
      <div className='flex gap-5 items-center'>
        
        <Popover>
  <PopoverTrigger asChild>
  <div className='flex gap-2 items-center cursor-pointer'>
          <ShoppingCart/>
          <label className='bg-slate-200 rounded-full p-1 px-2'>{cart?.length}</label>
        </div>
  </PopoverTrigger>
  <PopoverContent className="w-full">
    <Cart cart={cart}/>
  </PopoverContent>
</Popover>

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
