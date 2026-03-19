export async function getMongolMovies() {
  const playlistId = "PL-KsdO7T9M2m98V2sH2B_XW98i6eY7D3I";
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
  );

  if (!res.ok) return [];

  const data = await res.json();

  return data.items.map((item: any) => ({
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
    description: item.snippet.description,
  }));
}


// TMDB_BASE_URL=https://api.themovieb.org/3
// TMDB_IMAGE_SERVICE_URL=https://image.tmdb.org/t/p
// TMDB_API_TOKEN=d92e702065cd135dade0082bae3c211a
// NEXT_API_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTJlNzAyMDY1Y2QxMzVkYWRlMDA4MmJhZTNjMjExYSIsIm5iZiI6MTc2NjQ1Nzk2Ny41NjgsInN1YiI6IjY5NGEwMjZmNDg4MTQ4ZDA2MmIxY2Y4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y2Hsocrhv37imI5sBliSJ0OZIuu-JG9jt7h_6XZYERU
// NEXT_PUBLIC_TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTJlNzAyMDY1Y2QxMzVkYWRlMDA4MmJhZTNjMjExYSIsIm5iZiI6MTc2NjQ1Nzk2Ny41NjgsInN1YiI6IjY5NGEwMjZmNDg4MTQ4ZDA2MmIxY2Y4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y2Hsocrhv37imI5sBliSJ0OZIuu-JG9jt7h_6XZYERU
// NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3  
// NEXT_PUBLIC_SITE_URL=https://movie-web-taupe-delta.vercel.app/

// GITHUB_GIST=https://gist.githubusercontent.com/mo131-yo/2dd3ea1e449b5a2b0a2d47e5830f51b7/raw/bd537be8a04058d5a0d7b79cc8612fa5df049a44/sprited-away.vtt

// MOVIE_API=https://www.vidking.net/embed/movie

// NEXT_PUBLIC_ANIME_API=https://api.consumet.org/anime/gogoanime

// PRISMA_URL=postgres://bc0d0c2fafd1052810eaeeabfceb9044fb91127a98b91d7e7ed2415b6a49a47c:sk_GCCgj3LVuled_StadofXO@db.prisma.io:5432/postgres?sslmode=require

// WEBHOOK_SECRET=whsec_iBxlPJWH8SxSDwYMJ6tlEg+GjuhNiZwn

// # MONGODB_URI=mongodb+srv://munhorgilmunhtsetseg333_db_user:<db_password>@cluster0.tsh8d5d.mongodb.net/?appName=Cluster0
// MONGODB_URI=mongodb+srv://munhorgilmunhtsetseg333_db_user:Munkhorgil333_@cluster0.tsh8d5d.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0
// # Бусад TMDB_API_TOKEN гэх мэт утгууд доор нь байх ёстой...
// # Munkhorgil333_
// # munhorgilmunhtsetseg333_db_user