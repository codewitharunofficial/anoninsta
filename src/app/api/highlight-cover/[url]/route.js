import axios from "axios";

export async function POST(req, {params}){
    try {
        const { url } = params;
        // console.log(url);
        if (!url) {
          return new Response(JSON.stringify({
            success: false,
            message: "No URL Found",
          }, {status: 400}));
        } else {
          const imageBuffer = await axios.get(url, { responseType: "arraybuffer", timeout: 15000 });
    
          const image_base64 = Buffer.from(imageBuffer.data, "binary").toString(
            "base64"
          );
    
          return new Response(
            JSON.stringify(
                `data:${imageBuffer.headers["content-type"]};base64,${image_base64}`), {status: 200}
          );
        }
      } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
          success: false,
          message: "Something went wrong",
          error,
        }, {status: 500}));
      }
}