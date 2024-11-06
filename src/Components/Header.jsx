import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    

<nav className="bg-white border-white-200 dark:bg-white-900" style={{position: "sticky", marginBottom: '5%'}}>
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Save-Instant</span>
    </Link>
    <Link className='item-center rounded-tl-sm cursor-pointer' href='/history' >
    <span className="self-center text-xl font-semibold whitespace-nowrap text-black " >
       Search History
    </span>
    </Link>
  </div>
</nav>


  )
}

export default Header