import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useUser } from "@/context/UserConext";
import Loader from "./Loader";

const SearchBar = ({ route, setRoute, setIsUser }) => {
  const [userName, setUserName] = useState("");
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState();

  async function handleSubmit(e) {
    e?.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/user/${userName}`);
      if (data?.success) {
        if (data?.status === 201) {
          setIsUser(false);
          setLoading(false);
        } else {
          if (!data?.user?.isPrivate) {
            const stories = await axios.post(`/api/stories/${userName}`);

            if (stories.data.success) {
              setUser({
                user: data?.user,
                user_name: userName,
                full_name: data?.user?.full_name,
                stories: stories.data?.stories,
                posts: [],
                highlights: [],
                comments: [],
              });
              setLoading(false);
              setRoute(true);
            } else {
              setUser({
                user: data?.user,
                user_name: userName,
                full_name: data?.user?.full_name,
                stories: [],
                posts: [],
                highlights: [],
                comments: [],
              });
              setLoading(false);
              setRoute(true);
            }
          } else {
            setUser({
              user: data?.user,
              user_name: userName,
              full_name: data?.user?.full_name,
              stories: [],
              posts: [],
              highlights: [],
              comments: [],
            });
            setLoading(false);
            setRoute(true);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <form
      className="w-5/6 sm:w-4/5 place-self-center max-w-screen-sm mx-auto"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm dark:focus:bg-gray-700 focus:bg-white text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Paste Or Type Username Here..."
          required
        />
        {!loading ? (
          <button
            type="submit"
            disabled={loading}
            className={`text-white absolute end-2.5 bottom-2.5 bg-${
              user?.user ? "green" : "blue"
            }-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            {route ? "Redirecting..." : "Search"}
          </button>
        ) : (
          <Loader />
        )}
      </div>
    </form>
  );
};

export default SearchBar;
