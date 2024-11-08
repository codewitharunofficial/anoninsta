"use client"
import SearchBar from '@/Components/SearchBar'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Home = () => {

  const [route, setRoute] = useState(false);
  // const params = useParams();
  // console.log(params);

  const router = useRouter();


  useEffect(() => {
    if(route){
      router.push('/profile')
    }
  }, [route, router]);

  return (
    <>
    <h3 className='text-center text-2xl m-5 text-white' >Anonimous Insta Profile Viewer</h3>
    <SearchBar setRoute={setRoute} route={route} />
    </>
  )
}

export default Home
