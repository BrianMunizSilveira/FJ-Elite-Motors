"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciais inválidas");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <div className="bg-primary p-8 rounded-2xl border border-gray-800 shadow-2xl max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gold p-4 rounded-full mb-4">
            <Lock className="text-primary" size={32} />
          </div>
          <h1 className="text-2xl font-black text-white italic tracking-tighter">ÁREA RESTRITA</h1>
          <p className="text-gray-400 text-sm">Acesso exclusivo para administradores</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
              placeholder="admin@fjelitemotors.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <div className="text-red-500 text-sm text-center font-bold">{error}</div>}

          <button className="bg-gold text-primary font-black py-4 rounded-lg hover:bg-yellow-600 transition-all uppercase tracking-[0.2em] shadow-xl shadow-gold/10">
            ACESSAR SISTEMA
          </button>
        </form>
      </div>
    </div>
  );
}
