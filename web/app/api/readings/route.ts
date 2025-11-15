import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 🔧 serializar BigInt
function serialize(obj: any) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

// =============================
// POST → usado pelo ESP32
// =============================
export async function POST(req: Request) {
  try {
    const { sensor_id, temperature, humidity } = await req.json();

    if (!sensor_id || temperature === undefined || humidity === undefined) {
      return NextResponse.json(
        { error: "Dados inválidos: informe sensor_id, temperature e humidity." },
        { status: 400 }
      );
    }

    const reading = await prisma.reading.create({
      data: {
        sensor_id,
        ts: new Date(),
        temperature,
        humidity,
      },
    });

    return NextResponse.json({
      message: "Leitura registrada ✅",
      reading: serialize(reading),
    });
  } catch (err) {
    console.error("❌ Erro no POST /api/readings:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// =============================
// GET → usado pelo Dashboard
// =============================
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const range = url.searchParams.get("range") || "24h";

    const now = new Date();
    const start = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // janela para considerar "online" (1 minuto)
    const ONLINE_WINDOW_MS = 60 * 1000;
    const onlineSince = new Date(now.getTime() - ONLINE_WINDOW_MS);

    // 1) Histórico (24h) → gráficos
    const readings = await prisma.reading.findMany({
      where: { ts: { gte: start, lte: now } },
      orderBy: { ts: "asc" },
      select: {
        id: true,
        sensor_id: true,
        ts: true,
        temperature: true,
        humidity: true,
      },
    });

    // 2) Dispositivos online = sensores que enviaram algo no último minuto
    const onlineDevices = await prisma.reading.groupBy({
      by: ["sensor_id"],
      where: { ts: { gte: onlineSince } },
    });
    const deviceCount = onlineDevices.length;

    // 3) Média atual = último valor de cada sensor online
    const latestMax = await prisma.reading.groupBy({
      by: ["sensor_id"],
      _max: { ts: true },
      where: { ts: { gte: onlineSince } },
    });

    let avgTemp: number | null = null;
    let avgHum: number | null = null;

    if (latestMax.length) {
      const latestRows = await prisma.reading.findMany({
        where: {
          OR: latestMax.map((x) => ({
            sensor_id: x.sensor_id,
            ts: x._max.ts!,
          })),
        },
        select: { sensor_id: true, temperature: true, humidity: true },
      });

      const temps = latestRows
        .map((r) => r.temperature)
        .filter((v): v is number => typeof v === "number");
      const hums = latestRows
        .map((r) => r.humidity)
        .filter((v): v is number => typeof v === "number");

      avgTemp = temps.length ? temps.reduce((a, b) => a + b, 0) / temps.length : null;
      avgHum = hums.length ? hums.reduce((a, b) => a + b, 0) / hums.length : null;
    }

    const series15m = readings.map((r) => ({
      time: r.ts.toISOString(),
      temperature: r.temperature,
      humidity: r.humidity,
    }));

    return NextResponse.json(
      serialize({
        deviceCount,
        latestAvg: { temperature: avgTemp, humidity: avgHum },
        series15m,
        readings,
      })
    );
  } catch (err) {
    console.error("❌ Erro no GET /api/readings:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
