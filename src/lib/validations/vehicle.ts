import { z } from "zod";
import { VehicleType, VehicleStatus } from "@prisma/client";

export const vehicleSchema = z.object({
  type: z.nativeEnum(VehicleType),
  brand: z.string().min(1, "Marca é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  yearModel: z.number().int().min(1900).max(new Date().getFullYear() + 2),
  yearFab: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  mileage: z.number().nonnegative(),
  price: z.number().positive("Preço deve ser maior que zero"),
  description: z.string().optional(),
  fuelType: z.string().optional(),
  transmission: z.string().optional(),
  color: z.string().optional(),
  isHighlight: z.boolean().default(false),
  status: z.nativeEnum(VehicleStatus).default(VehicleStatus.AVAILABLE),
  images: z.array(z.string()).optional().default([]),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;
