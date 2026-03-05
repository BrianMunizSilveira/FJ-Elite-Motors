"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  name: string;
  icon: React.ReactNode;
  id: string;
}

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-100px 0px -40% 0px" }
    );

    categories.forEach((cat) => {
      const element = document.getElementById(cat.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [categories]);

  return (
    <section className="hidden md:block bg-primary py-8 md:py-12 border-b border-gray-800 sticky top-[72px] z-40 shadow-2xl backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-center md:flex-wrap">
        {categories.map((cat) => (
          <Link 
            key={cat.name} 
            href={`#${cat.id}`}
            className={`flex flex-col items-center justify-center gap-3 min-w-[140px] md:min-w-[160px] h-[140px] md:h-[160px] p-6 rounded-xl transition-all group border snap-center shrink-0 ${
              activeSection === cat.id 
                ? "bg-gold text-primary border-gold scale-105 shadow-lg shadow-gold/20" 
                : "bg-gray-900 text-white border-gray-800 hover:border-gold/50 hover:bg-gray-800"
            } focus:ring-2 focus:ring-gold outline-none`}
          >
            <span className={`text-3xl md:text-4xl transition-transform duration-300 ${activeSection === cat.id ? "scale-110" : "group-hover:scale-110"}`}>
              {cat.icon}
            </span>
            <span className="font-black text-[10px] md:text-xs tracking-[0.2em] uppercase text-center">
              {cat.name}
            </span>
            {activeSection === cat.id && (
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1 animate-pulse"></div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
