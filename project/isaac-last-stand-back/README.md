<div align="center">
    <h1 align="center">🧠 Isaac: Last Stand – Backend</h1>
    <p align="center">
    By Andres Chavarro
    </p>
</div>

> 📘 **Looking for detailed documentation?**  
> Visit the [Wiki](https://github.com/your-org/isaac-last-stand/wiki) for architecture diagrams, setup guides, quality criteria, and more.

<br>

This is the **backend service** for *Isaac: Last Stand*, a real-time multiplayer **battle royale** game built for the browser.

The backend is built with **NestJS**, leverages **WebSockets** for real-time gameplay, and integrates with **AWS** for authentication, database, and cloud infrastructure.

<br>

## 🔧 Tech Stack

- 🚀 **Node.js + NestJS** – Modular backend framework
- 📡 **WebSockets (Gateway)** – Real-time multiplayer sync
- 🧠 **TypeScript** – Static typing
- ☁️ **AWS** – Lambda, DynamoDB, ElastiCache
- 🧪 **SonarQube** – Static code analysis
- 🧾 **Jest** – Unit testing

<br>

## 📦 Prerequisites

- Node.js (v18+)
- Redis
- DynamoDB

---

## 🚀 Getting Started

### 1. Clone & install

- Clone the repo:

```sh
git clone https://github.com/Andr3xDev/isaac-last-stand-back.git
cd isaac-last-stand-back
```

- Install dependencies

```sh
npm install
```

- Run the app

```sh
npm run dev
```

### Connecting env file

You can configure API endpoints in a .env file:

```.env
REDIS_HOST=xxxxxxxxxxxxxxxxxx
REDIS_PASSWORD=x
```
