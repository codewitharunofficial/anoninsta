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
        src={imageUrl}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <h4>{highlight?.title}</h4>
    </div>
  );
};

export default HighlightTray;
