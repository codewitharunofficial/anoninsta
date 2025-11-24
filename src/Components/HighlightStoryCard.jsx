import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoModal from "./VideoModal";
import { AiFillPlayCircle } from "react-icons/ai";
import moment from "moment";

const HighlightStoryCard = ({ story }) => {
    const [storyImage, setStoryImage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchBypassedImage = async (url) => {
        try {
            const { data } = await axios.post(
                `/api/highlight-cover/${encodeURIComponent(url)}`
            );
            if (data) setStoryImage(data);
        } catch (err) {
            console.error("Error fetching highlight story image:", err);
        }
    };

    useEffect(() => {
        const url =
            story?.image_versions2?.candidates?.[0]?.url ||
            story?.image_versions?.items?.[0]?.url;

        if (url) fetchBypassedImage(url);
    }, [story]);

    const downloadBufferedMedia = async (url) => {
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
            link.download = `${story?.user?.username}_story_${story?.taken_at_date
                }.${story?.media_type === 2 ? "mp4" : "jpg"}`;
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(downloadableUrl);
            link.remove();
        } catch (err) {
            console.error("Download failed:", err);
        }
    };

    const mediaUrl =
        story?.media_type === 2
            ? story?.video_versions?.[0]?.url
            : storyImage;

    return (
        <div
            className="
        flex flex-col w-4/5 md:w-96 
        items-center justify-center 
        border border-white rounded-xl 
        p-2 relative cursor-pointer 
        hover:shadow-xl transition-all
      "
        >
            {isModalOpen && (
                <VideoModal
                    url={mediaUrl}
                    onClose={closeModal}
                    mediaType={story?.media_type}
                />
            )}

            {story?.media_type === 2 && (
                <AiFillPlayCircle
                    onClick={openModal}
                    size={90}
                    className="
            absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 
            text-white bg-black/60 rounded-full p-3
            hover:scale-110 transition-all
          "
                />
            )}

            <div className="flex flex-col w-full relative">
                <img
                    src={storyImage || "/placeholder.jpg"}
                    onClick={openModal}
                    className="
            w-full h-full rounded-md 
            object-cover hover:opacity-90 transition-all
          "
                    alt="highlight-story"
                />

                <h4
                    className="
            absolute bottom-4 left-1/2 
            -translate-x-1/2 text-white 
            text-lg font-semibold 
            drop-shadow-md
          "
                >
                    {moment(story?.taken_at * 1000).fromNow()}
                </h4>
            </div>

            <button
                onClick={() =>
                    downloadBufferedMedia(
                        story?.media_type === 2
                            ? story?.video_versions?.[0]?.url
                            : story?.image_versions2?.candidates?.[0]?.url
                    )
                }
                className="
          w-full bg-white text-black 
          p-3 rounded-md mt-3 
          border border-gray-300 
          font-semibold text-lg
          hover:bg-purple-600 hover:text-white transition-all
        "
            >
                Download
            </button>
        </div>
    );
};

export default HighlightStoryCard;
