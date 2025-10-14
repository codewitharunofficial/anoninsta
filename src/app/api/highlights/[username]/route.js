import axios from "axios";

export async function POST(req, { params }) {
  try {
    const { username } = params;
    if (!username) {
      return new Response(
        JSON.stringify(
          {
            success: false,
            message: "No Username Provided",
          },
          { status: 400 }
        )
      );
    } else {
      const options = {
        method: 'GET',
        url: 'https://instagram-scraper-api2.p.rapidapi.com/v1/highlights',
        params: {
          username_or_id_or_url: username
        },
        headers: {
          'x-rapidapi-key': '63082bf975mshaf2e4ae44199d66p180054jsne3e705022ef1',
          'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
        }
      };

      try {
        const { data } = await axios.request(options);

        if (data?.data && data?.data?.count > 0) {

          return new Response(
            JSON.stringify(
              {
                success: true,
                message: "Highlights Fetched Successfully",
                highlights: data?.data?.items,
              },
              { status: 200 }
            )
          );
        } else {
          return new Response(
            JSON.stringify(
              {
                success: false,
                message: "Some6thing Went Wrong",
                highlights: [],
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
