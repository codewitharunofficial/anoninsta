import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

const StoryCard = ({ story }) => {
  const [storyImage, setStoryImage] = useState();

  async function getByassPassedImage(url) {
    const { data } = await axios.post(
      `https://instagram-api-mhg3.onrender.com/highlight-cover/${encodeURIComponent(url)}`
    );
    if (data) {
      setStoryImage(data);
    }
  }

  useEffect(() => {
    if (story?.image_versions2?.candidates[0]?.url) {
      getByassPassedImage(story?.image_versions2?.candidates[0]?.url);
    }
  }, [story]);

  return (
    <div
      className="flex flex-row md:w-96 sm:w-4/5 w-4/5 h-2/5 flex-wrap w-sm-100 cursor-pointer items-center justify-center self-center"
      style={{
        border: "1px solid white",
        borderRadius: 10,
      }}
    >
      <div className="flex flex-col gap-5">
        <img className="w-md-1/2 w-sm-full h-full" src={storyImage} />
        <h4 className="text-center dark:text-black text-black m-2 dark:bg-white bg-black">
          {moment(story?.taken_at).date()}
        </h4>
      </div>
    </div>
  );
};

export default StoryCard;
