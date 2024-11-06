import axios from "axios";

export const fetchStories = async (userName) => {
  const options = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API}/user_stories?nocors=true`,
    params: {
      username_or_id: userName,
    },
    headers: {
      "x-rapidapi-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
      "x-rapidapi-host": `${process.env.NEXT_PUBLIC_API_HOST}`,
    },
  };

  try {
    const { data } = await axios.request(options);
    if (data?.status === "ok") {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchUser = async (userName) => {
  const options = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API}/user_info_web`,
    params: {
      username: userName,
      include_about: "true",
      nocors: "true",
    },
    headers: {
      "x-rapidapi-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
      "x-rapidapi-host": `${process.env.NEXT_PUBLIC_API_HOST}`,
    },
  };

  try {
    const { data } = await axios.request(options);
    if (data?.status === "ok") {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchPosts = async (userName) => {
  const options = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API}/user_posts`,
    params: {
      username_or_id: userName,
      count: "20",
      nocors: "true",
    },
    headers: {
      "x-rapidapi-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
      "x-rapidapi-host": `${process.env.NEXT_PUBLIC_API_HOST}`,
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
    if (data?.status === "ok") {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchHighlights = async (userName) => {
  const options = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API}/user_highlight_tray`,
    params: {
      username_or_id: userName,
      nocors: "true",
    },
    headers: {
      "x-rapidapi-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
      "x-rapidapi-host": `${process.env.NEXT_PUBLIC_API_HOST}`,
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
    if (data?.status === "ok") {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export async function getUser (userName) {
  const options = {
    method: 'GET',
    url: 'https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/profile_by_username',
    params: {
      username: userName
    },
    headers: {
      'x-rapidapi-key': '63082bf975mshaf2e4ae44199d66p180054jsne3e705022ef1',
      'x-rapidapi-host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com'
    }
  };
  
  try {
    const {data} = await axios.request(options);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
