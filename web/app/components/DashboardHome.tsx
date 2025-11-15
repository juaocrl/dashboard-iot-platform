"use client";

import { useReadings } from "@/hooks/useReadings";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";

function formatTimeLabel(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export default function DashboardHome() {
  const { data, loading, error } = useReadings("24h");

  const tempSeries = useMemo(
    () =>
      (data?.series15m || []).map((p) => ({
        time: formatTimeLabel(p.time),
        value: p.temperature,
      })),
    [data]
  );

  const humSeries = useMemo(
    () =>
      (data?.series15m || []).map((p) => ({
        time: formatTimeLabel(p.time),
        value: p.humidity,
      })),
    [data]
  );

  if (loading) return <p className="p-6">Carregando dados…</p>;
  if (error) return <p className="p-6 text-red-400">Erro: {error}</p>;
  if (!data) return <p className="p-6">Sem dados.</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">Visão geral</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-2xl shadow bg-gray-900 text-white">
          <p>🌡️ Temperatura Média Atual</p>
          <h3 className="text-3xl font-bold">
            {Number.isFinite(data.latestAvg.temperature)
              ? data.latestAvg.temperature.toFixed(2)
              : "--"}
            °C
          </h3>
        </div>

        <div className="p-4 rounded-2xl shadow bg-gray-900 text-white">
          <p>💧 Umidade Média Atual</p>
          <h3 className="text-3xl font-bold">
            {Number.isFinite(data.latestAvg.humidity)
              ? data.latestAvg.humidity.toFixed(2)
              : "--"}
            %
          </h3>
        </div>

        <div className="p-4 rounded-2xl shadow bg-gray-900 text-white">
          <p>📡 Dispositivos Online</p>
          <h3 className="text-3xl font-bold">{data.deviceCount}</h3>
        </div>
      </div>

      {/* Gráficos (últimas 24h agregadas a cada 15min) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temperatura */}
        <div className="p-4 rounded-2xl shadow bg-gray-900">
          <p className="text-white mb-2">Temperatura (últimas 24h)</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={tempSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2b2f3a" />
              <XAxis dataKey="time" stroke="#aaa" />
              {/* limite 0–40 °C */}
              <YAxis stroke="#aaa" domain={[0, 40]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ff6b6b"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Umidade */}
        <div className="p-4 rounded-2xl shadow bg-gray-900">
          <p className="text-white mb-2">Umidade (últimas 24h)</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={humSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2b2f3a" />
              <XAxis dataKey="time" stroke="#aaa" />
              {/* limite 0–100 % */}
              <YAxis stroke="#aaa" domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4dabf7"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
