"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { SlidersHorizontal, Search, X } from "lucide-react";

interface VehicleFiltersProps {
  brands: string[];
  models: string[];
  minPrice: number;
  maxPrice: number;
}

// Hook para debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function VehicleFilters({ brands, models, minPrice, maxPrice }: VehicleFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "");
  const [selectedModel, setSelectedModel] = useState(searchParams.get("model") || "");
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || minPrice,
    Number(searchParams.get("maxPrice")) || maxPrice,
  ]);
  const [yearRange, setYearRange] = useState([
    Number(searchParams.get("minYear")) || 1990,
    Number(searchParams.get("maxYear")) || new Date().getFullYear() + 1,
  ]);
  const [maxKm, setMaxKm] = useState(searchParams.get("maxKm") || "");

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Debounce values
  const debouncedModel = useDebounce(selectedModel, 500);
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const debouncedYearRange = useDebounce(yearRange, 500);
  const debouncedMaxKm = useDebounce(maxKm, 500);

  // Effect to update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedBrand) params.set("brand", selectedBrand);
    if (debouncedModel) params.set("model", debouncedModel);
    if (debouncedPriceRange[0] > minPrice) params.set("minPrice", debouncedPriceRange[0].toString());
    if (debouncedPriceRange[1] < maxPrice) params.set("maxPrice", debouncedPriceRange[1].toString());
    if (debouncedYearRange[0] > 1990) params.set("minYear", debouncedYearRange[0].toString());
    if (debouncedYearRange[1] < new Date().getFullYear() + 1) params.set("maxYear", debouncedYearRange[1].toString());
    if (debouncedMaxKm) params.set("maxKm", debouncedMaxKm);

    router.push(`/veiculos?${params.toString()}`);
  }, [
    selectedBrand, 
    debouncedModel, 
    debouncedPriceRange, 
    debouncedYearRange, 
    debouncedMaxKm, 
    minPrice, 
    maxPrice, 
    router
  ]);

  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setPriceRange([minPrice, maxPrice]);
    setYearRange([1990, new Date().getFullYear() + 1]);
    setMaxKm("");
    router.push("/veiculos");
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden w-full bg-gray-900 text-white p-4 rounded-lg flex items-center justify-between font-bold uppercase tracking-widest text-xs border border-gray-800 mb-6"
      >
        <span className="flex items-center gap-2"><SlidersHorizontal size={16} className="text-gold" /> Filtros</span>
        {isMobileOpen ? <X size={20} /> : <SlidersHorizontal size={20} />}
      </button>

      <div className={`
        bg-black/80 backdrop-blur-md p-6 rounded-lg border border-gray-800 flex flex-col gap-6 shadow-2xl sticky top-28
        ${isMobileOpen ? 'flex' : 'hidden lg:flex'}
      `}>
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 uppercase tracking-widest">
            <SlidersHorizontal size={16} className="text-gold" /> Filtros
          </h3>
          {(selectedBrand || selectedModel || maxKm) && (
            <button 
              onClick={clearFilters}
              className="text-[10px] text-red-500 font-bold uppercase hover:underline flex items-center gap-1"
            >
              <X size={12} /> Limpar
            </button>
          )}
        </div>

      <div className="flex flex-col gap-4">
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Marca</label>
          <select 
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-gray-900 text-white border border-gray-800 rounded-md p-3 text-sm outline-none focus:border-gold transition-colors"
          >
            <option value="">Todas as Marcas</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Modelo</label>
          <input
            type="text"
            placeholder="Digite o modelo..."
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-gray-900 text-white border border-gray-800 rounded-md p-3 text-sm outline-none focus:border-gold transition-colors placeholder-gray-600"
          />
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Preço Máximo</label>
          <input 
            type="range" 
            min={minPrice} 
            max={maxPrice} 
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="accent-gold h-1 w-full bg-gray-800 rounded-lg appearance-none cursor-pointer" 
          />
          <div className="flex justify-between text-[10px] text-gray-400 font-bold">
            <span>R$ {minPrice.toLocaleString('pt-BR')}</span>
            <span className="text-gold">R$ {priceRange[1].toLocaleString('pt-BR')}</span>
          </div>
        </div>

        {/* Year Range */}
        <div className="flex flex-col gap-2">
            <div className="flex justify-between">
                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Ano Mínimo</label>
                <span className="text-xs text-gold font-bold">{yearRange[0]}</span>
            </div>
            <input 
                type="range" 
                min={1990} 
                max={new Date().getFullYear() + 1} 
                value={yearRange[0]}
                onChange={(e) => setYearRange([Number(e.target.value), yearRange[1]])}
                className="accent-gold h-1 w-full bg-gray-800 rounded-lg appearance-none cursor-pointer" 
            />
        </div>

        {/* KM Max */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Quilometragem Máxima</label>
          <input
            type="number"
            placeholder="Ex: 50000"
            value={maxKm}
            onChange={(e) => setMaxKm(e.target.value)}
            className="bg-gray-900 text-white border border-gray-800 rounded-md p-3 text-sm outline-none focus:border-gold transition-colors placeholder-gray-600"
          />
        </div>
      </div>
    </div>
    </>
  );
}
