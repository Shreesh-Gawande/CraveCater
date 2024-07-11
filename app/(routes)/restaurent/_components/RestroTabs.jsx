import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuSection from './MenuSection'


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
  <TabsContent value="reviews">Change your password here.</TabsContent>
</Tabs>

  )
}

export default RestroTabs
