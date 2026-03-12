export const fetchMovieById = async (id: string | number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

