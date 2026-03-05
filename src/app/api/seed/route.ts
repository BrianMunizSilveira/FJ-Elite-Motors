import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VehicleType, VehicleStatus } from "@prisma/client";

export async function GET() {
  try {
    // Limpar banco (opcional, cuidado em produção)
    // await prisma.vehicleImage.deleteMany();
    // await prisma.vehicle.deleteMany();

    const vehicles = [
      {
        type: VehicleType.CAR,
        brand: "BMW",
        model: "320i M Sport",
        yearModel: 2024,
        yearFab: 2023,
        mileage: 12000,
        price: 315000,
        description: "Sedan esportivo de luxo, pacote M Sport completo, teto solar, painel digital, assistente de condução.",
        fuelType: "Flex",
        transmission: "Automático",
        color: "Branco Alpino",
        isHighlight: true,
        status: VehicleStatus.AVAILABLE,
        images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200"]
      },
      {
        type: VehicleType.CAR,
        brand: "Porsche",
        model: "Macan T",
        yearModel: 2023,
        yearFab: 2023,
        mileage: 8500,
        price: 680000,
        description: "SUV compacto de alta performance, motor 2.0 Turbo, interior em couro e alcântara, rodas 20.",
        fuelType: "Gasolina",
        transmission: "PDK",
        color: "Cinza Vulcano",
        isHighlight: true,
        status: VehicleStatus.AVAILABLE,
        images: ["https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=1200"]
      },
      {
        type: VehicleType.CAR,
        brand: "Mercedes-Benz",
        model: "A 200 AMG Line",
        yearModel: 2024,
        yearFab: 2024,
        mileage: 0,
        price: 340000,
        description: "Hatch premium com tecnologia MBUX, design agressivo AMG, motor 1.3 Turbo eficiente.",
        fuelType: "Gasolina",
        transmission: "Automático",
        color: "Preto Cosmos",
        isHighlight: true,
        status: VehicleStatus.AVAILABLE,
        images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200"]
      },
      {
        type: VehicleType.CAR,
        brand: "Ford",
        model: "Ranger Raptor",
        yearModel: 2024,
        yearFab: 2024,
        mileage: 1500,
        price: 450000,
        description: "Picape extrema preparada para off-road, suspensão Fox Racing, motor V6 Biturbo.",
        fuelType: "Gasolina",
        transmission: "Automático 10 marchas",
        color: "Laranja",
        isHighlight: true,
        status: VehicleStatus.AVAILABLE,
        images: ["https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&q=80&w=1200"]
      },
      {
        type: VehicleType.MOTORCYCLE,
        brand: "Ducati",
        model: "Panigale V4 S",
        yearModel: 2023,
        yearFab: 2023,
        mileage: 2000,
        price: 160000,
        description: "Superbike italiana, suspensão eletrônica Öhlins, 214cv de pura adrenalina.",
        fuelType: "Gasolina",
        transmission: "Manual",
        color: "Vermelho Ducati",
        isHighlight: true,
        status: VehicleStatus.AVAILABLE,
        images: ["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200"]
      },
      {
        type: VehicleType.CAR,
        brand: "Audi",
        model: "RS6 Avant",
        yearModel: 2022,
        yearFab: 2022,
        mileage: 15000,
        price: 1100000,
        description: "A perua mais rápida do mundo. Motor V8 Biturbo, 600cv, espaço para família e desempenho de supercarro.",
        fuelType: "Gasolina",
        transmission: "Tiptronic",
        color: "Cinza Nardo",
        isHighlight: false,
        status: VehicleStatus.AVAILABLE,
        images: ["https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1200"]
      }
    ];

    for (const v of vehicles) {
      const { images, ...data } = v;
      await prisma.vehicle.create({
        data: {
          ...data,
          images: {
            create: images.map(url => ({ url }))
          }
        }
      });
    }

    return NextResponse.json({ message: "Seed realizado com sucesso!", count: vehicles.length });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Erro ao rodar seed" }, { status: 500 });
  }
}
