import axios from "axios";
import React, { useEffect, useState } from "react";

const HighlightTray = ({ highlight }) => {

  const [imageUrl, setImageUrl] = useState();

  async function getByassPassedImage(url) {
    const { data } = await axios.post(
      `http://192.168.138.47:8081/highlight-cover/${encodeURIComponent(url)}`);
    // console.log(data);
    setImageUrl(data);
  }

  useEffect(() => {
    if (highlight?.cover_media?.cropped_image_version?.url) {
      getByassPassedImage(highlight?.cover_media?.cropped_image_version?.url);
    }
  }, [highlight]);

  return (
    <div className="flex flex-col gap-1 p-2 items-center">
      <img
      className="border-pink-600 border-2 cursor-pointer"
        src={imageUrl}
        style={{ minWidth: 80, minHeight: 80, width: 80, height: 80, borderRadius: 40 }}

      />
      <h4 className="text-black dark:text-black hover:text-white hover:underline underline-offset-2" >{highlight?.title}</h4>
    </div>
  );
};

export default HighlightTray;
