import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const tables = await prisma.$queryRawUnsafe<any[]>(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
  );
  console.log("📋 Tabelas no banco:", tables);

  const columns = await prisma.$queryRawUnsafe<any[]>(
    `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'readings';`
  );
  console.log("📋 Colunas da tabela readings:", columns);

  await prisma.$disconnect();
}

main();
