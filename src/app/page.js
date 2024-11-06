"use client"
import SearchBar from '@/Components/SearchBar'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Home = () => {

  const [route, setRoute] = useState(false);

  const router = useRouter();


  useEffect(() => {
    if(route){
      console.log(route);
      router.replace('/history/profile/0')
    }
  }, [route]);

  return (
    <SearchBar setRoute={setRoute} route={route} />
  )
}

export default Home