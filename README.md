# 📘 **IoT Platform — Backend, Banco de Dados e Arquitetura Principal**

Plataforma IoT modular para **coleta, armazenamento e visualização de dados** enviados por dispositivos ESP32 (ou simulados).

Este diretório contém toda a **camada backend** da plataforma:

- 🗄️ Banco de dados (PostgreSQL + Prisma ORM)  
- 🔌 Estrutura de devices, sensores e leituras  
- 🔐 Auditoria e API Keys  
- 🧩 Scripts utilitários  
- 🔗 API interna consumida pelo dashboard  

O Dashboard Web (frontend) está em:

👉 **`/web`** *(possui README próprio)*

---

# 📑 **Índice**

- Instalação do Banco de Dados
- Arquivo .env
- Configuração da Aplicação
- Modelo de Dados
- Cadastro de Dispositivos e Sensores
- Simulador PowerShell
- Estrutura do Projeto
- Roadmap
- Autor

---

# 🗄️ **Instalação do Banco de Dados (PostgreSQL + Prisma)**

A plataforma utiliza **PostgreSQL** como banco principal.

## 1️⃣ Instalar o PostgreSQL

Download:

👉 https://www.postgresql.org/download/

Padrões:

- Usuário: **postgres**
- Porta: **5432**
- Configure uma **senha forte**

## 2️⃣ Criar o Banco de Dados

```powershell
psql -U postgres -c "CREATE DATABASE iot_platform;"
```

## 3️⃣ Criar um usuário dedicado

```sql
CREATE USER iot_user WITH PASSWORD 'sua_senha_forte';
GRANT ALL PRIVILEGES ON DATABASE iot_platform TO iot_user;
```

---

# 🔐 **Arquivo .env — Configurações Sensíveis do Projeto**

Local:

```
dashboard-iot-platform/.env
```

Exemplo:

```env
DATABASE_URL="postgresql://postgres:SENHA_DO_POSTGRES@localhost:5432/iot_platform?schema=public"
JWT_SECRET="sua_chave_forte"
JWT_EXPIRES_IN="7d"
COOKIE_NAME="session"
COOKIE_SECURE="false"
```

---

# ⚙️ **Configuração da Aplicação**

```bash
cd web
npm install
npm run dev
```

Acesse:

👉 http://localhost:3000

---

# 🗄️ **Resumo do Modelo de Dados**

### 🟦 device
- id (UUID)
- device_uid
- name
- location
- status
- last_seen

### 🟩 sensor
- id
- device_id
- type
- unit

### 🟧 reading
- id
- sensor_id
- ts
- temperature
- humidity

---

# 🔌 **Como adicionar novos dispositivos**

1. Abra:

```bash
npx prisma studio
```

2. Crie um **device**  
3. Crie um **sensor** vinculado ao device  

Payload aceito:

```json
{
  "device_uid": "esp32_sala",
  "temperature": 25.7,
  "humidity": 60.2
}
```

---

# 🧪 **Simulador PowerShell (Repositório Separado)**

👉 https://github.com/juaocrl/esp32-simulator

---

# 🧱 **Estrutura do Diretório**

```
dashboard-iot-platform/
 ├── prisma/
 ├── web/
 ├── check-prisma.ts
 ├── package.json
 └── README.md
```

---

# 🧭 **Roadmap**

- WebSockets  
- API Keys  
- Auditoria  
- Múltiplos sensores  
- Alertas  
- Controle remoto via relé  
- Exportação CSV/Excel  

---

# 👨‍💻 **Autor**

**João Victor Moura**  
Engenharia da Computação • IoT • Automação • Redes • Backend
