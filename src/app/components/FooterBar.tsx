"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdPerson } from "react-icons/io";

const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];
// 1. Төрлөө тодорхойлох
interface MenuItem {
  id: number;
  color: string;
  href: string;
  icon: React.ReactNode;
  isReactIcon?: boolean; // '?' тэмдэг нь заавал байх албагүй гэдгийг илтгэнэ
}

// 2. Массиваа MenuItem төрөлтэй гэж зарлах
const menuItems: MenuItem[] = [
  { id: 0, color: "#ff8c00", href: "/", icon: <path d="M3.8,6.6h16.4 M20.2,12.1H3.8 M3.8,17.5h16.4"/> },
  { id: 1, color: "#f54888", href: "/category/popular", icon: (
    <>
      <path d="M6.7,4.8h10.7c0.3,0,0.6,0.2,0.7,0.5l2.8,7.3c0,0.1,0,0.2,0,0.3v5.6c0,0.4-0.4,0.8-0.8,0.8H3.8 C3.4,19.3,3,19,3,18.5v-5.6c0-0.1,0-0.2,0.1-0.3L6,5.3C6.1,5,6.4,4.8,6.7,4.8z"/>
      <path d="M3.4,12.9H8l1.6,2.8h4.9l1.5-2.8h4.6"/>
    </>
  )},
  { id: 2, color: "#4343f5", href: "/top-rated", icon: (
    <>
      <path d="M3.4,11.9l8.8,4.4l8.4-4.4"/>
      <path d="M3.4,16.2l8.8,4.5l8.4-4.5"/>
      <path d="M3.7,7.8l8.6-4.5l8,4.5l-8,4.3L3.7,7.8z"/>
    </>
  )},
  { id: 3, color: "#e0b115", href: "/upcoming", icon: (
    <>
      <path d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5-1.2-1.2V5.1 C3.9,4.4,4.4,3.9,5.1,3.9z"/>
      <path d="M4.2,9.3h15.6"/><path d="M9.1,9.5v10.3"/>
    </>
  )},
  { id: 4, color: "#65ddb7", href: "/profile", isReactIcon: true, icon: <IoMdPerson /> },
];

  
export const FooterBar = () => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [borderTransform, setBorderTransform] = useState("");
  const menuRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // URL өөрчлөгдөхөд activeIndex-ийг шинэчлэх
  useEffect(() => {
    const currentIndex = menuItems.findIndex(item => item.href === pathname);
    if (currentIndex !== -1) setActiveIndex(currentIndex);
  }, [pathname]);

  const updateBorder = (index: number) => {
    const element = itemsRef.current[index];
    const menu = menuRef.current;
    if (element && menu) {
      const rect = element.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const left = Math.floor(rect.left - menuRect.left - (163.5 - rect.width) / 2);
      setBorderTransform(`translate3d(${left}px, 0, 0)`);
    }
  };

  useEffect(() => {
    updateBorder(activeIndex);
    document.body.style.transition = "background-color 0.7s ease";
    document.body.style.backgroundColor = bgColorsBody[activeIndex];
    
    const handleResize = () => updateBorder(activeIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <div className="fixed bottom-1 left-0 w-full z-[999] flex justify-center pointer-events-none px-4">
      <nav 
        className="menu pointer-events-auto relative flex items-center justify-center backdrop-blur-xl shadow-2xl border border-white/10 rounded-[30px]" 
        ref={menuRef}
        style={{ paddingLeft:"50px",gap:"10px", backgroundColor: "#1d1d27" }}
      >
        {menuItems.map((item, index) => (
          <Link
            key={item.id}
            href={item.href || "#"}
            ref={(el) => { itemsRef.current[index] = el; }}
            className={`menu__item relative flex-1 flex items-center justify-center z-10 transition-transform duration-500 ${activeIndex === index ? "active -translate-y-3" : ""}`}
            style={{ "--bgColorItem": item.color } as React.CSSProperties}
            onClick={() => setActiveIndex(index)}
          >
          {item.isReactIcon ? (
            /* IoMdPerson иконыг харагдахуйц болгох */
            <div style={{ 
                fontSize: "2.2em", 
                // transparent-ийг rgba(255, 255, 255, 0.4) болгож өөрчлөв
                color: activeIndex === index ? "white" : "rgba(255, 255, 255, 0.4)",
                transition: "color 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {item.icon}
            </div>
        ) : (
            <svg 
            className="icon" 
            viewBox="0 0 24 24"
            style={{
                width: "2.2em",
                height: "2.2em",
                fill: "none",
                // Бусад иконуудыг ч бас идэвхгүй үед нь бага зэрэг харагддаг болгож болно
                stroke: activeIndex === index ? "white" : "rgba(255, 255, 255, 0.4)", 
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                transition: "stroke 0.3s ease"
            }}
            >
            {item.icon}
            </svg>
        )}

            <div className={`absolute w-12 h-12 rounded-full -z-10 transition-all duration-500 scale-0 ${activeIndex === index ? "scale-100 opacity-100" : "opacity-0"}`} 
                 style={{ backgroundColor: item.color }} />
          </Link>
        ))}

        <div 
          className="menu__border absolute left-0 bottom-[98%] w-[163.5px] h-[38px] transition-transform duration-700 ease-[cubic-bezier(0.3,0.5,0.2,1)]"
          style={{ 
            transform: borderTransform,
            backgroundColor: "#1d1d27",
            clipPath: "url(#menu-clip)"
          }}
        />
      </nav>

      <div className="absolute invisible w-0 h-0">
        <svg>
          <clipPath id="menu-clip" clipPathUnits="objectBoundingBox" transform="scale(0.0049285 0.021978)">
            <path d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7 c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5 c9.2,3.6,17.6,4.2,23.3,4H6.7z" />
          </clipPath>
        </svg>
      </div>
    </div>
  );
};