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
  const [isHighlightsLoading, setIsHighlightsLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const router = useRouter();

  async function getHighlights() {
    setIsHighlightsLoading(true);
    try {
      const { data } = await axios.post(
        `https://instagram-api-mhg3.onrender.com/highlights/${user?.user?.id}`
      );

      if (data?.success) {
        setUser({ ...user, highlights: data?.highlights });
        setIsHighlightsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsHighlightsLoading(false);
    }
  }

  async function getPosts() {
    setIsPostsLoading(true);
    try {
      const { data } = await axios.post(
        `https://instagram-api-mhg3.onrender.com/posts/${user?.user?.id}`
      );
      
      if (data.success) {
        setUser({ ...user, posts: data?.posts?.items });
        setIsPostsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsPostsLoading(false);
    }
  }

  useEffect(() => {
    if (activeTab === "Highlights" && !user?.user?.isPrivate) {
      if (user?.highlights?.length === 0) {
        getHighlights();
      }
    } else if (activeTab === "Profile" && !user?.user?.isPrivate) {
      if (user?.posts?.length === 0) {
        getPosts();
      }
    }
  }, [activeTab, user?.user?.isPrivate]);

  useEffect(() => {
    if (!user?.user) {
      router.replace("/");
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
      isHighlightsLoading={isHighlightsLoading}
      posts={user?.posts}
      isPostsLoading={isPostsLoading}
      posts_count={user?.user?.posts_count}
      isPrivate={user?.user?.isPrivate}
    />
  );
};

export default Profile;
