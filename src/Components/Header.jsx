import React from 'react'
import Link from 'next/link'
import image from "@/app/images/icon.webp";

const Header = () => {
  return (
    
<nav className="bg-white border-white-200 dark:bg-white-900" style={{position: "fixed", marginBottom: '5%', top: 0, width: "100%", zIndex: 1, }}>
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">InsecView</span>
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
    </Link>
  </div>
</nav>


  )
}

export default Header