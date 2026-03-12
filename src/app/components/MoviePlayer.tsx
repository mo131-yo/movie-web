"use client";
import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import Hls from 'hls.js';

export default function MoviePlayer({ videoUrl, subtitleUrl }: { videoUrl: string; subtitleUrl: string }) {
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!artRef.current) return;

    const art = new Artplayer({
      container: artRef.current,
      url: videoUrl,
      customType: {
        m3u8: function (video, url) {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
          }
        },
      },
      subtitle: {
        url: subtitleUrl,
        type: 'vtt',
        encoding: 'utf-8',
        escape: false,
        style: {
          color: '#ffffff',
          fontSize: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      setting: true,
      fullscreen: true,
      autoSize: true,
      playbackRate: true,
      aspectRatio: true,
      hotkey: true,
    });

    return () => {
      if (art && art.destroy) art.destroy();
    };
  }, [videoUrl, subtitleUrl]);

  return <div ref={artRef} className="w-full aspect-video rounded-2xl overflow-hidden" />;
}