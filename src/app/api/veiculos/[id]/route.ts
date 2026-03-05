import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { vehicleSchema } from "@/lib/validations/vehicle";
import { ZodError } from "zod";

// GET /api/veiculos/[id] - Busca um único veículo
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: "ID do veículo inválido" }, { status: 400 });
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!vehicle) {
      return NextResponse.json({ error: "Veículo não encontrado" }, { status: 404 });
    }

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error("GET_VEHICLE_BY_ID_ERROR", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

// PATCH /api/veiculos/[id] - Atualiza um veículo
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const json = await request.json();
    const body = vehicleSchema.partial().parse(json);
    const { images, ...vehicleData } = body;

    // First update the vehicle data
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: vehicleData,
    });

    // If images are provided, update them (simplistic approach: delete all and recreate)
    // In a real app, you might want to handle diffing
    if (images) {
      await prisma.vehicleImage.deleteMany({
        where: { vehicleId: id },
      });
      
      if (images.length > 0) {
        await prisma.vehicleImage.createMany({
          data: images.map((url) => ({ url, vehicleId: id })),
        });
      }
    }

    const updatedVehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: { images: true },
    });

    return NextResponse.json(updatedVehicle);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten().fieldErrors }, { status: 400 });
    }
    console.error("PATCH_VEHICLE_ERROR", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

// DELETE /api/veiculos/[id] - Exclui um veículo
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.vehicle.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE_VEHICLE_ERROR", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
