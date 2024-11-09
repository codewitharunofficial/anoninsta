import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AiFillLike, AiFillPlayCircle } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import VideoModal from "./VideoModal";
const UserPost = ({ post }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const openModal = () => {setModalOpen(true)}
  const closeModal = () => {setModalOpen(false)}

  async function getByassPassedImage(url) {
    setImageLoading(true);
    const { data } = await axios.post(
      `https://instagram-api-mhg3.onrender.com/highlight-cover/${encodeURIComponent(url)}`
    );
    if (data) {
      setImageUrl(data);
      setImageLoading(false);
    }
  }

  useEffect(() => {
    if (post?.image_versions2?.candidates[0]?.url) {
      getByassPassedImage(post?.image_versions2?.candidates[0]?.url);
    }
  }, [post]);

  // console.log(post?.pk);

  return (
    <div
      className=" flex flex-row md:w-96 sm:w-4/5 w-4/5 h-2/5 flex-wrap w-sm-100 items-center gap-10 p-2  bg-gray-500 justify-center self-center relative"
      style={{
        border: "1px solid white",
        borderRadius: 10,
      }}
    >
    <VideoModal isOpen={isModalOpen} onClose={closeModal} videoUrl={post?.media_type === 2 ? post?.video_versions[0]?.url : ""} postCode={post?.code} />
      <AiFillPlayCircle
      onClick={() => {openModal()}}
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
          display: post?.media_type === 2 ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          cursor: "pointer",
        }}
      />
      <div className="flex flex-col bg-gray-500">
        <img className="w-md-1/2 w-sm-full h-full" src={imageUrl} />
        <div className="flex flex-col items-center gap-2  bg-white w-full p-5">
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
