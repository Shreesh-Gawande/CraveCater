
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
  }
}`
const result=await request(MASTER_URL,query)
return result;
}

export default{
    GetCategory,
    GetReataurent,
    GetRestroDetail,
} 