import Link from "next/link";
import { Search, ShieldCheck, CreditCard, ThumbsUp, CheckCircle2, Car, ChevronRight } from "lucide-react";
import CategoryNav from "@/components/CategoryNav";
import { prisma } from "@/lib/prisma";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { SedanIcon, SUVIcon, HatchIcon, PicapeIcon, MotoIcon } from "@/components/icons/VehicleIcons";

// Revalidate data every 60 seconds (ISR)
export const revalidate = 60;

async function getVehicles() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        status: "AVAILABLE",
      },
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return vehicles;
  } catch (error) {
    console.error("Failed to fetch vehicles for home:", error);
    return [];
  }
}

export default async function Home() {
  const vehicles = await getVehicles();

  const categories = [
    { name: "SEDAN", icon: <SedanIcon size={40} />, id: "sedan", type: "CAR" },
    { name: "SUV", icon: <SUVIcon size={40} />, id: "suv", type: "CAR" },
    { name: "HATCH", icon: <HatchIcon size={40} />, id: "hatch", type: "CAR" },
    { name: "PICAPE", icon: <PicapeIcon size={40} />, id: "picape", type: "CAR" },
    { name: "MOTO", icon: <MotoIcon size={40} />, id: "moto", type: "MOTORCYCLE" },
  ];

  // Helper to filter vehicles (Simulated category logic for now, can be improved with DB fields)
  // In a real scenario, you'd probably have a 'category' field or infer it from bodyType
  const getVehiclesByCategory = (catId: string, type: string) => {
    return vehicles.filter(v => {
      // Basic filtering logic
      if (catId === 'moto') return v.type === 'MOTORCYCLE';
      if (v.type !== 'CAR') return false;
      
      // Heuristic for demo purposes (matching string in model/description)
      // Ideally, add a 'bodyType' enum to the Vehicle model
      const searchStr = (v.model + " " + v.description).toLowerCase();
      if (catId === 'sedan') return searchStr.includes('sedan') || (!searchStr.includes('suv') && !searchStr.includes('hatch') && !searchStr.includes('picape'));
      if (catId === 'suv') return searchStr.includes('suv') || searchStr.includes('utilitário');
      if (catId === 'hatch') return searchStr.includes('hatch');
      if (catId === 'picape') return searchStr.includes('picape') || searchStr.includes('caminhonete');
      
      return true; // Fallback
    }).slice(0, 3); // Limit to 3 per category
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter italic">
            SEU PRÓXIMO <span className="text-gold">ELITE</span> ESTÁ AQUI
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Transparência, qualidade e a melhor negociação do mercado.
            Venha conhecer nosso estoque exclusivo.
          </p>

          <div className="bg-primary/90 p-4 rounded-lg shadow-2xl border border-gray-800 flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center bg-gray-900 rounded-md px-4 py-3 border border-gray-800">
              <Search className="text-gray-500 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Qual veículo você procura?" 
                className="bg-transparent text-white w-full outline-none text-sm"
              />
            </div>
            <Link href="/veiculos" className="bg-gold text-primary px-8 py-3 rounded-md font-bold hover:bg-yellow-600 transition-all flex items-center justify-center gap-2">
              BUSCAR VEÍCULOS
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Nav */}
      <CategoryNav categories={categories} />

      {/* Features */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-gold border border-gold/20">
              <ShieldCheck size={32} />
            </div>
            <h3 className="font-bold text-white text-lg">Garantia Total</h3>
            <p className="text-sm text-gray-400">Veículos revisados e com garantia de procedência.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-gold border border-gold/20">
              <CreditCard size={32} />
            </div>
            <h3 className="font-bold text-white text-lg">Financiamento</h3>
            <p className="text-sm text-gray-400">As melhores taxas com aprovação imediata.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-gold border border-gold/20">
              <ThumbsUp size={32} />
            </div>
            <h3 className="font-bold text-white text-lg">Troca na Troca</h3>
            <p className="text-sm text-gray-400">Pagamos o melhor valor no seu usado.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-gold border border-gold/20">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-bold text-white text-lg">Venda Consignada</h3>
            <p className="text-sm text-gray-400">Vendemos seu veículo com segurança e rapidez.</p>
          </div>
        </div>
      </section>

      {/* Inventory Sections (Dynamic) */}
      <div className="bg-black">
        {categories.map((cat) => {
          const categoryVehicles = getVehiclesByCategory(cat.id, cat.type);
          
          if (categoryVehicles.length === 0) return null;

          return (
            <AnimatedBackground 
              key={cat.id} 
              className="py-24 border-t border-gray-900"
            >
              <div id={cat.id} className="max-w-7xl mx-auto px-4 relative z-10 scroll-mt-[200px]">
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-gold">{cat.icon}</span>
                  <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase">
                    DESTAQUES <span className="text-gold">{cat.name}</span>
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {categoryVehicles.map((v) => (
                    <Link 
                      key={v.id} 
                      href={`/veiculos/${v.id}`}
                      className="bg-primary/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/10 transition-all group block"
                    >
                      <div className="h-48 bg-gray-900 flex items-center justify-center text-gray-700 font-bold text-xl italic relative overflow-hidden">
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
                        <div className="absolute top-4 right-4 bg-gold text-primary px-3 py-1 text-[10px] font-black italic rounded-sm shadow-xl">
                          {v.yearFab}/{v.yearModel}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-gold font-bold text-xs tracking-widest mb-1 uppercase">{v.brand}</div>
                        <h3 className="text-white font-black text-xl italic mb-4 truncate">{v.model}</h3>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                          <span className="text-white font-black text-2xl italic">R$ {Number(v.price).toLocaleString('pt-BR')}</span>
                          <span className="text-xs font-bold text-gray-400 group-hover:text-gold transition-colors uppercase tracking-widest flex items-center gap-1">
                            Ver mais <ChevronRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedBackground>
          );
        })}
      </div>

      {/* CTA Section */}
      <section className="py-24 bg-accent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 italic tracking-tight">
            QUER VENDER SEU VEÍCULO?
          </h2>
          <p className="text-white/80 mb-10 text-lg">
            A FJ Elite Motors compra seu carro ou moto à vista com a melhor avaliação do mercado.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/contato" className="bg-white text-accent px-10 py-4 rounded-md font-black hover:bg-gray-100 transition-all shadow-xl">
              AVALIE AGORA
            </Link>
            <Link href="https://wa.me/5511999999999" className="bg-primary text-white px-10 py-4 rounded-md font-black hover:bg-gray-900 transition-all shadow-xl">
              FALAR NO WHATSAPP
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
