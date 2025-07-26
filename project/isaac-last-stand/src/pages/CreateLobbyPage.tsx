import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/WebSocketContext";

const CreateLobbyPage: React.FC = () => {
    const navigate = useNavigate();
    const { socket, lobbyState, clearLobbyState } = useSocket();
    const [isCreatingNew, setIsCreatingNew] = useState(false);

    useEffect(() => {
        if (socket) {
            if (lobbyState && lobbyState.id) {
                console.log(
                    `[CreateLobby] Saliendo del lobby anterior: ${lobbyState.id}`
                );
                socket.emit("leaveLobby", { lobbyId: lobbyState.id });
            }

            clearLobbyState();

            const timer = setTimeout(() => {
                const playerName =
                    sessionStorage.getItem("playerName") || "Guest";
                console.log(
                    `[CreateLobby] Creando nuevo lobby para: ${playerName}`
                );
                socket.emit("createLobby", { name: playerName });
                setIsCreatingNew(true);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [socket]);

    useEffect(() => {
        if (lobbyState && lobbyState.id && isCreatingNew) {
            console.log(
                `[CreateLobby] Nuevo lobby creado. Navegando a /lobby/${lobbyState.id}`
            );
            navigate(`/lobby/${lobbyState.id}`);
        }
    }, [lobbyState, navigate, isCreatingNew]);

    return (
        <div className="text-white min-h-screen flex items-center justify-center font-sans">
            <div className="text-2xl">Creating lobby...</div>
        </div>
    );
};

export default CreateLobbyPage;
