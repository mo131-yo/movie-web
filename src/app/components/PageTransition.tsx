"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Stairs } from "./Stairs";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        {/* Анимейшн хавтангууд */}
        <Stairs />

        {/* Хуудасны агуулга зөөлөн гарч ирэх хэсэг */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};