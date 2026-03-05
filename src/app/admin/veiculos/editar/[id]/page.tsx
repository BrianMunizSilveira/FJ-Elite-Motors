import VehicleForm from "@/components/VehicleForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditVehiclePage({ params }: { params: { id: string } }) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: params.id },
    include: {
      images: true,
    },
  });

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="bg-black min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <VehicleForm initialData={vehicle} isEditing={true} />
      </div>
    </div>
  );
}
