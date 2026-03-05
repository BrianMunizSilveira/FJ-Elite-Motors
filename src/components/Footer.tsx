import Link from "next/link";
import { Car, Mail, Phone, MapPin, Instagram, Facebook, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gold p-2 rounded-sm">
              <Car className="text-primary" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tighter text-white">FJ ELITE</span>
              <span className="text-[10px] text-gold font-bold tracking-[0.2em] -mt-1">MOTORS</span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed">
            Especialistas em veículos premium e seminovos de alta qualidade.
            Realizamos sonhos com transparência e excelência.
          </p>
          <div className="flex gap-4">
            <div className="bg-gray-800 p-2 rounded-full hover:bg-gold hover:text-primary transition-all cursor-pointer">
              <Instagram size={20} />
            </div>
            <div className="bg-gray-800 p-2 rounded-full hover:bg-gold hover:text-primary transition-all cursor-pointer">
              <Facebook size={20} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold tracking-wider text-sm">NAVEGAÇÃO</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link href="/" className="hover:text-gold transition-colors flex items-center gap-2"><ArrowRight size={14} /> Home</Link></li>
            <li><Link href="/veiculos" className="hover:text-gold transition-colors flex items-center gap-2"><ArrowRight size={14} /> Nosso Estoque</Link></li>
            <li><Link href="/quem-somos" className="hover:text-gold transition-colors flex items-center gap-2"><ArrowRight size={14} /> Quem Somos</Link></li>
            <li><Link href="/contato" className="hover:text-gold transition-colors flex items-center gap-2"><ArrowRight size={14} /> Contato</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold tracking-wider text-sm">CONTATO</h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-gold mt-1 shrink-0" size={18} />
              <span>Av. Paulista, 1000 - Bela Vista, São Paulo - SP</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-gold shrink-0" size={18} />
              <span>(11) 99999-9999</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-gold shrink-0" size={18} />
              <span>contato@fjelitemotors.com.br</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold tracking-wider text-sm">HORÁRIO</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex justify-between">
              <span>Segunda a Sexta</span>
              <span className="text-white font-medium">09:00 - 18:00</span>
            </li>
            <li className="flex justify-between">
              <span>Sábado</span>
              <span className="text-white font-medium">09:00 - 14:00</span>
            </li>
            <li className="flex justify-between">
              <span>Domingo</span>
              <span className="text-red-500 font-medium italic">Fechado</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} FJ ELITE MOTORS. Todos os direitos reservados. | Desenvolvido por Aatrox, o Destruidor de Mundos.</p>
      </div>
    </footer>
  );
}
