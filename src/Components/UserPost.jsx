import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AiFillLike, AiFillPlayCircle } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import PostModal from "./PostModal";

const UserPost = ({ post }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  async function getImage(url) {
    const { data } = await axios.post(
      `/api/highlight-cover/${encodeURIComponent(url)}`
    );
    if (data) setImageUrl(data);
  }

  useEffect(() => {
    if (post?.media_type !== 2) {
      getImage(post?.image_versions?.items[0]?.url);
    }
  }, [post?.media_type]);

  const downloadMedia = async (url) => {
    try {
      const type = post?.media_type === 2 ? "download-video" : "download-image";
      const response = await fetch(
        `/api/${type}/${encodeURIComponent(url)}/${post?.user?.username}`
      );

      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${post?.user?.username}_post_${post?.taken_at}.${post?.media_type === 2 ? "mp4" : "jpg"
          }`;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-lg overflow-hidden shadow-md w-full max-w-xs mx-auto flex flex-col">

      {isModalOpen && (
        <PostModal
          postId={post?.id}
          onClose={closeModal}
          url={post?.media_type === 2 ? post?.video_versions?.[0]?.url : imageUrl}
          postCode={post?.code}
          mediaType={post?.media_type}
        />
      )}

      {/* Media */}
      <div className="relative w-full h-64 overflow-hidden bg-black">
        {post?.media_type === 2 ? (
          <video
            onClick={openModal}
            src={post?.video_versions?.[0]?.url}
            className="w-full h-full object-cover cursor-pointer"
          />
        ) : (
          <img
            onClick={openModal}
            src={imageUrl}
            className="w-full h-full object-cover cursor-pointer"
          />
        )}

        {/* Play Icon */}
        {post?.media_type === 2 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <AiFillPlayCircle
              onClick={openModal}
              className="text-white cursor-pointer opacity-80 hover:scale-110 transition-all"
              size={60}
            />
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-white p-4 flex flex-col gap-3 rounded-b-lg">

        {/* Download Button */}
        <button
          onClick={() =>
            downloadMedia(
              post?.media_type === 2
                ? post?.video_versions?.[0]?.url
                : post?.image_versions?.items?.[0]?.url
            )
          }
          className="w-full py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition"
        >
          Download
        </button>

        {/* Caption */}
        {post?.caption?.text && (
          <p className="text-gray-800 text-sm">
            {post.caption.text.length > 60
              ? post.caption.text.slice(0, 60) + "..."
              : post.caption.text}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-gray-900 text-sm">
          <span className="flex items-center gap-1">
            <AiFillLike size={18} /> {post?.like_count}
          </span>

          <span className="flex items-center gap-1">
            <FaComment size={16} /> {post?.comment_count}
          </span>

          <span className="text-orange-600 text-xs">
            {moment(post?.taken_at * 1000).format("DD/MM/YYYY")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
