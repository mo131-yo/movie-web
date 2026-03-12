import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    // 1. Өргөөгийн хуваарийн хуудас руу хандах
    const response = await fetch('https://urgoo.mn/Schedule', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      next: { revalidate: 3600 } // 1 цаг тутамд өгөгдлийг шинэчилнэ
    });

    const html = await response.text();
    const $ = cheerio.load(html);
    
    const movies: any[] = [];

    // 2. Киноны мэдээлэл байгаа HTML тагуудыг хайх 
    // Анхааруулга: Сайтын бүтэц өөрчлөгдвөл эдгээр класс нэрсийг шинэчлэх шаардлагатай
    $('.movie-item').each((i, el) => {
      const title = $(el).find('.movie-title').text().trim();
      const image = $(el).find('img').attr('src');
      const genre = $(el).find('.movie-genre').text().trim();

      if (title) {
        movies.push({ title, image, genre });
      }
    });

    // Хэрэв шууд жагсаалтаар олдохгүй бол "Next Now" сексээс хайх логик нэмж болно
    return NextResponse.json({ movies });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}