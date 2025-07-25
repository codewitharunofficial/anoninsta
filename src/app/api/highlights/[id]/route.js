import axios from "axios";

export async function POST(req, { params }) {
  try {
    const { id } = params;
    if (!id) {
      return new Response(
        JSON.stringify(
          {
            success: false,
            message: "No User ID Provided",
          },
          { status: 400 }
        )
      );
    } else {
      const options = {
        method: "GET",
        url: "https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/highlights_by_user_id",
        params: {
          user_id: id,
        },
        headers: {
          "x-rapidapi-key":
            process.env.SCRAPPER_API_KEY,
          "x-rapidapi-host":
            "instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com",
        },
      };

      try {
        const { data } = await axios.request(options);
        return new Response(
          JSON.stringify(
            {
              success: true,
              message: "Highlights Fetched Successfully",
              highlights: data?.tray,
            },
            { status: 200 }
          )
        );
      } catch (error) {
        return new Response(
          JSON.stringify(
            {
              success: false,
              message: "Something went wrong",
              error,
            },
            { status: 400 }
          )
        );
      }
    }
  } catch (error) {
    return new Response(
      JSON.stringify(
        {
          success: false,
          message: "Something went wrong",
          error,
        },
        { status: 500 }
      )
    );
  }
}
