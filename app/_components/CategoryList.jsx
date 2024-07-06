"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import the Image component
import GlobalApi from '../_utils/GlobalApi';

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.GetCategory().then(resp => {
      console.log(resp.categories);
      setCategoryList(resp.categories);
    });
  };

  return (
    <div>
      <div className="flex gap-4 overflow-auto mt-40">
        {categoryList && categoryList.map((category, index) => (
          <div key={index}
          className="flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28">
            <Image src={category.icon?.url} alt={category.name} width={45} height={45} />
            <div classname="text-sm font-medium">
            <h2 >{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
