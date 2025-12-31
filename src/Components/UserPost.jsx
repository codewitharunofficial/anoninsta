import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AiFillLike, AiFillPlayCircle } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import PostModal from "./PostModal";

const UserPost = ({ post }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (post?.media_type !== 2) {
      getImage(post?.image_versions?.items[0]?.url);
    }
  }, [post]);

  async function getImage(url) {
    const { data } = await axios.post(
      `/api/highlight-cover/${encodeURIComponent(url)}`
    );
    if (data) setImageUrl(data);
  }

  const downloadMedia = async (url, setIsDownloading) => {
    try {
      setIsDownloading(true);
      const type = post?.media_type === 2 ? "download-video" : "download-image";

      const response = await fetch(
        `/api/${type}/${encodeURIComponent(url)}/${post?.user?.username}`
      );

      if (!response.ok) return;

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${post?.user?.username}_post_${post?.taken_at}.${
        post?.media_type === 2 ? "mp4" : "jpg"
      }`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      setIsDownloading(false);
    } catch (error) {
      console.error(error);
      setIsDownloading(false);
      alert(error?.message || "Something went wrong while downloading!!");
    }
  };

  return (
    <>
      {/* Modal */}
      {isModalOpen && (
        <PostModal
          postId={post?.id}
          onClose={() => setModalOpen(false)}
          url={
            post?.media_type === 2 ? post?.video_versions?.[0]?.url : imageUrl
          }
          mediaType={post?.media_type}
        />
      )}

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-lg shadow-md w-full max-w-xs mx-auto flex flex-col overflow-hidden">
        {/* Media */}
        <div className="relative w-full h-64 bg-black">
          {post?.media_type === 2 ? (
            <video
              onClick={() => setModalOpen(true)}
              src={post?.video_versions?.[0]?.url}
              className="w-full h-full object-cover cursor-pointer"
            />
          ) : (
            <img
              onClick={() => setModalOpen(true)}
              src={imageUrl}
              className="w-full h-full object-cover cursor-pointer"
            />
          )}

          {post?.media_type === 2 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <AiFillPlayCircle
                onClick={() => setModalOpen(true)}
                className="text-white opacity-80 hover:scale-110 transition cursor-pointer"
                size={60}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white p-4 flex flex-col gap-3 flex-grow">
          {post?.caption?.text && (
            <p className="text-gray-800 text-sm line-clamp-2">
              {post.caption.text}
            </p>
          )}

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

        {/* Download Button (FULL WIDTH BOTTOM) */}
        <button
          onClick={() =>
            downloadMedia(
              post?.media_type === 2
                ? post?.video_versions?.[0]?.url
                : post?.image_versions?.items?.[0]?.url,
              setIsDownloading
            )
          }
          className="
            w-full py-3
            bg-purple-600 text-white
            font-semibold
            hover:bg-purple-700
            transition
          "
        >
          {isDownloading ? "Downloading..." : "Download"}
        </button>
      </div>
    </>
  );
};

export default UserPost;
