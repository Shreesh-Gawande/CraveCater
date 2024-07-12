"use client"
import {
  ClerkProvider,
} from '@clerk/nextjs';
import './globals.css';
import Header from './_components/Header';
import { Toaster } from 'sonner';
import { CartUpdateContext } from './_context/CartUpdateContext';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [updateCart,setUpdateCart]=useState(false);
  return (
    <ClerkProvider>
      <CartUpdateContext.Provider value={{updateCart,setUpdateCart}}>
      <html lang="en">
      
        <body className="px-10 md:px-20 relative">
        <Header/>
        <Toaster/>
          {children}
          
        </body>
      </html>
      </CartUpdateContext.Provider>
    </ClerkProvider>
  );
}
