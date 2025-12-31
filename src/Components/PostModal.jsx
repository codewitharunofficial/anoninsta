import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Comment from "./Comment";

const PostModal = ({ postId, onClose, url, mediaType }) => {
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    if (showComments) {
      setShowComments(false);
      return;
    }

    if (comments.length > 0) {
      setShowComments(true);
      return;
    }

    try {
      setLoading(true);
      setError(false);

      const { data } = await axios.post(`/api/post-comments/${postId}`);

      if (data?.success) {
        setComments(data?.comments?.items || []);
        setShowComments(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      {/* Modal */}
      <div
        className="
          relative bg-white
          w-full h-full
          md:w-[95%] md:max-w-[900px] md:h-[92%]
          rounded-none md:rounded-xl
          shadow-2xl
          flex flex-col
          pt-14 px-4 pb-4
        "
      >
        {/* Close Button (ALWAYS ON TOP) */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            z-50
            bg-black text-white
            rounded-full px-2 py-1
            hover:bg-gray-800
          "
        >
          ✖
        </button>

        {/* Media */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          {mediaType === 2 ? (
            <video
              src={url}
              controls
              className="max-h-full w-full rounded-lg pointer-events-auto"
            />
          ) : (
            <img
              src={url}
              alt="Post"
              className="max-h-full w-full object-contain rounded-lg pointer-events-none"
            />
          )}
        </div>

        {/* Actions */}
        <button
          onClick={fetchComments}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white rounded-md p-2"
        >
          {loading
            ? "Please wait..."
            : showComments
            ? "Hide Comments"
            : "Show Comments"}
        </button>

        {/* Comments */}
        {showComments && (
          <div className="mt-4 border-t pt-3 h-48 overflow-y-auto">
            <h4 className="font-bold mb-3 text-lg">Comments</h4>

            {comments.length > 0 ? (
              <div className="flex flex-col gap-3">
                {comments.map((comment, index) => (
                  <Comment key={index} comment={comment} />
                ))}
              </div>
            ) : error ? (
              <p className="text-center font-semibold">
                Unable to load comments
              </p>
            ) : (
              <p className="text-center font-semibold">No comments available</p>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default PostModal;