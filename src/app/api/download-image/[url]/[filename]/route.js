import axios from 'axios';

export async function GET(req, { params }) {
  const { url, filename } = params;

  try {
    // Decode the URL since it's passed as a URL-encoded string
    const decodedUrl = decodeURIComponent(url);

    // Fetch the image stream from the provided URL
    const imageResponse = await axios.get(decodedUrl, { responseType: 'stream' });

    // Set headers for downloading the image
    const headers = new Headers({
      'Content-Disposition': `attachment; filename="${filename}.jpeg"`,
      'Content-Type': 'image/jpeg',
    });

    // Return a streaming response
    return new Response(imageResponse.data, { headers });
  } catch (error) {
    console.error('Error downloading image:', error);

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
