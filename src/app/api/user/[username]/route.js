import axios from "axios";

export async function POST(req, { params }, res) {
  // if (req.method !== 'GET') {
  //   return res.status(405).json({ message: 'Method not allowed' });
  // }

  try {
    const { username } = params;
    console.log("Query:", username);
    // console.log(username);
    const options = {
      method: "GET",
      url: "https://instagram210.p.rapidapi.com/ig_profile",
      params: {
        ig: username,
      },
      headers: {
        "x-rapidapi-key": process.env.INSTAGRAM_API_KEY,
        "x-rapidapi-host": "instagram210.p.rapidapi.com",
      },
    };

    try {
      const { data } = await axios.request(options);
      console.log("Data: ", data);
      // console.log(data);

      if (data[0]?.username) {
        const imageBuffer = await axios.get(data[0]?.profile_pic_url, {
          responseType: "arraybuffer",
        });
        const image_base64 = Buffer.from(imageBuffer.data, "binary").toString(
          "base64"
        );
        return new Response(
          JSON.stringify({
            success: true,
            message: "User Fetched Successfully",
            user: {
              userName: data[0]?.username,
              fullName: data[0]?.full_name,
              profile_pic: `data:${imageBuffer.headers["content-type"]};base64,${image_base64}`,
              follower: data[0]?.follower_count,
              following: data[0]?.following_count,
              bio: data[0]?.biography,
              id: data[0]?.pk,
              posts_count: data[0]?.media_count,
              isPrivate: data[0]?.is_private,
            },
          })
        );
      } else {
        return new Response(JSON.stringify({
          success: true,
          messgae: "No User Found",
          "status": 201
        }, {status: 201}))
      }
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Something went wrong",
          error,
        }, {status: 500})
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Something went wrong",
        error,
      }, {status: 500})
    );
  }
}
