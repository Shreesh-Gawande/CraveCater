import {
  ClerkProvider,
} from '@clerk/nextjs';
import './globals.css';
import Header from './_components/Header';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      
        <body className="px-10 md:px-20 relative">
        <Header/>
          {children}
          
        </body>
      </html>
    </ClerkProvider>
  );
}
