import React, { useEffect, useState } from "react";
import { fetchStories, fetchUser, getUser } from "../Utilities/serverRequests";
import { useRouter } from "next/router";
import axios from "axios";

const SearchBar = ({ route, setRoute }) => {
  const [userName, setUserName] = useState("");

  let searchedUser = [];

  useEffect(() => {
    const data = localStorage.getItem("searchedUser");
    if (data) {
      const users = JSON.parse(data);
      if (users) {
        searchedUser = [...users];
        console.log("Saved UsersList: ", searchedUser);
      } else {
        searchedUser = [];
      }
    }
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // const user = await fetchUser(userName);
  //   // console.log("User: ", user.data);
  //   // const stories = await fetchStories(userName);
  //   // if (user) {
  //   //   if (stories) {
  //   //     const searchDetails = {
  //   //       user: user?.data,
  //   //       user_name: userName,
  //   //       timeStamp: Date.now(),
  //   //       stories: stories?.data,
  //   //     };
  //   //     console.log("Stories: ", stories?.data);
  //   //     searchedUser.push(searchDetails);
  //   //     localStorage.setItem("searchedUser", JSON.stringify(searchedUser));
  //   //     setRoute(true);
  //   //   } else {
  //   //     const searchDetails = {
  //   //       user: user?.data,
  //   //       user_name: userName,
  //   //       timeStamp: Date.now(),
  //   //     };
  //   //     searchedUser.push(searchDetails);
  //   //     localStorage.setItem("searchedUser", JSON.stringify(searchedUser));
  //   //     setRoute(true);
  //   //   }
  //   // }
  //   const user = await getUser(userName);
  //   if(user){
  //     const searchDetails = {
  //       user: user,
  //       user_name: userName,
  //       timeStamp: Date.now()
  //     }
  //     searchedUser.push(searchDetails);
  //     localStorage.setItem("searchedUser", JSON.stringify(searchedUser))
  //     setRoute(true)
  //   }
  // };

  async function handleSubmit(e) {
         e?.preventDefault();
    try {
      const { data } = await axios.post(
        `https://instagram-api-mhg3.onrender.com/user/${userName}`
      );
      if(data?.success){
        const stories = await axios.post(`https://instagram-api-mhg3.onrender.com/stories/${userName}`);
        console.log(stories.data?.stories?.result);
        if(stories.data.success){
          const searchDetails = {
            user: data?.user,
            user_name: userName,
            timeStamp: Date.now(),
            stories: stories.data?.stories?.result
          }
          searchedUser.push(searchDetails);
          localStorage.setItem("searchedUser", JSON.stringify(searchedUser));
          setRoute(true);
        } else {
          const searchDetails = {
                  user: data?.user,
                  user_name: userName,
                  timeStamp: Date.now(),
                }
                searchedUser.push(searchDetails);
                localStorage.setItem("searchedUser", JSON.stringify(searchedUser));
                setRoute(true);
        }
        }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form class="max-w-md mx-auto" onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="search"
          id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Paste OR Type Username Here.."
          required
        />
        <button
          type="submit"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
