"use client";

import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <main className="min-h-dvh grid place-items-center bg-background text-foreground relative">
      {/* Botão fixo no canto inferior esquerdo */}
      <div className="fixed bottom-4 left-4">
        <ThemeToggle />
      </div>

      <div className="
        w-full max-w-sm rounded-xl border
        bg-white/95 text-gray-900
        shadow-lg shadow-black/5
        backdrop-blur-sm
        dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-800
        p-6
      ">
        <h1 className="text-2xl font-extrabold text-center mb-6">
          IoT Platform Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full px-3 py-2 rounded-md
              border border-gray-300 bg-gray-50
              placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              dark:bg-neutral-800 dark:border-neutral-700 dark:placeholder:text-neutral-400
            "
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-3 py-2 rounded-md
              border border-gray-300 bg-gray-50
              placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              dark:bg-neutral-800 dark:border-neutral-700 dark:placeholder:text-neutral-400
            "
          />

          <button
            type="submit"
            className="
              w-full py-2 rounded-md font-medium
              bg-blue-600 hover:bg-blue-700 text-white
              transition
              dark:bg-neutral-700 dark:hover:bg-neutral-600
            "
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
