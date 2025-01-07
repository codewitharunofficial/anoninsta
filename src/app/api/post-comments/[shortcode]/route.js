import axios from "axios";

export async function POST(req, { params }) {
  try {
    const { shortcode } = params;
    console.log(shortcode);
    const options = {
      method: "GET",
      url: "https://instagram-scraper-api2.p.rapidapi.com/v1/comments",
      params: {
        code_or_id_or_url: shortcode,
      },
      headers: {
        "x-rapidapi-key": process.env.SCRAPPER_API_KEY,
        "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
      },
    };

    try {
      const { data } = await axios.request(options);
      // console.log(data);
      if (data) {
        return new Response(
          JSON.stringify(
            {
              success: true,
              message: "Comments Fetching Successfull",
              comments: data?.data,
            },
            { status: 200 }
          )
        );
      }
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
