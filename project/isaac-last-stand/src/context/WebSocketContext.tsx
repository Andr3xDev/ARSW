import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect,
} from "react";
import { Socket } from "socket.io-client";
import { useWebSocket } from "../hooks/useWebsocket";
import type { Lobby } from "../services/lobbbySocket";

interface WebSocketContextType {
    socket: Socket | null;
    lobbyState: Lobby | null;
    clearLobbyState: () => void;
    playerName: string;
    setPlayerName: (name: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
    undefined
);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { socket, lobbyState, clearLobbyState } = useWebSocket(
        "http://localhost:3000"
    );

    const [playerName, setPlayerName] = useState<string>(
        () => localStorage.getItem("playerName") || ""
    );

    // 3. Usamos un efecto para guardar el nombre en localStorage cada vez que cambie
    useEffect(() => {
        if (playerName) {
            localStorage.setItem("playerName", playerName);
        } else {
            // Opcional: si el nombre se borra, también lo borramos de localStorage
            localStorage.removeItem("playerName");
        }
    }, [playerName]);

    // 4. Añadimos el nombre y su "setter" al valor del contexto
    const value = useMemo(
        () => ({
            socket,
            lobbyState,
            clearLobbyState,
            playerName,
            setPlayerName,
        }),
        [socket, lobbyState, clearLobbyState, playerName]
    );

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error(
            "useSocket debe ser usado dentro de un WebSocketProvider"
        );
    }
    return context;
};
