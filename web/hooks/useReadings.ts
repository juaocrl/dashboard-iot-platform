"use client";

import { useEffect, useState } from "react";

export type ReadingRow = {
  id: string | number;
  sensor_id: string;
  ts: string; // ISO
  temperature: number | null;
  humidity: number | null;
};

export type SeriesPoint = {
  time: string; // ISO
  temperature: number | null;
  humidity: number | null;
};

type ApiPayload = {
  deviceCount: number;
  latestAvg: { temperature: number; humidity: number };
  series15m: SeriesPoint[];
  readings: ReadingRow[];
};

export function useReadings(range: string = "24h") {
  const [data, setData] = useState<ApiPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const r = await fetch(`/api/readings?range=${encodeURIComponent(range)}`);
        if (!r.ok) throw new Error(`Erro HTTP ${r.status}`);
        const json = (await r.json()) as ApiPayload;
        if (!mounted) return;
        setData(json);
        setError(null);
      } catch (e) {
        if (!mounted) return;
        console.error("API /api/readings ->", e);
        setError("Falha ao buscar dados");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    // primeira chamada
    fetchData();

    // atualiza a cada 15s
    const interval = setInterval(fetchData, 15000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [range]);

  return { data, loading, error };
}
