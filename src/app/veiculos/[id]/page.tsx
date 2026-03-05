import { ChevronLeft, Share2, Heart, ShieldCheck, MapPin, Gauge, Fuel, Calendar, Zap, Box, Settings, User } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import VehicleGallery from "@/components/VehicleGallery";

// Force dynamic rendering for this route to ensure fresh data
export const dynamic = "force-dynamic";

export default async function VehicleDetailPage({ params }: { params: { id: string } }) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: params.id },
    include: { images: true },
  });

  if (!vehicle) {
    notFound();
  }

  return (
    <AnimatedBackground className="bg-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/veiculos" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors text-xs font-bold uppercase tracking-widest">
            <ChevronLeft size={16} /> Voltar ao Estoque
          </Link>
          <div className="flex gap-4">
            <button className="bg-gray-900 p-3 rounded-full border border-gray-800 text-white hover:text-gold transition-colors"><Share2 size={20} /></button>
            <button className="bg-gray-900 p-3 rounded-full border border-gray-800 text-white hover:text-accent transition-colors"><Heart size={20} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Images & Description) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <VehicleGallery images={vehicle.images} model={vehicle.model} />

            <div className="bg-primary/80 backdrop-blur-md p-6 md:p-10 rounded-xl border border-gray-800 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tighter mb-6">DESCRIÇÃO DO VEÍCULO</h3>
              <p className="text-gray-400 leading-relaxed text-base md:text-lg mb-10 font-light whitespace-pre-wrap">
                {vehicle.description || "Sem descrição disponível."}
              </p>

              <h3 className="text-lg md:text-xl font-black text-white italic tracking-tighter mb-6 uppercase tracking-widest">DETALHES TÉCNICOS</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 <div className="flex items-center gap-3 bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                    <Zap size={16} className="text-gold" />
                    <span className="text-sm text-gray-300 font-medium">Cor: {vehicle.color || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                    <Settings size={16} className="text-gold" />
                    <span className="text-sm text-gray-300 font-medium">{vehicle.transmission || "Automático"}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                    <Fuel size={16} className="text-gold" />
                    <span className="text-sm text-gray-300 font-medium">{vehicle.fuelType || "Flex"}</span>
                  </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Price & Contact) */}
          <aside className="lg:col-span-1 flex flex-col gap-8">
            <div className="bg-primary/80 backdrop-blur-md p-6 md:p-10 rounded-xl border border-gray-800 shadow-2xl sticky top-28">
              <div className="flex flex-col mb-8 pb-8 border-b border-gray-800">
                <span className="text-gold font-bold text-xs md:text-sm tracking-[0.3em] mb-2 uppercase">{vehicle.brand}</span>
                <h1 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter mb-4 uppercase">{vehicle.model}</h1>
                <div className="text-3xl md:text-4xl font-black text-gold italic tracking-tighter">
                  R$ {Number(vehicle.price).toLocaleString('pt-BR')}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-10">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"><Calendar size={12} className="text-gold" /> Ano</span>
                  <span className="text-white font-bold">{vehicle.yearFab}/{vehicle.yearModel}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"><Gauge size={12} className="text-gold" /> KM</span>
                  <span className="text-white font-bold">{Number(vehicle.mileage).toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"><Fuel size={12} className="text-gold" /> Combustível</span>
                  <span className="text-white font-bold">{vehicle.fuelType || "N/A"}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"><Settings size={12} className="text-gold" /> Câmbio</span>
                  <span className="text-white font-bold">{vehicle.transmission || "N/A"}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Link 
                  href={`https://wa.me/555599153132?text=Olá, tenho interesse no veículo ${vehicle.brand} ${vehicle.model} anunciado por R$ ${Number(vehicle.price).toLocaleString('pt-BR')}`}
                  target="_blank"
                  className="bg-green-600 text-white w-full py-5 rounded-lg font-black text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-900/20 uppercase tracking-widest"
                >
                  WHATSAPP
                </Link>
                <Link 
                  href="/contato"
                  className="bg-accent text-white w-full py-5 rounded-lg font-black text-lg hover:bg-red-700 transition-all shadow-xl shadow-accent/20 uppercase tracking-widest text-center"
                >
                  ESTOU INTERESSADO
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-800 flex items-center gap-4 text-gray-400 text-xs italic">
                <ShieldCheck size={24} className="text-gold shrink-0" />
                <p>Veículo periciado e com garantia de procedência. Aceitamos seu usado na troca.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AnimatedBackground>
  );
}
