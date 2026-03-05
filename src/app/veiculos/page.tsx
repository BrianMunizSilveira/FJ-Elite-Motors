import { Search, Filter, SlidersHorizontal, MapPin, Gauge, Fuel, Calendar, Car } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import VehicleFilters from "@/components/VehicleFilters";
import VehicleTypeFilter from "@/components/VehicleTypeFilter";
import { Suspense } from "react";

// Revalidate every 60 seconds
export const revalidate = 60;

interface SearchParams {
  brand?: string;
  model?: string;
  minPrice?: string;
  maxPrice?: string;
  minYear?: string;
  maxYear?: string;
  maxKm?: string;
  type?: string;
}

async function getVehicles(searchParams: SearchParams) {
  const where: any = {
    status: "AVAILABLE",
  };

  if (searchParams.type) {
    where.type = searchParams.type;
  }

  if (searchParams.brand) {
    where.brand = {
      contains: searchParams.brand,
      mode: 'insensitive',
    };
  }

  if (searchParams.model) {
    where.model = {
      contains: searchParams.model,
      mode: 'insensitive',
    };
  }

  if (searchParams.minPrice) {
    where.price = { ...where.price, gte: parseFloat(searchParams.minPrice) };
  }

  if (searchParams.maxPrice) {
    where.price = { ...where.price, lte: parseFloat(searchParams.maxPrice) };
  }

  if (searchParams.minYear) {
    where.yearModel = { ...where.yearModel, gte: parseInt(searchParams.minYear) };
  }

  if (searchParams.maxYear) {
    where.yearModel = { ...where.yearModel, lte: parseInt(searchParams.maxYear) };
  }

  if (searchParams.maxKm) {
    where.mileage = { ...where.mileage, lte: parseFloat(searchParams.maxKm) };
  }

  try {
    const vehicles = await prisma.vehicle.findMany({
      where,
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return vehicles;
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    return [];
  }
}

async function getFilterData() {
  const brands = await prisma.vehicle.findMany({
    where: { status: "AVAILABLE" },
    select: { brand: true },
    distinct: ['brand'],
    orderBy: { brand: 'asc' }
  });

  const priceRange = await prisma.vehicle.aggregate({
    where: { status: "AVAILABLE" },
    _min: { price: true },
    _max: { price: true }
  });

  const totalCount = await prisma.vehicle.count({
    where: { status: "AVAILABLE" }
  });

  return {
    brands: brands.map(b => b.brand),
    minPrice: Number(priceRange._min.price) || 0,
    maxPrice: Number(priceRange._max.price) || 1000000,
    totalCount
  };
}

export default async function VehiclesPage({ searchParams }: { searchParams: SearchParams }) {
  const vehicles = await getVehicles(searchParams);
  const { brands, minPrice, maxPrice, totalCount } = await getFilterData();

  return (
    <AnimatedBackground className="bg-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black text-white italic tracking-tighter">NOSSO ESTOQUE</h1>
            <p className="text-gray-400">Confira nossos veículos selecionados para você.</p>
          </div>
          <Suspense>
            <VehicleTypeFilter totalCount={totalCount} />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 flex flex-col gap-6 sticky top-28 h-fit">
            <Suspense>
              <VehicleFilters 
                brands={brands} 
                models={[]} 
                minPrice={minPrice} 
                maxPrice={maxPrice} 
              />
            </Suspense>
          </aside>

          {/* Vehicle Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {vehicles.map((v) => (
              <Link 
                key={v.id} 
                href={`/veiculos/${v.id}`}
                className="bg-primary/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/10 transition-all group flex flex-col"
              >
                <div className="h-64 bg-gray-900 flex items-center justify-center text-gray-700 font-bold text-xl italic relative overflow-hidden">
                  {v.images && v.images.length > 0 ? (
                    <img 
                      src={v.images[0].url} 
                      alt={v.model} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  ) : (
                    <Car size={48} className="text-gray-800" />
                  )}
                  {v.isHighlight && (
                    <span className="absolute top-4 left-4 bg-accent text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-widest">
                      DESTAQUE
                    </span>
                  )}
                </div>
                
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div>
                    <span className="text-gold font-bold text-xs tracking-widest uppercase mb-1 block">{v.brand}</span>
                    <h2 className="text-white font-black text-2xl italic tracking-tight leading-none">{v.model}</h2>
                  </div>

                  <div className="text-2xl font-black text-white italic tracking-tighter">
                    R$ {Number(v.price).toLocaleString('pt-BR')}
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-400 font-medium pt-4 border-t border-gray-800/50">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gold" /> {v.yearFab}/{v.yearModel}
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge size={14} className="text-gold" /> {Number(v.mileage).toLocaleString()} km
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel size={14} className="text-gold" /> {v.fuelType || "Flex"}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-gold" /> São Paulo - SP
                    </div>
                  </div>

                  <button className="w-full mt-auto bg-gray-900 text-white py-3 rounded-md font-bold text-xs hover:bg-gold hover:text-primary transition-all uppercase tracking-widest border border-gray-800 group-hover:border-gold/50">
                    VER DETALHES DO VEÍCULO
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
