import moment from "moment";
import React, { useEffect, useState } from "react";

const Comment = ({ comment }) => {
  const [imageUrl, setImageUrl] = useState();

  async function getByassPassedImage(url) {
    // setImageLoading(true);
    const { data } = await axios.post(
      `https://instagram-api-mhg3.onrender.com/highlight-cover/${encodeURIComponent(url)}`
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
  }, [comment]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <img
          src={imageUrl}
          style={{ width: 30, height: 30 }}
          className="rounded-xl"
        />
        <h3 className="text-black text-lg font-bold">{`${comment?.user?.username} ${comment?.user?.full_name}`}</h3>
      </div>
      <h4>{comment?.text}</h4>
      <p>{moment(comment?.created_at).toDate()}</p>
    </div>
  );
};

export default Comment;
