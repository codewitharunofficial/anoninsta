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
        method: 'POST',
        url: 'https://instagram120.p.rapidapi.com/api/instagram/highlightStories',
        headers: {
          'x-rapidapi-key': '63082bf975mshaf2e4ae44199d66p180054jsne3e705022ef1',
          'x-rapidapi-host': 'instagram120.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          highlightId: id
        }
      };

      try {
        const { data } = await axios.request(options);
        console.log(data);
        return new Response(
          JSON.stringify(
            {
              success: true,
              message: "Highlights Media Fetched Successfully",
              highlights: data.result,
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
