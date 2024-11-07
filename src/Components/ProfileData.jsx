import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";
import moment from "moment";
import { useTabs } from "@/context/TabContext";
import HighlightTray from "./HighlightTray";

const ProfileData = ({
  fullName,
  profilePhoto,
  stories,
  userName,
  following,
  followers,
  bio,
  posts,
  highlights,
}) => {
  const { activeTab, setActiveTab } = useTabs();

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  function formatCounts(count) {
    if (count > 999) {
      const formattedCount = `${Math.floor(count / 1000)}.${Math.floor(
        (count % 1000) / 1000
      )}K`;
      return formattedCount;
    } else if (count > 99999) {
      const formattedCount = `${Math.floor(count / 100000)}.${Math.floor(
        (count % 100000) / 100000
      )}M`;
    } else {
      return count;
    }
  }

  return (
    <div className="flex flex-col items-center justify-items-center self-center gap-5 p-10">
      <div
        className="flex flex-col border-gray-100"
        style={{ width: 150, height: 150, borderRadius: 100 }}
      >
        <img
          src={profilePhoto}
          style={{ width: 150, height: 150, borderRadius: 100 }}
        />
      </div>

      <div className="flex flex-col gap-5 p-5 items-center justify-items-center">
        <div className="flex flex-col self-center items-center bg-purple-400 rounded-md p-5">
          <h4 className="text-black">{fullName}</h4>
          <a
            href={`https://www.instagram.com/${userName}`}
            target="_blank"
            className="hover:underline underline-offset-2 text-blue-600 dark:text-blue-600 cursor-pointer"
          >
            {userName}
          </a>
          <div className="flex flex-row flex-wrap w-100 items-center self-center justify-between p-5 gap-10">
            <span>
              <h4 className="text-black">
                Followers: {formatCounts(followers)}
              </h4>
            </span>
            <span>
              <h4 className="text-black">
                Following: {formatCounts(following)}
              </h4>
            </span>
          </div>
          <h5 className="text-black">{bio}</h5>
        </div>
      </div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ width: dimensions.width }} className="self-center gap-10 h-auto p-5">
        {activeTab === "Stories" ? (
          stories?.length > 0 ? (
            stories?.map((story, index) => (
              <div
                key={index}
                className="flex md:flex-row flex-wrap w-sm-100 cursor-pointer items-center gap-10 p-2"
                style={{
                  width: dimensions.width < 500 ? "100%" : dimensions.width * 0.5,
                  height: dimensions.height * 0.6,
                  border: "1px solid white",
                  borderRadius: 10,
                }}
              >
                {story?.video_versions ? (
                  <div className="flex flex-col gap-5">
                    <video
                      onClick={(e) => console.log(e)}
                      controls={true}
                      src={story?.video_versions[0]?.url}
                      style={{
                        width: dimensions.width < 500 ? "100%" : dimensions.width * 0.5,
                        height: dimensions.height * 0.5,
                      }}
                    />
                    <h4 className="text-center dark:text-black text-black m-2 dark:bg-white bg-black">
                      {moment(story?.taken_at).format("dd/mm/yyyy")}
                    </h4>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    <img
                      src={story?.image_versions2?.candidates[0]?.url}
                      style={{
                        width: dimensions.width < 500 ? "100%" : dimensions.width * 0.5,
                        height: dimensions.height * 0.5,
                      }}
                    />
                    <h4 className="text-center dark:text-black text-black m-2 dark:bg-white bg-black">
                      {moment(story?.taken_at).format("dd/mm/yyyy")}
                    </h4>
                  </div>
                )}
              </div>
            ))
          ) : (
            <h4 className="text-center dark:text-white text-black">
              No Stories Available
            </h4>
          )
        ) : activeTab === "Posts" ? (
          <h3 className="text-center dark:text-white text-black">Post</h3>
        ) : (
          <div className="flex flex-row overflow-scroll self-center items-center gap-10 p-5">
            {highlights?.length > 0 ? (
              highlights?.map((highlight, index) => (
                <HighlightTray key={index} highlight={highlight} />
              ))
            ) : (
              <h3 className="text-center dark:text-white text-black">
                No Highlights Found For The User
              </h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileData;
