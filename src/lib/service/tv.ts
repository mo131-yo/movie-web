// src/lib/service/tv.ts
// src/lib/service/tv.ts

export async function getPopularTVSeries() {
  // .env файл дээрх урт токентой хувьсагчийн нэрийг ашиглана
  const token = process.env.NEXT_API_TOKEN; 

  const res = await fetch(
    'https://api.themoviedb.org/3/tv/popular?language=mn-MN&page=1', // Хэрэв монголоор мэдээлэл байвал mn-MN
    {
      headers: {
        // Bearer-ийн дараа зай авахаа мартав аа
        Authorization: `Bearer ${token}`, 
        accept: 'application/json',
      },
      next: { revalidate: 3600 }
    }
  );

  if (!res.ok) {
    console.error(`TMDB Error Status: ${res.status}`);
    throw new Error(`Failed to fetch TV series: ${res.status}`);
  }

  const data = await res.json();
  return data.results;
}


// src/lib/service/tv.ts

const token = process.env.NEXT_API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

// 1. Хамгийн өндөр үнэлгээтэй цувралууд
export async function getTopRatedTVSeries() {
  const res = await fetch(`${BASE_URL}/tv/top_rated?language=en-US&page=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
    next: { revalidate: 86400 } // Өдөрт нэг шинэчилнэ
  });
  if (!res.ok) throw new Error('Failed to fetch top rated series');
  const data = await res.json();
  return data.results;
}

// 2. Удахгүй гарах буюу өнөөдөр цацагдах цувралууд
export async function getOnTheAirTVSeries() {
  const res = await fetch(`${BASE_URL}/tv/on_the_air?language=en-US&page=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error('Failed to fetch upcoming series');
  const data = await res.json();
  return data.results;
}

// src/lib/service/tv.ts

export async function getTVDetails(id: string) {
  const token = process.env.NEXT_API_TOKEN;
  const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
    next: { revalidate: 3600 }
  });

  if (!res.ok) return null;
  return res.json();
}