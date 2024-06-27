import React from 'react';
import Image from 'next/image';
import navbar from './NavbarStyle.module.css';

const Navbar = () => {
  return (
    <>
      <div className={navbar.container}>
        <div >
          <Image src="/CraveCaterLogo.png" alt="..." width={120} height={100} className={navbar.logo}/>
        </div>
        <div className={navbar.options}>
            <button className={navbar.option}>Login</button>
            <button className={navbar.option}>SignIn</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
