"use client";
import SearchBar from "../Components/SearchBar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserConext";
import WhyInsecView from "../Components/WhyInsecView";

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
      <main className="w-screen h-screen sm:h-screen md:h-screen pb-5">
        <SearchBar setRoute={setRoute} route={route} setIsUser={setIsUser} />
        <h4 className="text-white text-center text-lg self-center mt-20 mb-10">
          {!isUser
            ? "Oops..! No User Found! Please Check the username and try again..!"
            : "Profile Will Be Displayed Here :)"}
        </h4>
        {!user?.user_name && <WhyInsecView />}
      </main>
    </>
  );
};

export default Home;
