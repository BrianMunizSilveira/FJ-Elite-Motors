 "use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema, VehicleInput } from "@/lib/validations/vehicle";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Save, Loader2, ArrowLeft, ImagePlus, X, Edit, Upload, FileText } from "lucide-react";
import Link from "next/link";

interface VehicleFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function VehicleForm({ initialData, isEditing = false }: VehicleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VehicleInput>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: initialData ? {
      ...initialData,
      price: Number(initialData.price),
      mileage: Number(initialData.mileage),
      yearModel: Number(initialData.yearModel),
      yearFab: Number(initialData.yearFab),
    } : {
      type: "CAR",
      status: "AVAILABLE",
      isHighlight: false,
      images: [],
    },
  });

  useEffect(() => {
    if (initialData?.images) {
      const urls = initialData.images.map((img: any) => img.url);
      setImageUrls(urls);
      setValue("images", urls);
    }
  }, [initialData, setValue]);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) await uploadFiles(files);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadFiles(Array.from(e.target.files));
    }
  };

  const uploadFiles = async (files: File[]) => {
    setLoading(true);
    const newUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          newUrls.push(data.url);
        } else {
          alert("Erro no upload: " + data.error);
        }
      } catch (err) {
        console.error("Upload failed", err);
        alert("Erro ao enviar arquivo.");
      }
    }

    const updatedImages = [...imageUrls, ...newUrls];
    setImageUrls(updatedImages);
    setValue("images", updatedImages);
    setLoading(false);
  };

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const addImage = () => {
    if (!newImageUrl) return;
    const updatedImages = [...imageUrls, newImageUrl];
    setImageUrls(updatedImages);
    setValue("images", updatedImages);
    setNewImageUrl("");
    setPreviewImage(null);
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setNewImageUrl(url);
    if (url.match(/\.(jpeg|jpg|gif|png|webp)$/i) || url.startsWith('http')) {
      setPreviewImage(url);
    } else {
      setPreviewImage(null);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImages);
    setValue("images", updatedImages);
  };

  const onSubmit = async (data: VehicleInput) => {
    try {
      setLoading(true);
      const url = isEditing ? `/api/veiculos/${initialData.id}` : "/api/veiculos";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(`Erro: ${JSON.stringify(errorData.error)}`);
      }
    } catch (error) {
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  const saveAsDraft = () => {
    setValue("status", "DRAFT" as any);
    handleSubmit(onSubmit)();
  };

  return (
    <div className="bg-primary p-8 rounded-2xl border border-gray-800 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-white italic tracking-tight">
          {isEditing ? "EDITAR VEÍCULO" : "NOVO VEÍCULO"}
        </h2>
        <Link href="/admin" className="text-gray-400 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <ArrowLeft size={16} /> Voltar
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Tipo</label>
            <select {...register("type")} className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors">
              <option value="CAR">Carro</option>
              <option value="MOTORCYCLE">Moto</option>
            </select>
            {errors.type && <span className="text-red-500 text-xs">{errors.type.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Marca</label>
            <input 
              {...register("brand")} 
              placeholder="Ex: BMW"
              className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
            />
            {errors.brand && <span className="text-red-500 text-xs">{errors.brand.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Modelo</label>
            <input 
              {...register("model")} 
              placeholder="Ex: 320i M Sport"
              className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
            />
            {errors.model && <span className="text-red-500 text-xs">{errors.model.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Preço (R$)</label>
            <input 
              type="number" 
              step="0.01"
              {...register("price", { valueAsNumber: true })} 
              className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
            />
            {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Ano Modelo</label>
            <input 
              type="number" 
              {...register("yearModel", { valueAsNumber: true })} 
              className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
            />
            {errors.yearModel && <span className="text-red-500 text-xs">{errors.yearModel.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Ano Fabricação</label>
            <input 
              type="number" 
              {...register("yearFab", { valueAsNumber: true })} 
              className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
            />
            {errors.yearFab && <span className="text-red-500 text-xs">{errors.yearFab.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Quilometragem</label>
            <input 
              type="number" 
              {...register("mileage", { valueAsNumber: true })} 
              className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
            />
            {errors.mileage && <span className="text-red-500 text-xs">{errors.mileage.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Combustível</label>
            <input 
              {...register("fuelType")} 
              placeholder="Ex: Gasolina"
              className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Câmbio</label>
            <input 
              {...register("transmission")} 
              placeholder="Ex: Automático"
              className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Cor</label>
            <input 
              {...register("color")} 
              placeholder="Ex: Preto"
              className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Status</label>
            <select {...register("status")} className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors">
              <option value="DRAFT">Rascunho</option>
              <option value="AVAILABLE">Disponível</option>
              <option value="RESERVED">Reservado</option>
              <option value="SOLD">Vendido</option>
            </select>
          </div>

          <div className="flex items-center gap-3 bg-gray-900 p-4 rounded-lg border border-gray-800">
            <input 
              type="checkbox" 
              {...register("isHighlight")} 
              className="w-5 h-5 accent-gold"
            />
            <label className="text-sm font-bold text-white uppercase tracking-wider">Destacar na Home</label>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Imagens</label>
          
          <div 
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-colors ${
              isDragging ? "border-gold bg-gold/10" : "border-gray-800 bg-gray-900/50 hover:border-gray-600"
            }`}
          >
            <Upload size={32} className={isDragging ? "text-gold" : "text-gray-500"} />
            <div className="text-center">
              <p className="text-white font-bold text-sm">Arraste e solte imagens aqui</p>
              <p className="text-gray-500 text-xs mt-1">ou clique para selecionar</p>
            </div>
            <input 
              type="file" 
              multiple 
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden" 
              id="file-upload"
            />
            <label 
              htmlFor="file-upload"
              className="bg-gray-800 text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gold hover:text-primary transition-colors"
            >
              Selecionar Arquivos
            </label>
          </div>

          {/* URL Input Fallback */}
          <div className="flex gap-2 items-center mt-2">
            <input 
              value={newImageUrl}
              onChange={handleImageInput}
              placeholder="Ou cole uma URL de imagem externa..."
              className="bg-gray-900 border border-gray-800 text-white p-3 rounded-lg outline-none focus:border-gold transition-colors flex-1 text-sm"
            />
            <button 
              type="button"
              onClick={addImage}
              disabled={!newImageUrl}
              className="bg-gray-800 text-white p-3 rounded-lg hover:bg-gold hover:text-primary transition-colors disabled:opacity-50"
            >
              <ImagePlus size={20} />
            </button>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-800 h-32 bg-gray-900">
                <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                    title="Remover Imagem"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-mono">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          {errors.images && <span className="text-red-500 text-xs">{errors.images.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Descrição</label>
          <textarea 
            {...register("description")} 
            rows={4}
            className="bg-gray-900 border border-gray-800 text-white p-4 rounded-lg outline-none focus:border-gold transition-colors resize-none"
          ></textarea>
        </div>

        <div className="flex gap-4 mt-4">
          <button 
            type="button"
            onClick={saveAsDraft}
            disabled={loading}
            className="flex-1 bg-gray-800 text-white font-black py-5 rounded-lg hover:bg-gray-700 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] disabled:opacity-50"
          >
            <FileText size={18} />
            SALVAR RASCUNHO
          </button>

          <button 
            type="submit"
            disabled={loading}
            className="flex-1 bg-gold text-primary font-black py-5 rounded-lg hover:bg-yellow-600 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] shadow-xl shadow-gold/10 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
            {isEditing ? "SALVAR ALTERAÇÕES" : "PUBLICAR VEÍCULO"}
          </button>
        </div>
      </form>
    </div>
  );
}
