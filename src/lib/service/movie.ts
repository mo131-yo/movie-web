import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const fetchPopularTV = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/tv/popular`, {
      params: {
        api_key: API_KEY,
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


// https://api.themoviedb.org/3/list/{234752}?api_key={API_KEY}&language=en-US

export const getOscarWinners = async (page = 1) => {
  try {
    // 234752 нь "academy award winner" гэсэн keyword-ийн ID
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=234752&page=${page}&language=mn-MN`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Оскарын кинонуудын өгөгдөл авахад алдаа гарлаа:", error);
    return [];
  }
};