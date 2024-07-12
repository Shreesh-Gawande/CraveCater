import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'

function Cart({ cart }) {

  
    const CalculateCartAmount=()=>{
        let total=0;
        cart.forEach(item => {
            total=total+item.price;
        });
        return total;
    }

    const RemoveItemFromCart=(id)=>{
        GlobalApi.DisconnectRestroFromUserCart(id).then(resp=>{
            console.log(resp);
            if (resp) {
               GlobalApi.DeleteItemFromCart(id).then(resp=>{
                console.log(resp)
                toast("Item Removed")
               }) 
            }
        })
    }
  return (
    <div>
      <h2 className='text-lg font-bold'>{cart[0]?.restaurant?.name}</h2>

      <div className='mt-5 flex flex-col gap-3'>
        <h2 className='font-bold'>My Order</h2>
        {cart && cart.map((item, index) => (
          <div key={index} className='flex justify-between gap-8 items-center'>
            <div className='flex gap-2 items-center '>
            <Image 
              src={item.productImage} 
              alt={item.productName}
              width={40} 
              height={40}
              className='h-[40px] w-[40px] rounded-l-lg object-cover'
            />
            <h2 className='text-sm'>{item?.productName}</h2>
          </div>
          <h2 className='font-bold flex gap-2'>Rs{item?.price}
          <X className='h-4 w-4 text-red-500' 
          onClick={()=>RemoveItemFromCart(item.id)}/>
          </h2>
          </div>
        ))}
        <Button>Checkout Rs {CalculateCartAmount()}</Button>
      </div>
    </div>
  )
}

export default Cart
