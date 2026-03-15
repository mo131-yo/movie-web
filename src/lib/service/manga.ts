import axios from "axios";
import axiosInstance from "./axios-instance";

const   API_URL = "https://api.mangadex.org";

export const topRatedmanga = async (query: string) => {
  try {
    const { data } = await axios.get(`https://api.jikan.moe/v4/top/manga`);
    return data.data;
  } catch (error) {
    console.error("Манга хайхад алдаа гарлаа:", error);
    return [];
  }
};

export const mostPopularManga = async (mangaId: string) => {
  try {
    const { data } = await axiosInstance.get(`https://api.jikan.moe/v4/top/manga?filter=bypopularity}`);
    return data;
  } catch (error) {
    console.error("Бүлгүүд авахад алдаа гарлаа:", error);
    return null;
  }
};

export const jumpForceMonga = async (mangaId: string) => {
  try {
    const { data } = await axiosInstance.get(`https://api.jikan.moe/v4/manga?magazines=83&order_by=score&sort=desc}`);
    return data;
  } catch (error) {
    console.error("Бүлгүүд авахад алдаа гарлаа:", error);
    return null;
  }
};