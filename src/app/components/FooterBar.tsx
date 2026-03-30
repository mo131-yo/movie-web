"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HiHome, 
  HiFire, 
  HiPlay, 
  HiBookOpen, 
  HiUser, 
  HiFilm
} from "react-icons/hi";

const bgColorsBody = ["#000000", "#050505", "#0a0a0a", "#050505", "#000000"];

interface MenuItem {
  id: number;
  color: string;
  href: string;
  icon: React.ReactNode;
  label: string;
}

const menuItems: MenuItem[] = [
  { 
    id: 0, 
    color: "#007AFF", 
    href: "/", 
    icon: <HiHome />, 
    label: "Нүүр" 
  },
  { 
    id: 1, 
    color: "#FF3B30", 
    href: "/category/popular", 
    icon: <HiFire />, 
    label: "Трэнд" 
  },
  { 
    id: 2, 
    color: "#FF9500", // Кинонд зориулж улбар шар өнгө (солиж болно)
    href: "/movie", 
    icon: <HiFilm />, 
    label: "Кино" 
  },
  { 
    id: 3, 
    color: "#AF52DE", 
    href: "/anime", 
    icon: <HiPlay />, 
    label: "Анимэ" 
  },
  { 
    id: 4, 
    color: "#FFCC00", 
    href: "/manga", 
    icon: <HiBookOpen />, 
    label: "Манга" 
  },
  { 
    id: 5, 
    color: "#34C759", 
    href: "/profile", 
    icon: <HiUser />, 
    label: "Профайл" 
  },
];

export const FooterBar = () => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [borderTransform, setBorderTransform] = useState("");
  const menuRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const currentIndex = menuItems.findIndex((item) => {
      if (item.href === "/") return pathname === "/";
      return pathname.startsWith(item.href);
    });
    if (currentIndex !== -1) setActiveIndex(currentIndex);
  }, [pathname]);

  const updateBorder = (index: number) => {
    const element = itemsRef.current[index];
    const menu = menuRef.current;
    if (element && menu) {
      const rect = element.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const left = rect.left - menuRect.left + (rect.width / 2) - (163.5 / 2);
      setBorderTransform(`translate3d(${left}px, 0, 0)`);
    }
  };

  useEffect(() => {
    updateBorder(activeIndex);
    document.body.style.transition = "background-color 1.2s cubic-bezier(0.4, 0, 0.2, 1)";
    document.body.style.backgroundColor = bgColorsBody[activeIndex];

    const handleResize = () => updateBorder(activeIndex);
    window.addEventListener("resize", handleResize);
    const timeout = setTimeout(handleResize, 100);

    return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(timeout);
    };
  }, [activeIndex]);

  return (
    <div className="fixed bottom-4 md:bottom-8 left-0 right-0 z-[999] flex justify-center pointer-events-none px-4 md:px-0">
      <nav
        className="menu pointer-events-auto relative flex items-center justify-between max-w-[400px] md:max-w-[500px] h-[65px] md:h-[75px] backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 rounded-[30px] md:rounded-[35px] overflow-visible px-4"
        ref={menuRef}
        style={{ backgroundColor: "rgba(20, 20, 25, 0.85)" }}
      >
        {menuItems.map((item, index) => ( 
          <Link
            key={item.id}
            href={item.href}
            ref={(el) => { itemsRef.current[index] = el; }}
            className="relative flex-1 flex flex-col items-center justify-center z-10 group"
            onClick={() => {
                setActiveIndex(index);
                if (window.navigator.vibrate) window.navigator.vibrate(5);
            }}
          >
            <div
              className={`text-[24px] md:text-[28px] transition-all duration-500 ease-out ${
                activeIndex === index 
                ? "-translate-y-5 md:-translate-y-6 scale-110 text-white" 
                : "text-white/30 group-hover:text-white/60"
              }`}
            >
              {item.icon}
            </div>

            <div className={`absolute bottom-2 md:bottom-3 w-1.5 h-1.5 rounded-full bg-white transition-all duration-500 ${
                activeIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`} />

            <div
              className={`absolute w-12 h-12 md:w-14 md:h-14 rounded-full -z-10 transition-all duration-700 blur-[20px] ${
                activeIndex === index ? "opacity-40 scale-100" : "opacity-0 scale-0"
              }`}
              style={{ backgroundColor: item.color }}
            />
          </Link>
        ))}

        <div
          className="menu__border absolute left-0 bottom-[98%] w-[163.5px] h-[35px] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1.1)]"
          style={{
            transform: borderTransform,
            backgroundColor: "rgba(20, 20, 25, 0.85)",
            clipPath: "url(#menu-clip)",
          }}
        />
      </nav>

      <div className="absolute invisible w-0 h-0">
        <svg>
          <clipPath id="menu-clip" clipPathUnits="objectBoundingBox" transform="scale(0.0049285 0.021978)">
            <path d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7 c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7 c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5 c9.2,3.6,17.6,4.2,23.3,4H6.7z" />
          </clipPath>
        </svg>
      </div>
    </div>
  );
};