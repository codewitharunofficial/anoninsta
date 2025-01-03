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
  // const params = useParams();
  // console.log(params);

  const router = useRouter();

  useEffect(() => {
    if (route) {
      router.push("/profile");
    }
  }, [route, router]);

  return (
    <>
      <div className="w-full h-1/2 sm:h-full md:h-full pb-5">
        <SearchBar setRoute={setRoute} route={route} />
        <h4 className="text-white text-center text-lg self-center mt-20">
          Profile Will Be Displayed Here :)
        </h4>
      </div>
      {!user?.user_name && <WhyInsecView />}
    </>
  );
};

export default Home;
