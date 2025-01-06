import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

const Comment = ({ comment }) => {
  const [imageUrl, setImageUrl] = useState();

  async function getByassPassedImage(url) {
    // setImageLoading(true);
    const { data } = await axios.post(
      `/api/highlight-cover/${encodeURIComponent(
        url
      )}`
    );
    if (data) {
      setImageUrl(data);
      //   setImageLoading(false);
    }
  }

  useEffect(() => {
    if (comment?.user?.profile_pic_url) {
      getByassPassedImage(comment?.user?.profile_pic_url);
    }
  }, [comment, comment?.user?.profile_pic_url]);

  return (
    <div
      className="w-full flex flex-col gap-2 "
      style={{ borderBottom: "0.5px solid gray" }}
    >
      <div className="flex w-1/2 flex-row gap-2 ">
        <img
          src={imageUrl}
          style={{ width: 30, height: 30 }}
          className="rounded-xl"
        />
        <h3 className="text-blue-500 text-md font-bold underline underline-offset-2">{`${comment?.user?.username}`}</h3>
      </div>
      <h4 className="text-black text-sm font-semibold ml-10">
        {comment?.text}
      </h4>
      <p className="text-gray-700 text-xs text-end">
        {moment(comment?.created_at * 1000).format("DD-MM-YYYY")}
      </p>
    </div>
  );
};

export default Comment;

const className = {
  userName: "",
};
