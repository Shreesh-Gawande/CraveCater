"use client"
import React, { useEffect, useState ,useRef, Suspense} from 'react';
import Image from 'next/image'; 
import GlobalApi from '../_utils/GlobalApi';
import { ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CategoryList() {
  const listRef=useRef(null);
  const [categoryList, setCategoryList] = useState([]);
  const params=useSearchParams();
  const [selectedCategory,setSelectedCategory]=useState('all')
  useEffect(()=>{
    setSelectedCategory(params.get('category'));
  },[params])

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.GetCategory().then(resp => {
      console.log(resp.categories);
      setCategoryList(resp.categories);
    });
  };
  const ScrollRightHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };
  

  return (
    <Suspense>
    <div>
      <div className="flex gap-4 overflow-auto scrollbar-hide mt-40 relative" ref={listRef}>
        {categoryList && categoryList.map((category, index) => (
          <Link href={"?category="+category.slug} key={index}
          className={`flex flex-col items-center justify-center gap-2 border p-3 text-sm font-medium rounded-xl min-w-28
          hover:border-primary hover:bg-orange-50 hover:cursor-pointer hover:text-primary group
          ${selectedCategory==category.slug&&'text-primary bg-orange-50 border-primary'}`}>
            <Image src={category.icon?.url} alt={category.name} width={45} height={45}
            className="group-hover:scale-125 transition-all duration-200" />           
            <h2 >{category.name}</h2>
          </Link>
        ))}
      </div>
      <ArrowRightCircle className="absolute right-10 top-9
      cursor-pointer bg-gray-500 text-white rounded-full h-8 w-8"
      onClick={() => ScrollRightHandler()}/>
    </div>
    </Suspense>
  );
}

export default CategoryList;
