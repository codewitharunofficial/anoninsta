"use client";
import ProfileData from '@/Components/ProfileData'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [user, setUser] = useState({});
    const params = useParams();
    const {index} = params;


    useEffect(() => {
        const data = localStorage.getItem("searchedUser");
        const users = JSON.parse(data);
        console.log("saved user: ", users);
        if (users?.length > 0) {
          setUser(users[index]);
        }
      }, []);

  return (
    <ProfileData fullName={user?.user?.fullName} userName={user?.user?.userName} profilePhoto={user?.user?.profile_pic} stories={user?.stories} bio={user?.user?.bio} followers={user?.user?.follower} following={user?.user?.following} />
    )
}

export default page