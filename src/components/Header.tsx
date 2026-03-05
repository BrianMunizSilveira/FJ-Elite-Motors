"use client";

import Link from "next/link";
import { useState } from "react";
import { Car, Menu, Search, Phone, Instagram, Facebook, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary border-b border-gray-800 sticky top-0 z-50">
      <div className="bg-accent text-white py-1 px-4 text-xs md:text-sm flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-medium"><Phone size={14} /> (11) 99999-9999</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gold transition-colors"><Instagram size={16} /></a>
          <a href="#" className="hover:text-gold transition-colors"><Facebook size={16} /></a>
        </div>
      </div>
      
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gold p-2 rounded-sm group-hover:bg-white transition-colors">
            <Car className="text-primary group-hover:text-gold transition-colors" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter text-white leading-none">FJ ELITE</span>
            <span className="text-[10px] text-gold font-bold tracking-[0.3em] leading-none">MOTORS</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest text-gray-400">
          <Link href="/" className="hover:text-white hover:border-b-2 border-gold transition-all pb-1">HOME</Link>
          <Link href="/veiculos" className="hover:text-white hover:border-b-2 border-gold transition-all pb-1">ESTOQUE</Link>
          <Link href="/quem-somos" className="hover:text-white hover:border-b-2 border-gold transition-all pb-1">QUEM SOMOS</Link>
          <Link href="/contato" className="hover:text-white hover:border-b-2 border-gold transition-all pb-1">CONTATO</Link>
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="text-white md:hidden hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <Link href="/veiculos" className="bg-gold text-primary px-6 py-2 rounded-sm text-xs font-black hover:bg-white transition-all hidden md:block tracking-widest shadow-lg shadow-gold/20">
            VER ESTOQUE
          </Link>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-gray-800 p-6 flex flex-col gap-6 md:hidden shadow-2xl animate-in slide-in-from-top-5">
            <Link 
              href="/" 
              className="text-white text-lg font-bold tracking-widest hover:text-gold border-b border-gray-800 pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link 
              href="/veiculos" 
              className="text-white text-lg font-bold tracking-widest hover:text-gold border-b border-gray-800 pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              ESTOQUE
            </Link>
            <Link 
              href="/quem-somos" 
              className="text-white text-lg font-bold tracking-widest hover:text-gold border-b border-gray-800 pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              QUEM SOMOS
            </Link>
            <Link 
              href="/contato" 
              className="text-white text-lg font-bold tracking-widest hover:text-gold border-b border-gray-800 pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTATO
            </Link>
            <Link 
              href="/veiculos" 
              className="bg-gold text-primary p-4 rounded-sm text-center font-black tracking-widest hover:bg-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              VER ESTOQUE COMPLETO
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
