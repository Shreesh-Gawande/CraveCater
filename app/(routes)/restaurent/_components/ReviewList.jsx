import Image from 'next/image'
import React from 'react'
import { Rating as ReactRating } from '@smastrom/react-rating'
import moment from 'moment'

export default function ReviewList({reviewList}) {
    console.log(reviewList)
  return (
    
    <div className='flex flex-col gap-5'>
     {reviewList?reviewList.map((review,index)=>(
        <div key={index} className='flex gap-5 items-center rounded-lg p-5 border'>
            <Image src={review.profileImage} alt='profile Image'
            width={50} height={50} 
            className='rounded-full'/>
            <div>
            <h2>{review.reviewText}</h2>
                
                <ReactRating style={{ maxWidth: 100 }} value={review.star} isDisabled={true} />
                <h2 className='text-sm'><span className='font-bold'>{review.userName}</span> at {moment(review.publishedAt).format('DD-MMM-yyyy')}</h2>
            </div>
            </div>
            
     )

     )
    :[1,2,3,4].map((item,index)=>(
        <div key={index} className='w-full h-[100px] rounded-lg animate-pulse bg-slate-200'>
            </div>
    ))
    }
    </div>
  )
}
