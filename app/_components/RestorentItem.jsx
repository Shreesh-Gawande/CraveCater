import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function RestorentItem({ restaurant }) {
const calculateRating=()=>{
let total=0;
let count=0;
restaurant?.review.forEach(item=>{
  total=total+item.star;
  count++;
})
const result=total/count
return result?result.toFixed(1):5;
}

  return (
    <Link 
    href={"/restaurent/"+restaurant?.slug}>
    <div className='p-3
    hover:border rounded-xl
    hover:border-primary cursor-pointer
    hover:bg-orange-50'>
      <Image src={restaurant.banner?.url} alt={restaurant.name}
      width={500} height={130} 
      className='h-[150px] rounded-xl object-cover'/>

      <div className='mt-2'>
        <h2 className='font-bold text-lg '>{restaurant.name}</h2>
      <div className='flex justify-between items-center'>
        <div className="flex gap-3 items-center">
          <Image src="/star.png" alt='star' width={17} height={14}/>
          <label className='text-gray-400 text-sm'>{calculateRating()}</label>
          <h2 className='text-gray-400 text-sm'>{restaurant.restroType[0]}</h2>
        </div>
        <h2 className='text-primary text-sm'>{restaurant.category[0].name}</h2>
      </div>
      
      </div>
    </div>
    </Link>
  )
}

export default RestorentItem