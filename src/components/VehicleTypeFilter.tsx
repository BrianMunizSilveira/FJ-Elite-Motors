"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface VehicleTypeFilterProps {
  totalCount: number;
}

export default function VehicleTypeFilter({ totalCount }: VehicleTypeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type");

  const handleTypeChange = (type: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }
    router.push(`/veiculos?${params.toString()}`);
  };

  return (
    <div className="bg-gray-900/50 p-2 rounded-lg border border-gray-800 flex items-center gap-4 text-xs font-bold text-gray-300 backdrop-blur-sm">
      <button 
        onClick={() => handleTypeChange(null)}
        className={`px-3 py-1 rounded-md transition-all ${
          !currentType ? "bg-gold/10 text-gold" : "hover:text-gold"
        }`}
      >
        TODOS ({totalCount})
      </button>
      <button 
        onClick={() => handleTypeChange("CAR")}
        className={`px-3 py-1 rounded-md transition-all ${
          currentType === "CAR" ? "bg-gold/10 text-gold" : "hover:text-gold"
        }`}
      >
        CARROS
      </button>
      <button 
        onClick={() => handleTypeChange("MOTORCYCLE")}
        className={`px-3 py-1 rounded-md transition-all ${
          currentType === "MOTORCYCLE" ? "bg-gold/10 text-gold" : "hover:text-gold"
        }`}
      >
        MOTOS
      </button>
    </div>
  );
}
