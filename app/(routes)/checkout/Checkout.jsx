"use client"
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState, Suspense } from 'react'
import { Input } from "@/components/ui/input"
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { CartUpdateContext } from '@/app/_context/CartUpdateContext'
import { Button } from '@/components/ui/button'


function Checkout() {
    const params=useSearchParams()
const {user}=useUser()
const [cart,setCart]=useState([])
const {updateCart,setUpdateCart}=useContext(CartUpdateContext);
const [taxamount,setTaxAmount]=useState(0)
const [subtotal,setsubtotal]=useState(0);
const [total,setTotal]=useState(0);

    useEffect(()=>{
    console.log(params.get('restaurent'))
    user&&GetUserCarts()
    },[user||updateCart])
    const GetUserCarts=()=>{
        GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(resp=>{
          console.log(resp);
          setCart(resp?.userCarts)
          getSubtotal(resp?.userCarts);
        });
        
      }

      const getSubtotal=(cart_)=>{
         let total=0;
         cart_.forEach(item => {
            total=total+item.price;
        });
        setsubtotal(total)
        setTaxAmount(total*0.04)
        setTotal(total*0.04+total+40)
      }


  return (
    <div>
        <Suspense>
      <h1 className='mt-32 text-3xl font-bold'>Checkout</h1>
      
        <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 '>
            <div className='md:col-span-2 mx-20'>
        <h1 className='mt-20  text-3xl font-bold'>Billing Details</h1>
        <div className='grid grid-cols-2 gap-10 mt-3 '>
            <Input className="w-full"  placeholder="Name"/>
            <Input  className="w-full" placeholder="Email"/>
        </div>
        <div className='grid grid-cols-2 gap-10 mt-3 '>
            <Input  placeholder="Phone"/>
            <Input  placeholder="Zip"/>
        </div>
        <div className='mt-3'>
          <Input placeholder="Address"/>
        </div>
        </div>

        <div className='mx-10 border'>
        <h2 className='bg-gray-300 p-3 flex justify-center items-center text-lg font-bold'>Total Cart ({cart?.length})</h2>
        <div className='flex flex-col '>
        <h2 className='font-bold p-4 flex justify-between border'>Subtotal:<span>Rs {subtotal}</span></h2>
        <h2 className=' p-4 flex justify-between border'>Delivery:<span>Rs 40</span></h2>
        <h2 className=' p-4 flex justify-between border'>Tax (4%): <span>Rs {taxamount.toFixed(2)}</span></h2>
        <hr></hr>
        <h2 className='font-bold p-4 flex justify-between border'>Total: <span>Rs {total}</span></h2>
        <Button className="p-4">Make Payment</Button>
        </div>
        
        </div>
        </div>
        </Suspense>
    </div>
  )
}

export default Checkout
