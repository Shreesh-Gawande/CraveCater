
"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { Rating as ReactRating } from '@smastrom/react-rating'
import GlobalApi from "@/app/_utils/GlobalApi"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"
function ReviewSection({restaurent}) {
const [reviewText,setreviewText]=useState();
const [rating, setRating] = useState(0)
const {user}=useUser();

const [reviewList,setReviewList]=useState()

useEffect(()=>{
restaurent&&getReviewList();
},[restaurent])

const handleSubmit=()=>{
const data={
 email:user?.primaryEmailAddress.emailAddress,
  profileImage:user?.imageUrl,
  userName:user?.fullName,
  star:rating,
  reviewText:reviewText,
  RestrroSlug:restaurent.slug,
};
console.log(user)
GlobalApi.AddNewReview(data).then(resp=>{
  console.log(resp)
  toast("Review Added")
})
}

const getReviewList=()=>{
  GlobalApi.getReviews(restaurent.slug).then(resp=>{
    console.log(resp);
    setReviewList(resp.reviews)
  })
}

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 mt-3 gap-10'>
      <div className='flex flex-col gap-2 p-5 border rounded-lg shadow-lg'>
        <h2 className='font-bold text-lg'>Add Your Review</h2>
      <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
        <Textarea onChange={(e)=>setreviewText(e.target.value)}/>
        <Button disabled={rating==0||!reviewText}
        onClick={()=>handleSubmit()}>Submit</Button>
      </div>
      <div className='col-span-2'>
       List of Review
      </div>
    </div>
  )
}

export default ReviewSection
