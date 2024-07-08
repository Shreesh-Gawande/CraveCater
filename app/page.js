
import { UserButton } from "@clerk/nextjs";
import CategoryList from "./_components/CategoryList";
import Restorent from "./_components/Restorent";
export default function Home() {
  return (
    <>
    <div>
    
      <CategoryList/>
      <Restorent/>
    </div>
    
    </>
  );
}
