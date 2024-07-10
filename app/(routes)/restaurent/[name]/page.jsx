"use client"

import GlobalApi from '@/app/_utils/GlobalApi'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function RestaurentDetails() {
  const [restaurent,setRestaurent]=useState([]);

  const params=usePathname();
  useEffect(()=>{
    console.log(params)
    GetRestaurentDetails(params.split('/')[2]);
  },[])

  const GetRestaurentDetails=(restroSlug)=>{
  GlobalApi.GetRestroDetail(restroSlug).then(resp=>{
    console.log(resp)
    setRestaurent(resp.restaurant);
  })
  }
  return (
    <div>
      
    </div>
  )
}

export default RestaurentDetails
