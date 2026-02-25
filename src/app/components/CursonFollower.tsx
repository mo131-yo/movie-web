"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CursorFollower = () => {
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX - 10); 
      mouseY.set(e.clientY - 10);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
      }}
        className="fixed top-0 left-0 w-6 h-6 bg-red-600 rounded-full pointer-events-none z-[9999] blur-[6px] dark:bg-blue-600"
    />
  );
};