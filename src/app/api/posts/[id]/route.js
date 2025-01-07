import axios from "axios";

export async function POST(req, { params }) {
  try {
    const { id } = params;
    const options = {
      method: "GET",
      url: "https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts",
      params: {
        username_or_id_or_url: id,
      },
      headers: {
        "x-rapidapi-key": process.env.SCRAPPER_API_KEY,
        "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
      },
    };

    try {
      const { data } = await axios.request(options);

      return new Response(
        JSON.stringify(
          {
            success: true,
            message: "Fetched User Posts Successfully",
            posts: data?.data,
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
