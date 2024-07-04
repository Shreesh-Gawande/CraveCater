import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <>
    <div>REturn to the god of war</div>
    <UserButton afterSignOutUrl="/"/>
    </>
  );
}
