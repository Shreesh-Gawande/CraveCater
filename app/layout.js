import {
  ClerkProvider,
} from '@clerk/nextjs';
import './globals.css';
import Header from './_components/Header';
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      
        <body className="px-10 md:px-20 relative">
        <Header/>
        <Toaster/>
          {children}
          
        </body>
      </html>
    </ClerkProvider>
  );
}
