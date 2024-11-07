import React, { useEffect, useState } from "react";
import ProfileData from "./ProfileData";
import Link from "next/link";

const SearchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("searchedUser");
    const users = JSON.parse(data);
    if (users?.length > 0) {
      setHistory(users);
    }
  }, []);

  return (
    <div className="grid row-auto col-auto p-10">
      {history?.length > 0 ? (
        <>
          <h4 className="mb-10 self-center justify-self-center underline underline-offset-2 text-xl" >User you Searched</h4>

            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          {history.map((item, idx) => (
              <li key={idx} className="hover:underline underline-offset-2" >
                <Link href={`/history/profile/${idx}`}>{item?.user?.fullName}</Link>
              </li>
          ))}
            </ul>
        </>
      ) : (
        <h4>No Search Histroy Found</h4>
      )}
    </div>
  );
};

export default SearchHistory;
