import axios from "axios";
import React, { useEffect, useState } from "react";
import StoryCard from "./StoryCard";
import { useHighlight } from "@/context/Highlights";

const HighlightTray = ({ highlight }) => {

  const [imageUrl, setImageUrl] = useState();
  const { setMedia} = useHighlight();

  async function getByassPassedImage(url) {
    const { data } = await axios.post(
      `/api/highlight-cover/${encodeURIComponent(url)}`
    );
    // console.log(data);
    setImageUrl(data);
  }

  useEffect(() => {
    if (highlight?.cover_media?.cropped_image_version?.url) {
      getByassPassedImage(highlight?.cover_media?.cropped_image_version?.url);
    }
  }, [highlight]);

  const loadHighlight = async (id) => {
    // console.log("Highlight ID: ", id);
    try {
      const { data } = await axios.post(`/api/highlight-stories/${id}`);
      setMedia(data.highlights[id].items);
      // console.log("Stories From Highlight: ", data.highlights[id].items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => loadHighlight(highlight.id)}
      className="flex flex-col gap-1 p-2 items-center"
    >
      <img
        className="border-pink-600 border-2 cursor-pointer"
        src={imageUrl}
        style={{
          minWidth: 80,
          minHeight: 80,
          width: 80,
          height: 80,
          borderRadius: 40,
        }}
      />
      <h4 className="text-black dark:text-black hover:text-white hover:underline underline-offset-2">
        {highlight?.title}
      </h4>
    </div>
  );
};

export default HighlightTray;
