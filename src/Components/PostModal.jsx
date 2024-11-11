import axios from "axios";
import React, { useState } from "react";
import Comment from "./Comment";
import { useUser } from "@/context/UserConext";

const PostModal = ({ postId, onClose, url, postCode, mediaType }) => {
  console.log(postId);

  const [isShowingComments, setIsShowingComments] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [ifError, setIfError] = useState(false);
  const { user, setUser } = useUser();

  const fetchComments = async () => {
    setIsShowingComments(!isShowingComments);
    if (user?.comments.length === 0) {
      try {
        setLoadingComments(true);
        const { data } = await axios.post(
          `http://192.168.138.47:8081/post-comments/${postCode}`
        );
        if (data?.success) {
          console.log(data?.comments?.comments);
          setUser({ ...user, comments: data?.comments?.comments });
          setLoadingComments(false);
        }
      } catch (error) {
        console.log(error);
        setLoadingComments(false);
        setIfError(true);
      }
    }
  };

  return (
    <div style={styles.overlay}>
      <div
        className="flex flex-col gap-5 items-center justify-center"
        style={styles.modal}
      >
        <button
          onClick={() => {
            onClose();
            setUser({ ...user, comments: [] });
          }}
          style={styles.closeButton}
        >
          ✖
        </button>
        {mediaType === 2 ? (
          <video
            className={`${isShowingComments ? "h-3/5" : "h-4/5"}`}
            controls
            style={styles.video}
            src={url}
          />
        ) : (
          <img
            className={`${isShowingComments ? "h-3/5" : "h-4/5"}`}
            controls
            style={styles.image}
            src={url}
          />
        )}
        <button
          onClick={() => fetchComments()}
          className="btn bg-green-500 text-white rounded-md p-2 hover:bg-green-700 items-center"
        >
          {isShowingComments
            ? "Hide Comments"
            : loadingComments
            ? "Please Wait..."
            : "Show Comments"}
        </button>
        {isShowingComments && (
          <div className="w-full h-40 border-t-2 border-black overflow-scroll">
            <h4 className="text-black font-bold text-lg">Comments</h4>
            <div className="w-full flex flex-col gap-3 p-3">
              {user?.comments?.length > 0 ? (
                user?.comments?.map((comment, index) => (
                  <Comment key={index} comment={comment} />
                ))
              ) : ifError ? (
                <h4 className="text-black font-bold text-center">
                  Unable To Laod Comments
                </h4>
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
    border: "none",
    backgroundColor: "black",
    color: "white",
    padding: 5,
    borderRadius: 10,
  },
  video: {
    width: "100%",
    borderRadius: "8px",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    height: "80%",
    objectFit: "contain",
  },
};

export default PostModal;
