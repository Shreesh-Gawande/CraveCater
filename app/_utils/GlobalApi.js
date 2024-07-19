
import { gql, request } from 'graphql-request';
const MASTER_URL=process.env.NEXT_PUBLIC_BACKEND_API_URL


/* used to make get category api request */
const GetCategory =async()=>{
     const query=gql`
     query MyQuery {
  categories(first: 20) {
    id
    name
    slug
    icon {
      url
    }
  }
}
  `
  const result=await request(MASTER_URL,query)
  return result;
}
const GetReataurent=async(category)=>{
  const query=gql`
  query GetReataurent {
  restaurants( first: 100 where: {category_some: {slug: "`+category+`"}}) {
    aboutUs
    address
    banner {
      url
    }
    category {
      id
      name
    }
    id
    name
    restroType
    slug
    workingHours
     review{
      star
    }
  }
}
  `
  const result=await request(MASTER_URL,query)
  return result;
}

const GetRestroDetail=async(restroSlug)=>{
  const query=gql`
  query RestaurentDetails {
  restaurant(where: {slug: "`+restroSlug+`"}) {
    aboutUs
    address
    banner {
      url
    }
    category {
      name
    }
    id
    name
    restroType
    slug
    workingHours
    menu {
      ... on Menu {
        id
        category
        menuItem {
          ... on MenuItem {
            id
            name
            description
            price
            productImage {
              url
            }
          }
        }
      }
    }
      review{
      star
      }
  }
}`
const result=await request(MASTER_URL,query)
return result;
}

const AddToCart=async(data)=>{
  const query=gql`
 mutation AddToCart {
  createUserCart(
    data: {email: "`+data.email+`", price: `+data.price+`, productImage: "`+data.productImage+`",
     productName: "`+data.name+`",
     productDescription: "`+data.description+`" restaurant: {connect: {slug: "`+data.restaurentSlug+`"}}}
  ) {
    id
  }
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}`
const result=await request(MASTER_URL,query)
return result;
}

const GetUserCart=async(userEmail)=>{
  const query=gql`
  query GetUserCart {
  userCarts( first: 200 where: {email: "`+userEmail+`"}) {
    id
    price
    productDescription
    productImage
    productName
    restaurant {
      name
      banner {
        url
      }
      slug
    }
  }
}`
const result=await request(MASTER_URL,query)
return result;
}
const DisconnectRestroFromUserCart=async(id)=>{
  const query=gql`
  mutation DisconnectRestaurentFromCartItem {
  updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "`+id+`"}) {
    id
  }
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}`
const result=await request(MASTER_URL,query)
return result;
}

const DeleteItemFromCart=async(id)=>{
  console.log(id)
  const query=gql`
mutation DeleteCartItem {
  deleteUserCart(where: {id: "`+id+`"}) {
    id
  }
}`
const result=await request(MASTER_URL,query)
return result;
}

const AddNewReview=async(data)=>{
  console.log(data)
  const query=gql`
  mutation AddNewReview {
  createReview(
    data: {email: "`+data.email+`",
     profileImage: "`+data.profileImage+`",
     reviewText:"`+data.reviewText+`",
      star: `+data.star+`, 
      userName: "`+data.userName+`",
       restaurant: {connect: {slug: "`+data.RestrroSlug+`"}}}
  ) {
    id
  }
  publishManyReviews(to: PUBLISHED) {
    count
  }
}`
const result=await request(MASTER_URL,query)
return result;
}

const getReviews=async(slug)=>{
 const query=gql`
 query RestaurentReviews {
  reviews(where: {restaurant: {slug: "`+slug+`"}} , orderBy: publishedAt_DESC) {
    email
    id
    profileImage
    publishedAt
    star
    userName
    reviewText
  }
}`
const result=await request(MASTER_URL,query)
return result;
}

export default{
    GetCategory,
    GetReataurent,
    GetRestroDetail,
    AddToCart,
    GetUserCart,
    DisconnectRestroFromUserCart,
    DeleteItemFromCart,
    AddNewReview,
    getReviews,
} 