"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

type TrailerModalProps = {
  url: string | null;
  onClose: () => void;
  title: string;
};

export const TrailerModal = ({ url, onClose, title }: TrailerModalProps) => {
  return (
    <AnimatePresence>
      {url && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-4xl z-50 hover:text-red-500 transition-colors drop-shadow-md"
            >
              <IoClose />
            </button>

            <iframe
              src={url}
              title={title}
              className="w-full h-full border-none"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};