import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";
import moment from "moment";
import { useTabs } from "@/context/TabContext";
import HighlightTray from "./HighlightTray";
import PageLoader from "./PageLoader";
import UserPost from "./UserPost";

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
  isHighlightsLoading,
  isPostsLoading,
  posts_count
}) => {
  const { activeTab, setActiveTab } = useTabs();

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
    <div className="flex flex-col w-screen items-center justify-items-center self-center gap-5 p-10">
      <div
        className={`flex flex-col w-screen border-gray-100 ${
          stories?.length > 0 && "border-2 border-pink-600"
        }`}
        style={{ width: 150, height: 150, borderRadius: 100 }}
      >
        <img
          src={profilePhoto}
          style={{ width: 150, height: 150, borderRadius: 100 }}
        />
      </div>

      <div className="flex flex-col gap-5 p-5 items-center justify-items-center">
        <div className="flex flex-col self-center items-center bg-purple-400 rounded-md p-5">
          <h3 className="text-black text-xl">{fullName}</h3>
          <a
            href={`https://www.instagram.com/${userName}`}
            target="_blank"
            className="underline underline-offset-2 text-blue-600 dark:text-blue-600 cursor-pointer"
          >
            {userName}
          </a>
          <div className="flex flex-row flex-wrap items-center self-center justify-between p-5 gap-10 sm:p-2">
            <span>
              <h4 className="text-black">Posts: {posts_count}</h4>
            </span>
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
      <div className="w-screen flex flex-row flex-wrap self-center items-center gap-10 h-auto p-5">
        {activeTab === "Stories" ? (
          stories?.length > 0 ? (
            stories?.map((story, index) => (
              <div
                key={index}
                className="flex flex-row w-96 h-2/5 flex-wrap w-sm-100 cursor-pointer items-center gap-10 p-2"
                style={{
                  border: "1px solid white",
                  borderRadius: 10,
                }}
              >
                {story?.video_versions ? (
                  <div className="flex w-96 flex-col gap-3 items-center ">
                    <video
                      className="w-md-1/2 w-sm-full h-full"
                      onClick={(e) => console.log(e)}
                      controls={true}
                      src={story?.video_versions[0]?.url}
                    />
                    <h4 className="text-center dark:text-black text-black m-2 dark:bg-white bg-black">
                      {moment(story?.taken_at).date()}
                    </h4>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    <img
                      className="w-md-1/2 w-sm-full h-full"
                      src={story?.image_versions2?.candidates[0]?.url}
                    />
                    <h4 className="text-center dark:text-black text-black m-2 dark:bg-white bg-black">
                      {moment(story?.taken_at).date()}
                    </h4>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-row w-full overflow-scroll justify-center self-center items-center gap-10 p-3 border-2 border-white rounded-md">
              <h3 className=" dark:text-white text-black">
                It seems the user hasn&apos;t posted any stories in last 24 hours
              </h3>
            </div>
          )
        ) : activeTab === "Profile" ? (
          posts?.length > 0 ? (
            <UserPost posts={posts} posts_count={posts_count} />
          ) : isPostsLoading ? (
            <PageLoader content={"Posts"} />
          ) : (
            <div className="flex flex-row w-full overflow-scroll self-center items-center justify-center gap-10 p-3 border-2 border-white rounded-md">
              <h3 className=" dark:text-white text-black">
                No Posts Available
              </h3>
            </div>
          )
        ) : isHighlightsLoading ? (
          <PageLoader content={"Highlights..."} />
        ) : (
          <div className="flex flex-row w-full overflow-scroll justify-center self-center items-center gap-10 p-3 border-2 border-white rounded-md">
            {highlights?.length > 0 ? (
              highlights?.map((highlight, index) => (
                <HighlightTray key={index} highlight={highlight} />
              ))
            ) : (
              <h3 className=" dark:text-white text-black">
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
