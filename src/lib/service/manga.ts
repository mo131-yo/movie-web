import axios from "axios";
import axiosInstance from "./axios-instance";

export const searchManga = async (query: string) => {
  try {
    const { data } = await axios.get(`https://api.jikan.moe/v4/manga?q=${query}&limit=10`);
    return data.data;
  } catch (error) {
    console.error("Манга хайхад алдаа гарлаа:", error);
    return [];
  }
};

export const fetchMangaChapters = async (mangaId: string) => {
  try {
    const { data } = await axiosInstance.get(`/manga/mangadex/info/${mangaId}`);
    return data;
  } catch (error) {
    console.error("Бүлгүүд авахад алдаа гарлаа:", error);
    return null;
  }
};