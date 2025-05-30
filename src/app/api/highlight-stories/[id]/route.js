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
            method: 'GET',
            url: 'https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/highlights_media_by_highlight_id',
            params: {
              id: id
            },
            headers: {
              'x-rapidapi-key': 'b1c26628e0msh3fbbf13ea24b4abp184561jsna2ebae86e910',
              'x-rapidapi-host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com'
            }
          };

      try {
        const { data } = await axios.request(options);
        return new Response(
          JSON.stringify(
            {
              success: true,
              message: "Highlights Media Fetched Successfully",
              highlights: data.reels,
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
