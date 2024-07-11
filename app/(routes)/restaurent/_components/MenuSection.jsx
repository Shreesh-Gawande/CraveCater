"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { SquarePlus } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function MenuSection({ restaurent }) {

    const [menuItemList,setMenuItemList]=useState([])
    const {user}=useUser();

    useEffect(()=>{
        restaurent?.menu&&filterMenu(restaurent?.menu[0]?.category)
    },[restaurent])

    const filterMenu=(category)=>{
        const result=restaurent?.menu?.filter((item)=>item.category==category)
        setMenuItemList(result[0])
        console.log(result[0])
    }
    const addToCartHandler=(item)=>{
      toast("Adding To Cart")
      const data={
        email:user?.primaryEmailAddress?.emailAddress,
        name:item?.name,
        description:item?.description,
        productImage:item?.productImage?.url,
        price:item?.price
      }
      console.log(data);
     GlobalApi.AddToCart(data).then(resp=>{
      console.log(resp);
      toast("Added To Cart")
     },(error)=>{
      toast("Error while adding to the cart")
     })
    }

  return (
    <div className='grid grid-cols-4'>
      <div className='hidden md:flex flex-col mr-19 gap-2'>     
        {restaurent?.menu?.map((item, index) => (
          <Button key={index} variant="ghost"
          onClick={()=>filterMenu(item.category)} className="flex justify-start">
            {item.category}
          </Button>
        ))}
      </div>
      <div className='md:col-span-3 col-span-4'>
        <h2 className='font-extrabold text-lg'>{menuItemList.category}</h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
            {menuItemList?.menuItem?.map((item,index)=>(
                <div className='p-2 flex gap-2 border rounded-xl hover:border-primary cursor-pointer'>
                 <Image key={index} src={item?.productImage?.url}
                 alt='dish Image'
                 width={120} height={120}
                 className='object-cover rounded-xl w-[120px] h-[120px]'/>
                 <div className='flex flex-col gap-1'>
                    <h2 className='font-bold'>{item.name}</h2> 
                    <h2>{item.price}</h2> 
                    <h2 className='text-sm line-clamp-2 text-gray-400'>{item.description}</h2>
                    <SquarePlus className='cursor-pointer' onClick={()=>addToCartHandler(item)}/>
                 </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default MenuSection
