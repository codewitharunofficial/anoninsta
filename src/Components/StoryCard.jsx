import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoModal from "./VideoModal";
import { AiFillPlayCircle } from "react-icons/ai";
import moment from "moment";

const StoryCard = ({ story }) => {
  const [storyImage, setStoryImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  async function fetchBypassedImage(url) {
    try {
      const { data } = await axios.post(
        `/api/highlight-cover/${encodeURIComponent(url)}`
      );
      if (data) setStoryImage(data);
    } catch (err) {
      console.error("Error fetching image:", err);
    }
  }

  useEffect(() => {
    if (story?.media_type !== 2) {
      const imgUrl =
        story?.image_versions?.items?.[0]?.url ||
        story?.image_versions2?.items?.[0]?.url;

      if (imgUrl) fetchBypassedImage(imgUrl);
    }
  }, [story?.media_type]);

  const downloadMedia = async (url) => {
    try {
      const response = await fetch(
        `/api/${story?.media_type === 2 ? "download-video" : "download-image"
        }/${encodeURIComponent(url)}/${story?.user?.username}`
      );

      if (!response.ok) return;

      const blob = await response.blob();
      const downloadableUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadableUrl;
      link.download = `${story?.user?.username}_story_${story?.taken_at_date}.${story?.media_type === 2 ? "mp4" : "jpg"
        }`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadableUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const previewUrl =
    story?.media_type === 2
      ? story?.video_versions?.[0]?.url
      : storyImage;

  return (
    <div
      className="flex flex-col w-4/5 md:w-96 items-center bg-gray-700 relative rounded-lg border border-white p-3 gap-3 cursor-pointer"
    >
      {isModalOpen && (
        <VideoModal
          url={previewUrl}
          mediaType={story?.media_type}
          onClose={handleClose}
        />
      )}

      {/* Play Icon for Videos */}
      {story?.media_type === 2 && (
        <AiFillPlayCircle
          onClick={handleOpen}
          size={80}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full cursor-pointer"
        />
      )}

      {/* Media Thumbnail */}
      {story?.media_type === 2 ? (
        <video
          src={previewUrl}
          onClick={handleOpen}
          className="w-full h-72 object-cover rounded-md"
        />
      ) : (
        <img
          src={previewUrl}
          onClick={handleOpen}
          className="w-full h-72 object-cover rounded-md"
          alt="Story"
        />
      )}

      {/* Timestamp */}
      <h4 className="text-center text-white bg-black bg-opacity-40 px-3 py-1 rounded mt-2">
        {moment(story?.taken_at * 1000).fromNow()}
      </h4>

      {/* Download Button */}
      <button
        onClick={() =>
          downloadMedia(
            story?.media_type === 2
              ? story?.video_versions?.[0]?.url
              : story?.image_versions?.items?.[0]?.url
          )
        }
        className="w-full bg-white text-black p-3 rounded-md font-bold border border-gray-400 hover:bg-purple-600 hover:text-white transition"
      >
        Download
      </button>
    </div>
  );
};

export default StoryCard;
