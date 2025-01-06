import axios from 'axios';

export async function GET(req, { params }) {
  const { url, filename } = params;

  try {
    // Decode the URL since it's passed as a URL-encoded string
    const decodedUrl = decodeURIComponent(url);

    // Fetch the video stream from the provided URL
    const videoResponse = await axios.get(decodedUrl, { responseType: 'stream' });

    // Set headers for downloading the video
    return new Response(videoResponse.data, {
      headers: {
        'Content-Disposition': `attachment; filename="${filename}.mp4"`,
        'Content-Type': 'video/mp4',
      },
    });
  } catch (error) {
    console.error('Error downloading video:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Something went wrong',
        error: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
