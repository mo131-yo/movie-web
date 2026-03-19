import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Хүлээн авсан дата:", body); // Терминал дээр харна

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const result = await db.collection("movies").updateOne(
      { tmdbId: body.tmdbId },
      { $set: { ...body, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    // АЛДААГ ТЕРМИНАЛ ДЭЭР ГАРГАЖ ИРЭХ
    console.error("!!! МONGODB АЛДАА !!!:", error.message); 
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// {
//   "tmdbId": "129",
//   "title": "Spirited Away",
//   "subtitleUrl": "/subtitles/spirited-away.vtt"
// }