import React, { useState } from "react";
import moment from "moment";
import axios from "axios";

const UserPost = ({ posts, posts_count }) => {
  // const [imageUrl, setImageUrl] = useState("");

  async function getByassPassedImage(url) {
    const { data } = await axios.post(
      `https://instagram-api-mhg3.onrender.com/highlight-cover/${encodeURIComponent(url)}`
    );
    return data;
  }

  return (
    <div className="w-screen flex flex-row flex-wrap justify-items-center self-center gap-10 h-auto">
      {posts?.length > 0 ? (
        posts?.map((post, index) => (
          <div
            key={index}
            className="flex flex-row w-96 h-2/5 flex-wrap w-sm-100 cursor-pointer items-center gap-10 p-2  bg-gray-500"
            style={{
              border: "1px solid white",
              borderRadius: 10,
            }}
          >
            {post?.video_versions ? (
              <div className="flex w-96 flex-col gap-3 items-center p-5 ">
                <video
                  className="w-md-1/2 w-sm-full h-full"
                  onClick={(e) => console.log(e)}
                  controls={true}
                  src={post?.video_versions[0]?.url}
                />
                <div className="flex flex-col items-center gap-2 bg-white w-full p-5">
                  <div className="flex flex-row items-center justify-between w-full ">
                    <h4 className="text-start dark:text-black text-black ">
                      {post?.caption?.text}
                    </h4>
                    <p className="text-start dark:text-black text-black text-sm">
                      {moment(post?.caption?.created_at).date()}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full ">
                    <h4 className="text-start dark:text-black text-black ">
                      Likes: {post?.like_count}
                    </h4>
                    <p className="text-start dark:text-black text-black text-sm">
                      Comments: {post?.comment_count}
                    </p>
                  </div>
                </div>
                <button className="btn bg-purple-400 text-black p-3 self-center">
                  See Comments
                </button>
              </div>
            ) : (
              <div className="flex w-96 flex-col gap-3 items-center p-5 bg-white">
                <img
                  className="w-md-1/2 w-sm-full h-full"
                  src={getByassPassedImage(
                    post?.image_versions2?.candidates[0]?.url
                  )}
                />
                <div className="flex flex-col items-center gap-2  bg-white w-full p-5">
                  <div className="flex flex-row items-center justify-between w-full ">
                    <h4 className="text-start dark:text-black text-black ">
                      {post?.caption?.text}
                    </h4>
                    <p className="text-start dark:text-black text-black text-sm">
                      {moment(post?.caption?.created_at).date()}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full ">
                    <h4 className="text-start dark:text-black text-black ">
                      Likes: {post?.like_count}
                    </h4>
                    <p className="text-start dark:text-black text-black text-sm">
                      Comments: {post?.comment_count}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : posts_count > 0 && posts?.length <= 0 ? (
        <h4>The Account Is Private</h4>
      ) : (
        <h4>No Posts Available</h4>
      )}
    </div>
  );
};

export default UserPost;
