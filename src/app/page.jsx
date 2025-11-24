"use client";
import SearchBar from "../Components/SearchBar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserConext";
import WhyInsecView from "../Components/WhyInsecView";

const Home = () => {
  const [route, setRoute] = useState(false);
  const { user } = useUser();
  const [isUser, setIsUser] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (route) {
      router.push("/profile");
    }
  }, [route, router]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center p-4 pt-8 bg-transparent">
      {/* Search Bar */}
      <div className="w-full max-w-xl">
        <SearchBar setRoute={setRoute} route={route} setIsUser={setIsUser} />
      </div>

      {/* Center Message */}
      <h4 className="text-white text-center text-lg mt-10">
        {!isUser
          ? "Oops..! No User Found! Please check the username and try again..!"
          : "Profile Will Be Displayed Here :)"}
      </h4>

      {/* Extra Info Section */}
      {!user?.user_name && (
        <div className="w-full mt-8">
          <WhyInsecView />
        </div>
      )}
    </main>
  );
};

export default Home;
