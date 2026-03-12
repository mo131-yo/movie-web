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