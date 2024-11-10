import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import VideoModal from "./VideoModal";
import { AiFillPlayCircle } from "react-icons/ai";

const StoryCard = ({ story }) => {
  const [storyImage, setStoryImage] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setIsModalOpen(false);
  };

  async function getByassPassedImage(url) {
    const { data } = await axios.post(
      `https://instagram-api-mhg3.onrender.com/highlight-cover/${encodeURIComponent(url)}`
    );
    if (data) {
      setStoryImage(data);
    }
  }

  useEffect(() => {
    if (story?.image_versions?.items[0]?.url) {
      getByassPassedImage(story?.image_versions?.items[0]?.url);
    }
  }, [story, story?.image_versions?.items[0]?.url]);

  return (
    <div
      className="flex flex-row md:w-96 sm:w-4/5 w-4/5 h-1/3 flex-wrap w-sm-100 cursor-pointer items-center justify-center self-center relative "
      style={{
        border: "1px solid white",
        borderRadius: 10,
      }}
    >
      {isModalOpen && (
        <VideoModal
          videoUrl={story?.video_versions[0]?.url}
          onClose={onClose}
        />
      )}
      <AiFillPlayCircle
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="hover:bg-black"
        color="white"
        size={100}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50px",
          height: "50px",
          background: "rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          cursor: "pointer",
        }}
      />
      <div className="flex flex-col gap-3">
        <img className="w-md-1/2 w-sm-full h-full" src={storyImage} />
        <h4
          style={{ transform: "translate(-50%, -100%)" }}
          className="text-center dark:text-white text-white bg-transparent absolute bottom-20 left-1/2 text-xl"
        >
          {moment(story?.taken_at_date).fromNow()}
        </h4>
      </div>
      <a
        className="btn w-full bg-white text-black p-5 rounded-md text-center border-2 border-gray-400 font-bold"
        target="_blank"
        download={`${story?.user?.username}_story.${
          story?.media_type === 2 ? "mp4" : "jpg"
        }`}
        href={story?.media_type === 2 ? story?.video_versions[0]?.url : storyImage}
      >
        Download
      </a>
    </div>
  );
};

export default StoryCard;
