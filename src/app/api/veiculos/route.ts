import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { vehicleSchema } from "@/lib/validations/vehicle";
import { ZodError } from "zod";

// GET /api/veiculos - Lista todos os veículos
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const brand = searchParams.get("brand");
    const isHighlight = searchParams.get("highlight") === "true";

    const where: any = {};
    if (type) where.type = type;
    if (brand) where.brand = { contains: brand, mode: "insensitive" };
    if (isHighlight) where.isHighlight = true;

    const vehicles = await prisma.vehicle.findMany({
      where,
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(vehicles);
  } catch (error) {
    console.error("GET_VEHICLES_ERROR", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar veículos" },
      { status: 500 }
    );
  }
}

// POST /api/veiculos - Cria um novo veículo
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = vehicleSchema.parse(json);

    const { images, ...vehicleData } = body;

    const vehicle = await prisma.vehicle.create({
      data: {
        ...vehicleData,
        images: {
          create: images?.map((url) => ({ url })) || [],
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten().fieldErrors }, { status: 400 });
    }
    console.error("POST_VEHICLE_ERROR", error);
    return NextResponse.json(
      { error: "Erro interno ao criar veículo" },
      { status: 500 }
    );
  }
}
