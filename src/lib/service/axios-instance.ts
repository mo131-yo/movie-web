import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ANIME_API || 'https://api.jikan.moe/v4',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor: Handles the 429 error automatically
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If we hit a 429 error and haven't retried this specific request yet
    if (error.response?.status === 429 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      console.warn("Rate limit hit (429). Waiting 2 seconds before retrying...");

      // Wait for 2 seconds (Jikan likes a little breathing room)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Re-run the original request with the same config
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;