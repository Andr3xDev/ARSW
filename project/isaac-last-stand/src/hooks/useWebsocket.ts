import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import type { Lobby } from "../services/lobbbySocket";

export const useWebSocket = (serverUrl: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [lobbyState, setLobbyState] = useState<Lobby | null>(null);

    const clearLobbyState = useCallback(() => {
        setLobbyState(null);
    }, []);

    useEffect(() => {
        const newSocket = io(serverUrl, {
            transports: ["websocket"],
        });

        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log(
                "🔌 Connecting to server with WebSockets. ID:",
                newSocket.id
            );
        });

        newSocket.on("lobbyState", (data: Lobby) => {
            console.log("✅ Lobby status recived:", data);
            setLobbyState(data);
        });

        newSocket.on("error", (error) => {
            console.error("❌ Server error:", error);
        });

        newSocket.on("disconnect", () => {
            console.log("🔌 Disconnected from WebSockets server");
            setLobbyState(null);
        });

        return () => {
            console.log("Cleannig and disconnecting socket.");
            newSocket.disconnect();
        };
    }, [serverUrl]);

    return { socket, lobbyState, clearLobbyState };
};
