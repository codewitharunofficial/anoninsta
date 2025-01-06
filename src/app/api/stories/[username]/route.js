import axios from "axios";

export async function POST(req, { params }) {
  try {
    const { username } = params;
    const options = {
      method: "GET",
      url: "https://instagram-scraper-api2.p.rapidapi.com/v1/stories",
      params: {
        username_or_id_or_url: username,
      },
      headers: {
        "x-rapidapi-key": "63082bf975mshaf2e4ae44199d66p180054jsne3e705022ef1",
        "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
      },
    };

    try {
      const { data } = await axios.request(options);
      // console.log("Stories:", data?.data?.items);
      return new Response(
        JSON.stringify(
          {
            success: true,
            message: "Stories Fetched Successfully",
            stories: data?.data?.items,
          },
          { status: 200 }
        )
      );
    } catch (error) {
      console.log(error);
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
