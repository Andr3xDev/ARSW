import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PublicRoomItem, { type Room } from "../components/PublicRoomItem";
import { useSocket } from "../context/WebSocketContext";

// Define la estructura del lobby que llega del backend
interface BackendLobby {
    id: string;
    players: Record<string, { name: string }>;
    status: string;
}

const LobbyHub: React.FC = () => {
    const navigate = useNavigate();
    const { socket, lobbyState } = useSocket();
    const [roomCode, setRoomCode] = useState("");
    const [rooms, setRooms] = useState<Room[]>([]);

    const handleJoinWithCode = () => {
        if (!roomCode.trim()) {
            alert("El código del lobby no puede estar vacío.");
            return;
        }
        if (socket) {
            socket.emit("joinLobby", { lobbyId: roomCode.toUpperCase() });
        }
    };

    const handleJoinRoom = (lobbyId: string) => {
        if (socket) {
            socket.emit("joinLobby", { lobbyId });
        }
    };

    const handleGoHome = () => {
        navigate("/");
    };

    const handleRefreshLobbies = () => {
        if (socket) {
            socket.emit("getLobbies");
        }
    };

    useEffect(() => {
        if (socket) {
            socket.emit("getLobbies");

            const handleLobbiesList = (backendLobbies: BackendLobby[]) => {
                const formattedRooms: Room[] = backendLobbies
                    // Filtra lobbies que ya están en juego
                    .filter((lobby) => lobby.status === "waiting")
                    .map((lobby) => {
                        const host = Object.values(lobby.players)[0];
                        return {
                            id: lobby.id,
                            name: `Lobby de ${host?.name || "Anfitrión"}`,
                            players: Object.keys(lobby.players).length,
                        };
                    });
                setRooms(formattedRooms);
            };

            socket.on("lobbiesList", handleLobbiesList);

            return () => {
                socket.off("lobbiesList", handleLobbiesList);
            };
        }
    }, [socket]);

    useEffect(() => {
        if (lobbyState && lobbyState.id) {
            navigate(`/lobby/${lobbyState.id}`);
        }
    }, [lobbyState, navigate]);

    useEffect(() => {
        if (socket) {
            const handleError = (error: { message: string }) => {
                console.error("Error recibido del servidor:", error.message);
                alert(`Error: ${error.message}`);
            };

            socket.on("error", handleError);

            return () => {
                socket.off("error", handleError);
            };
        }
    }, [socket]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 text-white">
            <div className="container-menu w-1/2 space-y-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Lobby Hub</h1>
                </div>

                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        placeholder="LOBBY CODE"
                        className="flex-grow bg-[#090909] border border-[#402120] rounded-lg p-3 text-center font-mono tracking-widest text-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                    />
                    <button
                        onClick={handleJoinWithCode}
                        className="bg-red-700 font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                    >
                        JOIN
                    </button>
                </div>

                <div className="flex items-center text-gray-400">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="px-4">O</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">
                            Available Lobbies
                        </h2>
                        <button
                            onClick={handleRefreshLobbies}
                            className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors shadow-lg"
                        >
                            🔄 Refresh
                        </button>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                        {rooms.length > 0 ? (
                            rooms.map((room) => (
                                <PublicRoomItem
                                    key={room.id}
                                    room={room}
                                    onJoin={() => handleJoinRoom(room.id)}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-400">
                                No lobbies available.
                            </p>
                        )}
                    </div>
                </div>

                <div className="items-center justify-center flex">
                    <button
                        onClick={handleGoHome}
                        className="w-1/2 bg-[#C15328] text-2xl text-gray-300 font-semibold py-3 rounded-lg hover:bg-[#B1361E] transition-colors"
                    >
                        Back To Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LobbyHub;
