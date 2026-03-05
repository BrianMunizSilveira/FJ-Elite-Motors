
import { PrismaClient, VehicleType, VehicleStatus } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Admin User
  const password = await hash('123456', 12);
  const user = await prisma.employee.upsert({
    where: { email: 'admin@fjelite.com.br' },
    update: {},
    create: {
      email: 'admin@fjelite.com.br',
      name: 'Admin',
      password,
      role: 'ADMIN',
    },
  });
  console.log({ user });

  // 2. Create Initial Vehicles
  const vehicles = [
    {
      type: VehicleType.CAR,
      brand: 'Audi',
      model: 'RS6 Avant',
      yearModel: 2024,
      yearFab: 2023,
      mileage: 0,
      price: 1100000.00,
      description: 'Audi RS6 Avant. O suprassumo das peruas esportivas.',
      fuelType: 'Gasolina',
      transmission: 'Automático',
      color: 'Preto',
      isHighlight: true,
      status: VehicleStatus.AVAILABLE,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1200' }
        ]
      }
    },
    {
      type: VehicleType.CAR,
      brand: 'BMW',
      model: '320i M Sport',
      yearModel: 2023,
      yearFab: 2023,
      mileage: 5000,
      price: 315000.00,
      description: 'BMW Série 3 Sedan. Esportividade e elegância.',
      fuelType: 'Gasolina',
      transmission: 'Automático',
      color: 'Branco',
      isHighlight: true,
      status: VehicleStatus.AVAILABLE,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200' }
        ]
      }
    },
    {
      type: VehicleType.CAR,
      brand: 'Porsche',
      model: 'Cayenne Coupé',
      yearModel: 2024,
      yearFab: 2024,
      mileage: 1500,
      price: 950000.00,
      description: 'Porsche Cayenne Coupé. Luxo e performance em um SUV.',
      fuelType: 'Híbrido',
      transmission: 'Automático',
      color: 'Cinza',
      isHighlight: true,
      status: VehicleStatus.AVAILABLE,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=1200' }
        ]
      }
    },
    // Hatch
    {
        type: VehicleType.CAR,
        brand: 'Mercedes-Benz',
        model: 'A 200 AMG Line',
        yearModel: 2024,
        yearFab: 2024,
        mileage: 0,
        price: 340000.00,
        description: 'Mercedes Classe A Hatch.',
        fuelType: 'Gasolina',
        transmission: 'Automático',
        color: 'Prata',
        isHighlight: true,
        status: VehicleStatus.AVAILABLE,
        images: {
            create: [{ url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200' }]
        }
    },
    // Picape
    {
        type: VehicleType.CAR,
        brand: 'RAM',
        model: '1500 Rebel',
        yearModel: 2022,
        yearFab: 2022,
        mileage: 25000,
        price: 459900.00,
        description: 'RAM 1500 Rebel V8.',
        fuelType: 'Gasolina',
        transmission: 'Automático',
        color: 'Preto',
        isHighlight: true,
        status: VehicleStatus.AVAILABLE,
        images: {
            create: [{ url: 'https://images.unsplash.com/photo-1609520505218-7421da3b3d80?auto=format&fit=crop&q=80&w=1200' }]
        }
    },
    // Moto
    {
        type: VehicleType.MOTORCYCLE,
        brand: 'BMW',
        model: 'S1000RR',
        yearModel: 2023,
        yearFab: 2023,
        mileage: 2000,
        price: 125000.00,
        description: 'BMW S1000RR. Superbike.',
        fuelType: 'Gasolina',
        transmission: 'Manual',
        color: 'Tricolor',
        isHighlight: true,
        status: VehicleStatus.AVAILABLE,
        images: {
            create: [{ url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200' }]
        }
    }
  ];

  for (const v of vehicles) {
    await prisma.vehicle.create({
      data: v
    });
    console.log(`Created vehicle: ${v.brand} ${v.model}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
