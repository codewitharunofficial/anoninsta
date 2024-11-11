import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AiFillLike, AiFillPlayCircle } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import PostModal from "./PostModal";
const UserPost = ({ post }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  async function getByassPassedImage(url) {
    const { data } = await axios.post(
      `https://instagram-api-mhg3.onrender.com/highlight-cover/${encodeURIComponent(url)}`
    );
    if (data) {
      setImageUrl(data);
    }
  }

  useEffect(() => {
    if (post?.image_versions?.items[0]?.url) {
      getByassPassedImage(post?.image_versions?.items[0]?.url);
    }
  }, [post]);

  const getBufferedVideo = async (url) => {
    try {
      const response = await fetch(
        `https://instagram-api-mhg3.onrender.com/${
          post?.media_type === 2 ? "download-video" : "download-image"
        }/${encodeURIComponent(url)}/${post?.user?.username}`
      );

      if (response.ok) {
        const blob = await response.blob();
        const downloadableUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadableUrl;
        link.download = `${post?.user?.username}_post_${post?.taken_at}.${
          post?.media_type === 2 ? "mp4" : "jpg"
        }`;
        document.body.appendChild(link);
        link.click();

        //clean up
        document.body.removeChild(link);
        window.URL?.revokeObjectURL(downloadableUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className=" flex flex-row w-4/5 md:w-96 sm:w-4/5 h-2/5 flex-wrap items-center gap-10 p-2  bg-gray-500 justify-center self-center relative"
      style={{
        border: "1px solid white",
        borderRadius: 10,
      }}
    >
      {isModalOpen && (
        <PostModal
          postId={post?.pk}
          onClose={closeModal}
          url={post?.media_type === 2 ? post?.video_versions[0]?.url : imageUrl}
          postCode={post?.code}
          mediaType={post?.media_type}
        />
      )}
      <AiFillPlayCircle
        onClick={() => {
          openModal();
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
          display: post?.media_type === 2 && imageUrl ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          cursor: "pointer",
        }}
      />
      <div className="flex w-full min-h-96 h-full flex-col bg-gray-500 ">
        <img
          onClick={() => {
            openModal();
          }}
          className=" max-h-96 min-h-96 cursor-pointer"
          src={imageUrl}
        />
        <div className="flex flex-col items-center gap-2  bg-white w-full p-5 rounded-b-md">
          <button
            onClick={() =>
              getBufferedVideo(
                post?.media_type === 2 ? post?.video_versions[0]?.url : post?.image_versions?.items[0]?.url
              )
            }
            className="btn w-full bg-white text-black p-5 rounded-md text-center border-2 border-gray-400 font-bold hover:bg-purple-600"
          >
            Download
          </button>
          <div className="flex flex-row items-center justify-between w-full ">
            <h4 className="text-start dark:text-black text-black ">
              {post?.caption?.text?.slice(0, 60)}...
            </h4>
          </div>
          <div className="flex flex-row items-center gap-10 w-full ">
            <h4 className="text-start dark:text-black text-black ">
              <AiFillLike /> {post?.like_count}
            </h4>
            <p className="text-start dark:text-black text-black text-sm">
              <FaComment /> {post?.comment_count}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
