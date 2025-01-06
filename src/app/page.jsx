"use client";
import SearchBar from "@/Components/SearchBar";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "./logo.webp";
import { whyInsecView } from "@/Utilities/WhyInsecView";
import { useUser } from "@/context/UserConext";
import WhyInsecView from "@/Components/WhyInsecView";

const Home = () => {
  const [route, setRoute] = useState(false);
  const { user, setUser } = useUser();
  const [isUser, setIsUser] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (route) {
      router.push("/profile");
    }
  }, [route, router]);

  return (
    <>
      <div className="w-full h-screen sm:h-screen md:h-screen pb-5">
        <SearchBar setRoute={setRoute} route={route} setIsUser={setIsUser} />
        <h4 className="text-white text-center text-lg self-center mt-20 mb-10">
          {!isUser
            ? "Oops..! No User Found! Please Check the username and try again..!"
            : "Profile Will Be Displayed Here :)"}
        </h4>
      {!user?.user_name && <WhyInsecView />}
      </div>
    </>
  );
};

export default Home;
