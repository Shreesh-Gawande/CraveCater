"use client"
import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect, Suspense } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import RestorentItem from './RestorentItem';
import RestorentItemSkeleton from './RestorentItemSkeleton';

function Restorent() {
  const params = useSearchParams();
  const [category, setCategory] = useState('All');
  const [restorent, setRestorent] = useState([]);
  const [loding,setLoding]=useState(false)
  
  useEffect(() => {
    if (params) {
      console.log(params)
      setCategory(params.get('category'))
      getRestorentList(params.get('category')||'all')
    }
  }, [params])

  const getRestorentList = (category_) => {
    setLoding(true)
    GlobalApi.GetReataurent(category_).then(resp => {
      setRestorent(resp?.restaurants)
      setLoding(false)
    })
  }

  return (
    <Suspense>
    <div className='mt-5'>
      <h2 className='font-bold text-2xl'>Popular {category} Restaurants</h2>
      <h2 className='text-primary font-bold'>Results {restorent.length}</h2>
      <div className='grid grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-7 mt-3'>
        {!loding? restorent.map((restaurant, index) => (
          <RestorentItem key={index} restaurant={restaurant} />
        )):
        [1,2,3,4,5,6,7,8].map((item,index)=>(
          <RestorentItemSkeleton key={index}/>
        ))
      }
      </div>
    </div>
    </Suspense>
  )
}

export default Restorent