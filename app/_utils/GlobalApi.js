
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

export default{
    GetCategory
} 