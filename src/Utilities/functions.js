export async function getByassPassedImage(url) {
    const { data } = await axios.post(
      `/api/highlight-cover/${encodeURIComponent(
        url
      )}`
    );
    if (data) {
      return data
    } else {
        console.log(data);
    }
  }