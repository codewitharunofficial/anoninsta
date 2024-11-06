import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";
import moment from "moment";

const ProfileData = ({
  fullName,
  profilePhoto,
  stories,
  userName,
  following,
  followers,
  bio,
}) => {
  const [activeTab, setActiveTab] = useState("Stories");

  // const image = profilePhoto?.toString('base64');

  const height = window.screen.height;
  const width = window.screen.width;

  console.log(height, width);

  useEffect(() => {
    stories?.length > 0 &&
      stories?.map((e) => {
        console.log(e?.video_versions);
      });
  }, []);

  return (
    <div
      className="grid row-auto col-span-6 justify-items-center gap-5 p-10 border-gray-50"
      style={{ borderRadius: 10 }}
    >
      <div className="grid col-md-6">
        <div className="flex flex-col">
          <img
            src={profilePhoto}
            style={{ width: 150, height: 150, borderRadius: 100 }}
            alt="Profile"
          />
        </div>
      </div>
      <div className="grid col-md-6 p-5">
        <div className="flex flex-col">
          <h4>{fullName}</h4>
          <a
            href={`https://www.instagram.com/${userName}`}
            target="_blank"
            className="hover:text-orange-600 cursor-pointer"
          >
            {userName}
          </a>
          <div className="flex flex-row flex-wrap w-40 items-center self-center justify-between p-5">
            <span>
              <h4>Followers: {followers}</h4>
            </span>
            <span>
              <h4>Following: {followers}</h4>
            </span>
          </div>
          <h5>{bio}</h5>
        </div>
      </div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex md:flex-row *:flex-col row-auto flex-wrap items-center self-center gap-10 h-auto p-5">
        {stories?.length > 0 ? (
          stories?.map((story, index) => (
            <div
              key={index}
              className="flex md:flex-row flex-wrap w-sm-100 cursor-pointer items-center gap-10 p-2"
              style={{
                width: width < 500 ? "100%" : width * 0.4,
                height: height * 0.6,
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
                      width: "100%",
                      height: height * 0.5,
                    }}
                  />
                  <h4 className="text-center dark:text-black text-black m-2 dark:bg-white bg-black">
                    {moment(story?.taken_at).format("dd/mm/yyyy")}
                  </h4>
                </div>
              ) : (
                <img
                  src={story?.image_versions2?.candidates[0]?.url}
                  style={{ width: width * 0.6, height: height * 0.6 }}
                />
              )}
            </div>
          ))
        ) : (
          <h4 className="text-center dark:text-white text-black">
            No Stories Available
          </h4>
        )}
      </div>
    </div>
  );
};

export default ProfileData;
