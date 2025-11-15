import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criar um device inicial
  const device = await prisma.device.create({
    data: {
      device_uid: "dev-001",
      name: "Dispositivo de Teste",
      location: "Lab 01",
    },
  });

  // Criar um sensor para esse device
  const sensor = await prisma.sensor.create({
    data: {
      device_id: device.id,
      type: "temp",
      unit: "°C",
    },
  });

  console.log("✅ Device e sensor criados:", device, sensor);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
