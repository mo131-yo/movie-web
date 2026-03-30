import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

/**
 * 1. Алдартай аниме жагсаалт (Popular Anime)
 * TMDB-ийн Animation (16) төрөл болон Anime (210024) түлхүүр үгийг ашиглана.
 */
export const fetchPopularAnimeTMDB = async (page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_keywords=210024&sort_by=popularity.desc&page=${page}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Fetch popular error:", error);
    return [];
  }
};

/**
 * 2. Одоо гарч буй аниме (Airing Now)
 * Одоогийн цаг үед гарч байгаа аниме цувралууд.
 */
export const fetchAiringNowTMDB = async (page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_keywords=210024&air_date.gte=2024-01-01&sort_by=first_air_date.desc&page=${page}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Fetch airing now error:", error);
    return [];
  }
};

/**
 * 3. Аниме-ийн дэлгэрэнгүй мэдээлэл (Anime Details)
 * /tv/{id} ашиглан жүжигчид, видео болон бусад мэдээллийг татна.
 */
export const getAnimeDetails = async (id: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos,recommendations`
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Get details error:", error);
    return null;
  }
};

/**
 * 4. Бүлэг болон Ангиудын жагсаалт (Season & Episodes)
 * Тодорхой нэг бүлгийн ангиудыг авах.
 */
export const getSeasonEpisodes = async (id: string, seasonNumber: number) => {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}`
    );
    if (!res.ok) return { episodes: [] };
    return await res.json();
  } catch (error) {
    console.error("Get episodes error:", error);
    return { episodes: [] };
  }
};

/**
 * 5. Хайлт хийх (Search Anime)
 * Зөвхөн аниме (Animation) төрөлд багтах цувралуудаас хайна.
 */
export const searchAnimeTMDB = async (query: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    // Хайлтаас ирсэн үр дүнгээс Animation (16) төрөлтэйг нь шүүж авах
    return data.results?.filter((item: any) => item.genre_ids?.includes(16)) || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

/**
 * 6. Төрлөөр шүүх (Fetch by Genre ID)
 */
export const fetchAnimeByGenreTMDB = async (genreId: number, page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16,${genreId}&with_keywords=210024&page=${page}`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    return [];
  }
};