import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlayerList from "../components/PlayerList";
import { useSocket } from "../context/WebSocketContext";

const LobbyPage: React.FC = () => {
    const navigate = useNavigate();
    const { roomCode } = useParams<{ roomCode?: string }>();
    const { socket, lobbyState } = useSocket();

    useEffect(() => {
        if (!socket || !roomCode) return;

        if (lobbyState?.id === roomCode) {
            return;
        }

        const playerName = sessionStorage.getItem("playerName") || "Invitado";
        socket.emit("joinLobby", { lobbyId: roomCode, name: playerName });
    }, [roomCode, socket, lobbyState?.id]);

    useEffect(() => {
        if (!socket) return;

        const onGameStarting = (startedLobby: { id: string }) => {
            console.log(
                `[LobbyPage] Evento 'gameStarting' recibido. Navegando a /game/${startedLobby.id}`
            );
            navigate(`/game/${startedLobby.id}`);
        };

        socket.on("gameStarting", onGameStarting);

        return () => {
            socket.off("gameStarting", onGameStarting);
        };
    }, [socket, navigate]);

    const handlePlayerReadyToggle = () => {
        if (socket && lobbyState && socket.id) {
            const self = lobbyState.players[socket.id];
            if (self) {
                socket.emit("setReady", {
                    lobbyId: lobbyState.id,
                    isReady: !self.isReady,
                });
            }
        }
    };

    const handleStartGame = () => {
        if (socket && lobbyState && lobbyState.hostId === socket.id) {
            socket.emit("startGame", { lobbyId: lobbyState.id });
        }
    };

    const handleLeaveLobby = () => {
        if (socket && lobbyState) {
            socket.emit("leaveLobby", { lobbyId: lobbyState.id });
            navigate("/");
        }
    };

    if (!lobbyState || lobbyState.id !== roomCode) {
        return <div className="text-white text-2xl">Joining lobby...</div>;
    }

    const players = Object.values(lobbyState.players);
    const isHost = lobbyState.hostId === socket?.id;
    const selfPlayer = lobbyState.players[socket?.id ?? ""];

    return (
        <div className="text-white min-h-screen flex items-center justify-center font-sans">
            <div className="container-menu w-1/2 h-auto p-8">
                <div className="text-center mb-8 border-b border-gray-800 pb-6">
                    <h2 className="text-3xl font-bold tracking-wider">
                        LOBBY CODE
                    </h2>
                    <div className="mt-4 bg-[#090909] border border-[#402120] rounded-lg p-3 inline-block">
                        <span className="text-2xl font-mono font-bold text-emerald-400 tracking-widest">
                            {lobbyState.id}
                        </span>
                    </div>
                </div>

                <PlayerList
                    players={players}
                    onPlayerReadyToggle={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                />

                <div className="mt-8 flex justify-center items-center gap-4">
                    <button
                        onClick={handlePlayerReadyToggle}
                        className={`text-2xl cursor-pointer text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 ${
                            selfPlayer?.isReady
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-red-800 hover:bg-red-700"
                        }`}
                    >
                        {selfPlayer?.isReady ? "Ready ✅" : "Not Ready ❌"}
                    </button>

                    {isHost && (
                        <button
                            onClick={handleStartGame}
                            className="text-2xl cursor-pointer bg-[#C15328] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#B1362E] transition-all duration-200"
                        >
                            Start Game
                        </button>
                    )}

                    <button
                        onClick={handleLeaveLobby}
                        className="text-xl cursor-pointer bg-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-200"
                    >
                        Leave
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LobbyPage;
