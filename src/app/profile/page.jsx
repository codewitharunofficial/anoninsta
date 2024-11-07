"use client";
import ProfileData from "@/Components/ProfileData";
import { useTabs } from "@/context/TabContext";
import { useUser } from "@/context/UserConext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const { user, setUser } = useUser();
  const { activeTab, setActiveTab } = useTabs();
  const router = useRouter();

  async function getHighlights() {
    try {
      const { data } = await axios.post(
        `http://192.168.138.47:8081/highlights/${user?.user?.id}`
      );
      
      if (data?.success) {
        setUser({ ...user, highlights: data?.highlights });
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (activeTab === "Highlights") {
      if (user?.highlights?.length === 0) {
        getHighlights();
      }
    }
  }, [activeTab]);

  useEffect(() => {
    if(!user?.user){
      router.replace('/');
    }
  }, [user?.user]);

  return (
    <ProfileData
      fullName={user?.user?.fullName}
      userName={user?.user?.userName}
      profilePhoto={user?.user?.profile_pic}
      stories={user?.stories}
      bio={user?.user?.bio}
      followers={user?.user?.follower}
      following={user?.user?.following}
      highlights={user?.highlights}
    />
  );
};

export default Profile;
