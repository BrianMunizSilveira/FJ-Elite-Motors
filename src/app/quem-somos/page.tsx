import { ShieldCheck, Users, Award, Clock } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function AboutPage() {
  return (
    <AnimatedBackground className="bg-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-6">
            QUEM <span className="text-gold">SOMOS</span>
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Na FJ Elite Motors, não vendemos apenas veículos; entregamos sonhos, segurança e uma experiência de elite em cada negociação.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1200" 
              alt="Showroom FJ Elite Motors" 
              className="w-full h-auto object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
          
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-black text-white italic tracking-tight">TRADIÇÃO E EXCELÊNCIA</h2>
            <p className="text-gray-400 leading-relaxed text-lg font-light">
              Fundada com o propósito de redefinir o mercado de seminovos premium, a FJ Elite Motors consolidou-se como referência em qualidade e transparência. Localizada no coração de São Paulo, nossa loja oferece uma curadoria exclusiva de veículos que passam por rigorosos processos de inspeção.
            </p>
            <p className="text-gray-400 leading-relaxed text-lg font-light">
              Nosso compromisso vai além da venda. Buscamos construir relacionamentos duradouros com nossos clientes, baseados na confiança e no atendimento personalizado que cada entusiasta automotivo merece.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
          <div className="bg-primary/80 backdrop-blur-md p-8 rounded-xl border border-gray-800 text-center hover:border-gold/50 transition-all group">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-gold mx-auto mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-white font-bold text-lg mb-3">CONFIANÇA</h3>
            <p className="text-gray-400 text-sm">Laudos cautelares 100% aprovados em todo nosso estoque.</p>
          </div>
          
          <div className="bg-primary/80 backdrop-blur-md p-8 rounded-xl border border-gray-800 text-center hover:border-gold/50 transition-all group">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-gold mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Users size={32} />
            </div>
            <h3 className="text-white font-bold text-lg mb-3">ATENDIMENTO</h3>
            <p className="text-gray-400 text-sm">Consultores especialistas prontos para realizar sua melhor escolha.</p>
          </div>

          <div className="bg-primary/80 backdrop-blur-md p-8 rounded-xl border border-gray-800 text-center hover:border-gold/50 transition-all group">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-gold mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Award size={32} />
            </div>
            <h3 className="text-white font-bold text-lg mb-3">QUALIDADE</h3>
            <p className="text-gray-400 text-sm">Seleção rigorosa de veículos com baixa quilometragem e revisados.</p>
          </div>

          <div className="bg-primary/80 backdrop-blur-md p-8 rounded-xl border border-gray-800 text-center hover:border-gold/50 transition-all group">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-gold mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Clock size={32} />
            </div>
            <h3 className="text-white font-bold text-lg mb-3">AGILIDADE</h3>
            <p className="text-gray-400 text-sm">Processos de financiamento e documentação rápidos e sem burocracia.</p>
          </div>
        </div>

        {/* Mission/Vision */}
        <div className="bg-gold p-12 rounded-2xl flex flex-col md:flex-row gap-12 items-center shadow-xl shadow-gold/10">
          <div className="flex-1 text-primary">
            <h2 className="text-3xl font-black italic tracking-tighter mb-4">NOSSA MISSÃO</h2>
            <p className="text-lg font-bold leading-relaxed">
              Superar as expectativas dos nossos clientes através de veículos de procedência impecável e um serviço que prioriza a transparência total.
            </p>
          </div>
          <div className="w-px h-24 bg-primary/20 hidden md:block"></div>
          <div className="flex-1 text-primary">
            <h2 className="text-3xl font-black italic tracking-tighter mb-4">NOSSA VISÃO</h2>
            <p className="text-lg font-bold leading-relaxed">
              Ser a maior e mais confiável revenda de veículos premium de São Paulo, reconhecida pela excelência em cada detalhe.
            </p>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
