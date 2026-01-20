"use client";

import { motion } from "framer-motion";

// Анимейшн тохиргоо
const stairAnimation = {
  initial: { top: "0%" },
  animate: { top: "100%" },
  exit: { top: ["100%", "0%"] },
};

// 6 ширхэг хавтанг цувуулж гаргах логик
const reverseIndex = (index: number) => {
  const totalSteps = 6;
  return totalSteps - index - 1;
};

export const Stairs = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          variants={stairAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            delay: reverseIndex(index) * 0.1,
          }}
          className="fixed inset-0 w-[16.7vw] bg-red-600 z-[10000] pointer-events-none"
          style={{ left: `${index * 16.7}vw` }}
        />
      ))}
    </>
  );
};