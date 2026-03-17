// npm install leaflet leaflet-routing-machine @types/leaflet
import axios from 'axios';

const   JIKAN_API = "https://api.jikan.moe/v4";
// const axiosInstance = axios.create({
//   baseURL: 'https://api-consumet-org.vercel.app/anime/gogoanime'
// });


export const fetchPopularTV = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/tv/popular`, {
      params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        language: 'en-US',
        page: 1
      }
    });
    return data.results;
  } catch (error: any) {
    console.error("TMDB Error Details:", error.response?.data || error.message);
    return [];
  }
};



export const fetchAnimeInfo = async (id: string) => {
  try {
    const { data } = await axios.get(`/info/${id}`);
    return data;
  } catch (error) {
    return null;
  }
};


export const fetchStreamLink = async (episodeId: string) => {
  try {
    const { data } = await axios.get(`/watch/${episodeId}`);
    return data.sources?.[0] || data.sources?.find((s: any) => s.quality === 'default');
  } catch (error) {
    return null;
  }
};

export const fetchTopAnime = async () => {
  try {
    const { data } = await axios.get(`${JIKAN_API}/top/anime?filter=bypopularity`);
    return data.data;
  } catch (error: any) {
    if (error.response?.status === 429) {
      console.warn("Jikan API limit reached. Using backup data or empty array.");
    }
    return [];
  }
};

export const fetchPopularAnime = async () => {
  const query = `
    query {
      Page(page: 1, perPage: 10) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          id
          title { romaji english }
          coverImage { extraLarge }
          averageScore
        }
      }
    }
  `;

  try {
    const { data } = await axios.post("https://graphql.anilist.co", { query });
    return data.data.Page.media;
  } catch (error) {
    return [];
  }
};

export const fetchAiringNow = async () => {
 try{
  const {data}= await axios.get(`${JIKAN_API}/seasons/now?limit=20`);
  return data.data;
 }catch (error){
  return []
 }
}


export const fetchSeasonEpisodes = async (tvId: string, seasonNumber: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      }
    }
  );
  return res.json();
};

// 1. Хайлт хийх API (Search)
export const searchAnime = async (query: string) => {
  try {
    const { data } = await axios.get(`${JIKAN_API}/anime?q=${query}&limit=20`);
    return data.data;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

// 2. Төрлөөр шүүх API (Filter by Genre)
// Төрлүүдийн ID: Action(1), Adventure(2), Comedy(4), Sci-Fi(24) гэх мэт
export const fetchAnimeByGenre = async (genreId: number) => {
  try {
    const { data } = await axios.get(`${JIKAN_API}/anime?genres=${genreId}&order_by=score&sort=desc`);
    return data.data;
  } catch (error) {
    console.error("Genre fetch error:", error);
    return [];
  }
};

// 3. Төрлүүдийн жагсаалтыг авах (Get All Genres)
export const fetchGenreList = async () => {
  try {
    const { data } = await axios.get(`${JIKAN_API}/genres/anime`);
    return data.data;
  } catch (error) {
    console.error("Genre list error:", error);
    return [];
  }
};

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const getAnimeDetails = async (id: string) => {
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`);
  return res.json();
};

// 2. Тухайн бүлгийн ангиудыг авах
export const getSeasonEpisodes = async (id: string, seasonNumber: number) => {
  const res = await fetch(`${BASE_URL}/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`);
  return res.json();
};