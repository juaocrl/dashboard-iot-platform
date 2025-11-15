# 📘 IoT Platform — Dashboard Web (Next.js + Tailwind + Shadcn)

Interface web moderna, rápida e responsiva para monitoramento IoT, exibindo dados enviados pelos dispositivos ESP32 (ou simulador), com cálculo automático de temperatura média, gerenciamento de dispositivos, usuários e configurações.

Este diretório contém todo o frontend da plataforma.

## 📑 Índice
- Visão Geral
- Tecnologias Utilizadas
- Visão Geral da PlatformPage
- Arquitetura da Aplicação
- Navegação Interna
- Atualização Automática de Dados
- Cálculo Automático da Média Entre Dispositivos
- Componentes
- Sistema de UI
- Tela de Login
- Estrutura Geral de Arquivos
- Como Rodar
- Roadmap

---

## 🔍 Visão Geral

O dashboard permite:

- Visualizar temperatura e umidade enviadas pelos sensores  
- Calcular automaticamente média global dos dispositivos online  
- Ver quantidade de sensores ativos  
- Exibir gráficos das últimas 24h  
- Gerenciar dispositivos  
- Gerenciar usuários  
- Acessar configurações  
- Controlar Light/Dark Mode  

Tudo integrado ao backend via API `/api/readings`.

---

## 🧭 PlatformPage — Estrutura Principal da Interface

A PlatformPage é o “shell” central da aplicação após o login.  
Ela contém:

- a Sidebar (menu lateral)
- a área dinâmica com as seções
- o layout principal do dashboard

<p align="center">
  <img src="./public/readme/platformpage.png" width="850">
</p>

Essa página controla a navegação e renderização interna de:

- Dashboard  
- Devices  
- Users  
- Settings  
- Alarms  

Sem recarregar a página (SPA dentro do App Router).

---

## ⚙️ Tecnologias Utilizadas

### Frontend
- Next.js 14+ (App Router)
- React 18
- TypeScript
- TailwindCSS
- Shadcn/UI
- Radix UI
- Class Variance Authority (CVA)

### Backend consumido pelo dashboard
- API `/api/readings`
- Prisma ORM
- PostgreSQL

### UI/UX
- Dark Mode automático
- Componentes reutilizáveis
- Polling inteligente
- Layout responsivo

---

## 🧩 Arquitetura da Aplicação

```
Platform Shell (PlatformPage)
 ├── Sidebar
 └── Conteúdo Dinâmico
       ├── DashboardHome
       ├── DeviceManager
       ├── UserManager
       ├── SettingsPanel
       └── AlarmManager
```

A navegação é controlada por um estado interno (`activeSection`) em `page.tsx`.

---

## 🧭 Navegação Interna

Controlada pelo arquivo:

```
web/app/platformpage/page.tsx
```

Via React State:

```tsx
const [activeSection, setActiveSection] = useState('dashboard')
```

Renderização dinâmica:

```tsx
switch(activeSection) {
  case 'dashboard': return <DashboardHome />
  case 'devices':   return <DeviceManager />
  case 'users':     return <UserManager />
  case 'settings':  return <SettingsPanel />
}
```

👉 Nenhum reload de página.  
👉 SPA completa dentro do App Router.

---

## 🔁 Atualização Automática de Dados

O arquivo:

```
web/hooks/useReadings.ts
```

faz polling para:

```
GET /api/readings
```

Retorno inclui:

- temperatura média  
- umidade média  
- dispositivos online  
- séries históricas  

Hook pausa automaticamente ao sair da aba Dashboard.

---

## 🔢 Cálculo Automático da Média Entre Dispositivos

A rota `/api/readings`:

1. Identifica sensores online (última leitura ≤ 1 minuto)
2. Obtém a última leitura de cada sensor online
3. Calcula:
   - média de temperatura
   - média de umidade
4. Conta quantos sensores estão ativos

Exemplo:

| Sensor | Temp |
|--------|------|
| Sala   | 25.0 |
| Rack   | 28.5 |
| Quarto | 23.3 |

```
média = (25.0 + 28.5 + 23.3) / 3
```

Se o Rack parar:

```
média = (25.0 + 23.3) / 2
```

✔ Automático  
✔ Sem ajustes no frontend  

---

## 🧱 Componentes

### `DashboardHome.tsx`
- média global  
- umidade  
- dispositivos online  
- gráfico  

### `Sidebar.tsx`
Menu lateral.

### `DeviceManager.tsx`
Gerenciamento de dispositivos.

### `UserManager.tsx`
Gerenciamento de usuários.

### `SettingsPanel.tsx`
Configurações gerais.

### `AlarmManager.tsx`
Futuro sistema de alarmes.

### `ThemeToggle.tsx`
Botão de tema.

---

## 🎨 Sistema de UI

Arquivo central:

```
web/app/components/ui/button.tsx
```

Utiliza:

- Radix Slot  
- TailwindCSS  
- Class Variance Authority  

Exemplo:

```tsx
variant: {
  default: "bg-primary text-primary-foreground",
  ghost:   "hover:bg-accent"
}
```

---

## 🔐 Tela de Login

Local:

```
web/app/login/page.tsx
```

<p align="center">
  <img src="./public/readme/login.png" width="400">
</p>

---

## 📂 Estrutura Geral de Arquivos

```
web/
 ├── app/
 │    ├── api/readings/route.ts
 │    ├── components/
 │    ├── login/
 │    ├── platformpage/
 │    ├── globals.css
 │    ├── layout.tsx
 │    └── providers.tsx
 │
 ├── components/ui/button.tsx
 ├── hooks/useReadings.ts
 ├── lib/prisma.ts
 ├── public/readme/
 │       ├── platformpage.png
 │       ├── dashboard.png
 │       ├── login.png
 │       └── ...
 ├── package.json
 ├── next.config.ts
 └── tsconfig.json
```

---

## ▶️ Como Rodar

```bash
cd web
npm install
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

## 🛣 Roadmap

- WebSockets  
- Dashboard por dispositivo  
- CRUD completo de devices  
- CRUD de usuários  
- Alertas configuráveis  
- 2FA / MFA  
- Exportação CSV/PDF  
- App mobile  
