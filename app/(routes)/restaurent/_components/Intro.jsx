"use client"
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function Intro({restaurent}) {
const [totalreviews,setTotalreviews]=useState();
const [averageRating,setAverageRating]=useState();
useEffect(()=>{
  restaurent&&calculateRating()
},[restaurent])
  const calculateRating=()=>{
    let total=0;
    let count=0;
    restaurent?.review?.forEach(item=>{
      total=total+item.star;
      count++;
    })
    setTotalreviews(count)
    const result=total/count
    setAverageRating( result?result.toFixed(1):5);
    }
  return (
    <div>
        {restaurent?.banner?.url?
      <div>
       <Image src={restaurent?.banner?.url}
       alt='Restro Image'
       width={1000} height={300}
       className='w-full h-[220px] object-cover object-contain rounded-xl mt-28'/>
      </div>:
      <div className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'></div>}
      <h2 className='text-3xl font-bold mt-2'>{restaurent.name}</h2>
      <div className='flex items-center gap-2'>
        <Image src={'/star.png'} alt='star'
        width={20} height={20}/>
        <label className=' text-gray-500 gap-1 mt-2'>{averageRating} ({totalreviews})</label>
      </div>
      <h2 className='text-gray-500 mt-2 flex gap-2 items-center'> <MapPin/>
      {restaurent.address}</h2>
    </div>
    
  )
}

export default Intro
