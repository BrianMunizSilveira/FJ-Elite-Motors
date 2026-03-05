import { Phone, Mail, MapPin, Send, Instagram, Facebook, Clock } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function ContactPage() {
  return (
    <AnimatedBackground className="bg-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-6">
            ENTRE EM <span className="text-gold">CONTATO</span>
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Estamos prontos para atender você. Seja para comprar, vender ou tirar dúvidas, fale com nossos especialistas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-primary/80 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-gray-800 shadow-2xl">
            <h2 className="text-2xl font-black text-white italic tracking-tight mb-8">ENVIE UMA MENSAGEM</h2>
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Nome Completo</label>
                  <input 
                    type="text" 
                    placeholder="Seu nome"
                    className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">E-mail</label>
                  <input 
                    type="email" 
                    placeholder="seu@email.com"
                    className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Telefone/WhatsApp</label>
                  <input 
                    type="text" 
                    placeholder="(11) 99999-9999"
                    className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Assunto</label>
                  <select className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors">
                    <option>Interesse em Veículo</option>
                    <option>Vender meu Veículo</option>
                    <option>Financiamento</option>
                    <option>Outros</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Mensagem</label>
                <textarea 
                  rows={4}
                  placeholder="Como podemos ajudar?"
                  className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors resize-none"
                ></textarea>
              </div>

              <button className="bg-gold text-primary font-black py-5 rounded-lg hover:bg-yellow-600 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] shadow-xl shadow-gold/10 mt-4">
                <Send size={18} /> ENVIAR MENSAGEM
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="flex flex-col gap-8">
            <div className="bg-primary/80 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-gray-800 shadow-2xl flex flex-col gap-8">
              <h2 className="text-2xl font-black text-white italic tracking-tight">NOSSOS CANAIS</h2>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-gold border border-gray-800 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">Endereço</h4>
                    <p className="text-gray-400 text-sm">1369 R. Serafim Valandro Santa Maria, Rio Grande do Sul - RS</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-gold border border-gray-800 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">Telefone / WhatsApp</h4>
                    <p className="text-gray-400 text-sm">(55) 99999-9999</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-gold border border-gray-800 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">E-mail</h4>
                    <p className="text-gray-400 text-sm">contato@fjelitemotors.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-gold border border-gray-800 shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">Horário de Atendimento</h4>
                    <p className="text-gray-400 text-sm">Seg - Sex: 09:00 às 18:00 | Sáb: 09:00 às 14:00</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-800 flex gap-4">
                <a href="#" className="bg-gray-900 p-3 rounded-full text-white hover:text-gold hover:border-gold border border-gray-800 transition-all">
                  <Instagram size={24} />
                </a>
                <a href="#" className="bg-gray-900 p-3 rounded-full text-white hover:text-gold hover:border-gold border border-gray-800 transition-all">
                  <Facebook size={24} />
                </a>
              </div>
            </div>

            {/* Google Map */}
            <div className="h-full min-h-[300px] bg-gray-900 rounded-2xl border border-gray-800 relative overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!4v1772707639652!6m8!1m7!1sxHz02aQVR25vUeESjDMWGw!2m2!1d-29.69212636754972!2d-53.80960562751455!3f296.7048851903331!4f-0.11350511862696067!5f0.4000000000000002" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '300px' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização FJ Elite Motors"
                className="absolute inset-0 w-full h-full filter grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
