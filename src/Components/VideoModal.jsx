import axios from "axios";
import React, { useState } from "react";
import Comment from "./Comment";

const VideoModal = ({ isOpen, onClose, videoUrl, postCode }) => {
  if (!isOpen) return null;

  const [isShowingComments, setIsShowingComments] = useState(false);
  const [comments, setComments] = useState();

  const fetchComment = async () => {
    if (comments?.length === 0) {
      try {
        const { data } = await axios.post(
          `https://instagram-api-mhg3.onrender.com/post-comments/${postCode}`
        );
        if (data?.success) {
          console.log(data?.comments?.comments);
          setComments(data?.comments?.comments);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div style={styles.overlay}>
      <div
        className="flex flex-col gap-5 items-center justify-center"
        style={styles.modal}
      >
        <button onClick={() => onClose()} style={styles.closeButton}>
          ✖
        </button>
        <video
          className={`${isShowingComments ? "h-3/5" : "h-4/5"}`}
          controls
          style={styles.video}
          src={videoUrl}
        />
        <button
          onClick={() => {
            setIsShowingComments(!isShowingComments);
            fetchComment();
          }}
          className="btn bg-green-500 text-white rounded-md p-2 hover:bg-green-700 items-center"
        >
          {isShowingComments ? "Hide Comments" : "Show Comments"}
        </button>
        {isShowingComments && (
          <div className="w-full h-40 border-t-2 border-black overflow-scroll">
            <h4 className="text-black font-bold text-lg">Comments</h4>
            <div className="w-full flex flex-col gap-2">
              {comments?.length > 0 ? (
                comments?.map((comment, index) =>
                    <Comment key={index} comment={comment} />
                )
              ) : (
                <h4 className="text-black font-bold text-center">
                  No Comments Available
                </h4>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: "5%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    overflow: "scroll",
  },
  modal: {
    position: "relative",
    width: "80%",
    maxWidth: "700px",
    background: "#fff",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    height: "90%",
    // maxHeight: "80%"
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "20px",
    cursor: "pointer",
    background: "none",
    border: "none",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    borderRadius: "8px",
  },
};

export default VideoModal;
