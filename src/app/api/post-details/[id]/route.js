import axios from "axios";

export async function POST(req, { params }) {
  try {
    const { id } = params;
    const options = {
      method: "GET",
      url: `https://instagram243.p.rapidapi.com/postdetail/${id}`,
      headers: {
        "x-rapidapi-key": process.env.SCRAPPER_API_KEY,
        "x-rapidapi-host": "instagram243.p.rapidapi.com",
      },
    };

    try {
      const { data } = await axios.request(options);
      return new Response(
        JSON.stringify(
          {
            success: true,
            message: "Post Details Found",
            data,
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
