"use client";

import { IoClose } from "react-icons/io5";

type TrailerModalProps = {
  trailerUrl: string;
  title: string;
  onClose: () => void;
};

export default function TrailerModal({
  trailerUrl,
  title,
  onClose,
}: TrailerModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 text-white text-3xl p-2 hover:text-red-400 drop-shadow-lg"
      >
        <IoClose />
      </button>

      <iframe
        src={trailerUrl}
        title={title}
        allowFullScreen
        className="
          w-full
          max-w-4xl
          aspect-video
          rounded-xl
          shadow-2xl
          border border-white/10
        "
      />
    </div>
  );
}
