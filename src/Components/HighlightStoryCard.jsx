import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoModal from "./VideoModal";
import { AiFillPlayCircle } from "react-icons/ai";
import moment from "moment";

const HighlightStoryCard = ({ story }) => {
    const [storyImage, setStoryImage] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState();

    const onClose = () => {
        setIsModalOpen(false);
    };

    const isOpen = () => {
        setIsModalOpen(true);
    };

    async function getByassPassedImage(url) {
        const { data } = await axios.post(
            `/api/highlight-cover/${encodeURIComponent(url)}`
        );
        if (data) {
            setStoryImage(data);
        }
    }

    useEffect(() => {
        if (story?.image_versions2) {
            getByassPassedImage(
                story?.image_versions2?.candidates[0]?.url
            );
        }
    }, [story?.image_versions2]);

    const getBufferedVideo = async (url) => {
        try {
            const response = await fetch(
                `/api/${story?.media_type === 2 ? "download-video" : "download-image"
                }/${encodeURIComponent(url)}/${story?.user?.username}`
            );

            if (response.ok) {
                const blob = await response.blob();
                const downloadableUrl = window.URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = downloadableUrl;
                link.download = `${story?.user?.username}_story_${story?.taken_at_date
                    }.${story?.media_type === 2 ? "mp4" : "jpg"}`;
                document.body.appendChild(link);
                link.click();

                //clean up
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadableUrl);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                    url={
                        story?.video_versions ? story?.video_versions[0]?.url : storyImage
                    }
                    onClose={onClose}
                    mediaType={story?.video_versions ? 2 : 1}
                    isOpen={isOpen}
                />
            )}
            <AiFillPlayCircle
                onClick={() => {
                    isOpen();
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
                    display: story?.media_type === 2 ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    cursor: "pointer",
                }}
            />
            <div className="flex flex-col gap-3">

                <img
                    onClick={() => isOpen()}
                    className="sm-w-full md-w-7/8 h-full rounded-md"
                    src={storyImage}
                />

                <h4
                    style={{ transform: "translate(-50%, -100%)" }}
                    className="text-center dark:text-white text-white bg-transparent absolute bottom-20 left-1/2 text-xl"
                >
                    {moment(story?.taken_at * 1000).fromNow()}
                </h4>
            </div>
            <button
                onClick={() =>
                    getBufferedVideo(
                        story?.media_type === 2
                            ? story?.video_versions[0]?.url
                            : story?.image_versions2[0]?.url
                    )
                }
                className="btn w-full bg-white text-black p-5 rounded-md text-center border-2 border-gray-400 font-bold"
            >
                Download
            </button>
        </div>
    );
};

export default HighlightStoryCard;
