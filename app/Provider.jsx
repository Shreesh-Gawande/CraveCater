import React from 'react'
import Header from './_components/Header'
import { Toaster } from "@/components/ui/sonner"

function Provider({childern}) {
  return (
    <div>
       <Header/>
       <Toaster/>
       {childern}
    </div>
  )
}

export default Provider
