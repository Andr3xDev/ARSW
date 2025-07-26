<div align="center">
    <h1 align="center">🎮 Isaac: Last Stand</h1>
    <p align="center">
    By Andres Chavarro
    </p>
</div>

<br>


> 📘 **Looking for detailed documentation?**  
> Visit the [Wiki](https://github.com/your-org/isaac-last-stand/wiki) for architecture diagrams, setup guides, quality criteria, and more.

<br>

**Isaac: Last Stand** is a real-time **battle royale browser game** where players compete to be the last one standing in an arena filled with action and chaos.

This repository contains the **frontend** of the game, built with **React** and **TypeScript**, designed to be fast, responsive, and interactive. The app communicates with the backend using **WebSockets** and **REST APIs**.

<br>

## 🧪 Tech Stack

- **React** – Component-based UI
- **TypeScript** – Type-safe code
- **WebSockets** – Real-time communication
- **Vite** – Fast dev environment and bundler
- **TailwindCSS** – Modern styling
- **AWS Cognito** – Authentication (via API)

<br>

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Yarn or npm
- Backend running locally or deployed

### Installation

- Clone the repo:

```sh
git clone https://github.com/Andr3xDev/isaac-last-stand.git
cd isaac-last-stand
```

- Install dependencies

```sh
npm install
```

- Run the app

```sh
npm run dev
```

The app should now be running at http://localhost:5173

### Connecting to the Backend

Make sure the backend is running on the correct ports (3000 for REST and 3001 for WebSockets).

You can configure API endpoints in a .env file:

```.env
VITE_COGNITO_USER_POOL_ID="us-east-1_xxxxxxxxx"
VITE_COGNITO_USER_POOL_CLIENT_ID="xxxxxxxxxxxxxxxxxxxxxx"
VITE_COGNITO_IDENTITY_POOL_ID="us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
VITE_AWS_REGION="us-east-1"
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3001
```
