// src/app/components/MapWrapper.tsx
"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// ssr: false тохиргоотойгоор динамикаар ачаалах
const MapComponent = dynamic(
  () => import('./MovieMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[600px] w-full bg-[#1d1d27] flex items-center justify-center rounded-2xl border border-white/10">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          <p className="text-cyan-500 font-bold tracking-widest animate-pulse">LOADING MAP...</p>
        </div>
      </div>
    )
  }
);

export default function MapWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration mismatch-ээс бүрэн сэргийлэх
  if (!mounted) return null;

  return <MapComponent />;
}