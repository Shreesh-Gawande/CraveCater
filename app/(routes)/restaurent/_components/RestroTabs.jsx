import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuSection from './MenuSection'
import ReviewSection from './ReviewSection'


function RestroTabs({restaurent}) {
  return (
    <Tabs defaultValue="category" className="w-full mt-10">
  <TabsList>
    <TabsTrigger value="category">Category</TabsTrigger>
    <TabsTrigger value="about">About</TabsTrigger>
    <TabsTrigger value="reviews">Reviews</TabsTrigger>
  </TabsList>
  <TabsContent value="category"><MenuSection restaurent={restaurent} /></TabsContent>
  <TabsContent value="about">Change your password here.</TabsContent> 
  <TabsContent value="reviews"><ReviewSection restaurent={restaurent}/></TabsContent>
</Tabs>

  )
}

export default RestroTabs
