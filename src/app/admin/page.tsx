"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Car, Loader2, Download, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/veiculos");
      const data = await res.json();
      setVehicles(data);
    } catch (error) {
      console.error("Failed to fetch vehicles", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este veículo?")) return;
    
    try {
      const res = await fetch(`/api/veiculos/${id}`, { method: "DELETE" });
      if (res.ok) {
        setVehicles(vehicles.filter(v => v.id !== id));
      } else {
        alert("Erro ao excluir veículo");
      }
    } catch (error) {
      alert("Erro de conexão");
    }
  };

  const exportToCSV = () => {
    const headers = ["ID", "Marca", "Modelo", "Ano", "Preço", "Status"];
    const rows = vehicles.map(v => [
      v.id,
      v.brand,
      v.model,
      `${v.yearFab}/${v.yearModel}`,
      v.price,
      v.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "estoque_fj_elite.csv");
    document.body.appendChild(link);
    link.click();
  };

  const filteredVehicles = vehicles.filter(v => 
    v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedVehicles = filteredVehicles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="bg-black min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black text-white italic tracking-tighter">PAINEL ADMINISTRATIVO</h1>
            <p className="text-gray-400 uppercase text-xs tracking-[0.2em] font-bold">Gerenciamento de Estoque FJ Elite</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="bg-gray-900 text-white px-6 py-4 rounded-lg font-bold flex items-center gap-3 hover:bg-red-900 hover:text-red-200 transition-all border border-gray-800"
            >
              <LogOut size={20} /> SAIR
            </button>
            <Link 
              href="/admin/veiculos/novo" 
              className="bg-gold text-primary px-8 py-4 rounded-lg font-black flex items-center gap-3 hover:bg-yellow-600 transition-all shadow-xl shadow-gold/10"
            >
              <Plus size={20} /> ADICIONAR VEÍCULO
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-primary p-6 rounded-xl border border-gray-800">
            <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Total de Veículos</h3>
            <span className="text-3xl font-black text-white">{vehicles.length}</span>
          </div>
          <div className="bg-primary p-6 rounded-xl border border-gray-800">
            <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Valor em Estoque</h3>
            <span className="text-3xl font-black text-gold">
              R$ {vehicles.reduce((acc, curr) => acc + Number(curr.price), 0).toLocaleString('pt-BR', { notation: "compact" })}
            </span>
          </div>
          <div className="bg-primary p-6 rounded-xl border border-gray-800">
            <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Vendidos</h3>
            <span className="text-3xl font-black text-green-500">
              {vehicles.filter(v => v.status === 'SOLD').length}
            </span>
          </div>
          <div className="bg-primary p-6 rounded-xl border border-gray-800">
            <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Disponíveis</h3>
            <span className="text-3xl font-black text-blue-500">
              {vehicles.filter(v => v.status === 'AVAILABLE').length}
            </span>
          </div>
          <div className="bg-primary p-6 rounded-xl border border-gray-800">
            <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Rascunhos</h3>
            <span className="text-3xl font-black text-gray-500">
              {vehicles.filter(v => v.status === 'DRAFT').length}
            </span>
          </div>
        </div>

        <div className="bg-primary rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-900/50">
            <div className="flex items-center bg-black/50 rounded-lg px-4 py-3 border border-gray-800 w-full md:w-96">
              <Search className="text-gray-500 mr-4" size={20} />
              <input 
                type="text" 
                placeholder="Pesquisar por marca ou modelo..." 
                className="bg-transparent text-white w-full outline-none text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={exportToCSV}
              className="bg-gray-800 text-gray-300 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:text-gold hover:border-gold border border-transparent transition-all text-xs uppercase tracking-widest"
            >
              <Download size={16} /> Exportar CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900/80 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-800">
                  <th className="px-8 py-5">Veículo</th>
                  <th className="px-8 py-5">Ano</th>
                  <th className="px-8 py-5">Preço</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Loader2 className="text-gold animate-spin" size={40} />
                        <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Carregando estoque...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedVehicles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4 text-gray-600">
                        <Car size={48} />
                        <span className="font-bold uppercase tracking-widest text-xs">Nenhum veículo encontrado</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedVehicles.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-900/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-gold font-bold text-[10px] tracking-widest mb-1">{v.brand}</span>
                          <span className="text-white font-black italic tracking-tight text-lg">{v.model}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-gray-300 font-bold">{v.yearFab}/{v.yearModel}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-white font-black italic">R$ {Number(v.price).toLocaleString('pt-BR')}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          v.status === 'AVAILABLE' ? 'bg-green-900/30 text-green-500' : 
                          v.status === 'SOLD' ? 'bg-red-900/30 text-red-500' : 
                          v.status === 'RESERVED' ? 'bg-yellow-900/30 text-yellow-500' :
                          'bg-gray-800 text-gray-400'
                        }`}>
                          {v.status === 'AVAILABLE' ? 'Disponível' : 
                           v.status === 'SOLD' ? 'Vendido' : 
                           v.status === 'RESERVED' ? 'Reservado' : 
                           'Rascunho'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3">
                          <Link 
                            href={`/admin/veiculos/editar/${v.id}`}
                            className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-gold hover:border-gold border border-transparent transition-all"
                          >
                            <Edit size={18} />
                          </Link>
                          <button 
                            onClick={() => deleteVehicle(v.id)}
                            className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-500 border border-transparent transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-800 flex justify-between items-center bg-gray-900/50">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
              Página {page} de {totalPages || 1}
            </span>
            <div className="flex gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 bg-gray-800 text-white rounded text-xs font-bold disabled:opacity-50 hover:bg-gold hover:text-primary transition-colors"
              >
                ANTERIOR
              </button>
              <button 
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 bg-gray-800 text-white rounded text-xs font-bold disabled:opacity-50 hover:bg-gold hover:text-primary transition-colors"
              >
                PRÓXIMO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
