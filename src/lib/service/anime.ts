// npm install leaflet leaflet-routing-machine @types/leaflet
import axios from 'axios';

const JIKAN_API = "https://api.jikan.moe/v4";
const axiosInstance = axios.create({
  baseURL: 'https://api-consumet-org.vercel.app/anime/gogoanime'
});


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

export const searchAnime = async (query: string) => {
  try {
    const { data } = await axiosInstance.get(`/${query}`);
    return data.results;
  } catch (error) {
    return [];
  }
};

export const fetchAnimeInfo = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/info/${id}`);
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchStreamLink = async (episodeId: string) => {
  try {
    const { data } = await axiosInstance.get(`/watch/${episodeId}`);
    return data.sources?.[0] || data.sources?.find((s: any) => s.quality === 'default');
  } catch (error) {
    return null;
  }
};

export const fetchTopAnime = async () => {
  try {
    const { data } = await axios.get(`${JIKAN_API}/top/anime`);
    return data.data;
  } catch (error: any) {
    if (error.response?.status === 429) {
      console.warn("Jikan API limit reached. Using backup data or empty array.");
    }
    return [];
  }
};


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


// <Link href={isTV ? `/watch/tv/${id}/1/1` : `/watch/movie/${id}`}>
//   <button className="flex items-center gap-2 px-10 py-4 bg-yellow-500 text-black rounded-full font-bold hover:bg-yellow-400">
//     <FaPlay /> Watch {isTV ? "Series" : "Movie"}
//   </button>
// </Link>