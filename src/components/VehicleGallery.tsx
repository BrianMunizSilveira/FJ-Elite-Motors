"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
}

interface VehicleGalleryProps {
  images: GalleryImage[];
  model: string;
}

export default function VehicleGallery({ images, model }: VehicleGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Fallback if no images
  const displayImages: GalleryImage[] = images.length > 0 
    ? images 
    : [{ id: "fallback", url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200" }];

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  }, [displayImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  }, [displayImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, nextImage, prevImage]);

  return (
    <div className="flex flex-col gap-4">

      {/* Main Image */}
      <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-gray-800 aspect-video bg-gray-900">
        <img 
          src={displayImages[currentImageIndex].url} 
          alt={`${model} - ${currentImageIndex + 1}`} 
          className="w-full h-full object-cover transition-transform duration-500"
        />
        
        {/* Hover Controls */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between px-4">
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-gold hover:text-black transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-gold hover:text-black transition-colors"
          >
            <Maximize2 size={32} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-gold hover:text-black transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2 md:gap-4 overflow-x-auto pb-2">
          {displayImages.map((img, index) => (
            <button
              key={img.id || index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative rounded-lg overflow-hidden border aspect-video transition-all ${
                currentImageIndex === index 
                  ? "border-gold ring-2 ring-gold/50 scale-105" 
                  : "border-gray-800 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img.url} alt={`${model} - thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-[10000] bg-black/50 text-white p-3 rounded-full hover:bg-gold hover:text-black transition-all border border-gray-700 hover:border-gold"
            title="Fechar"
          >
            <X size={32} />
          </button>

          <button 
            onClick={prevImage}
            className="absolute left-4 md:left-10 z-[10000] bg-black/50 text-white p-3 rounded-full hover:bg-gold hover:text-black transition-all border border-gray-700 hover:border-gold"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="w-full h-full max-w-7xl flex items-center justify-center relative" onClick={() => setIsLightboxOpen(false)}>
            <img 
              src={displayImages[currentImageIndex].url} 
              alt={`${model} - Fullscreen`} 
              className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm cursor-zoom-out"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/90 bg-black/60 px-6 py-2 rounded-full text-sm font-bold font-mono border border-gray-700 backdrop-blur-sm">
              {currentImageIndex + 1} / {displayImages.length}
            </div>
          </div>

          <button 
            onClick={nextImage}
            className="absolute right-4 md:right-10 z-[10000] bg-black/50 text-white p-3 rounded-full hover:bg-gold hover:text-black transition-all border border-gray-700 hover:border-gold"
          >
            <ChevronRight size={32} />
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
