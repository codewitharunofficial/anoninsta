export async function getByassPassedImage(url) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/highlight-cover/${encodeURIComponent(
        url
      )}`
    );
    if (data) {
      return data
    } else {
        console.log(data);
    }
  }