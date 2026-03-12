import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const fetchPopularTV = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/tv/popular`, {
      params: {
        api_key: API_KEY, // Одоо энд d92e7020... гэсэн богино түлхүүр очиж байгаа
        language: 'en-US',
        page: 1
      }
    });
    return data.results;
  } catch (error) {
    console.error("TV Series fetch error:", error);
    return [];
  }
};