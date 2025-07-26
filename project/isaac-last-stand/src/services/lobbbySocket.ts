import { io, Socket } from "socket.io-client";

export interface Player {
    id: string;
    name: string;
    isReady: boolean;
}

export interface Lobby {
    id: string;
    hostId: string;
    players: Record<string, Player>;
    status: "waiting" | "countdown" | "in-game";
}

export class SocketService {
    private readonly socket: Socket;
    public lobbyState: Lobby | null = null;

    constructor() {
        this.socket = io("http://localhost:3000");
        this.listenToEvents();
    }

    private listenToEvents(): void {
        this.socket.on("lobbyState", (data: Lobby) => {
            console.log("Lobby state updated:", data);
            this.lobbyState = data;
            this.onStateUpdate(this.lobbyState);
        });

        this.socket.on("error", (error: { message: string }) => {
            console.error("Server error:", error.message);
            alert(`Error: ${error.message}`);
        });
    }

    public onStateUpdate(lobby: Lobby | null): void {
        if (lobby) {
            console.log("Lobby state has been updated:", lobby);
        }
    }

    public createLobby(name: string): void {
        this.socket.emit("createLobby", { name });
    }

    public joinLobby(lobbyId: string, name: string): void {
        this.socket.emit("joinLobby", { lobbyId, name });
    }

    public setReady(lobbyId: string, isReady: boolean): void {
        this.socket.emit("setReady", { lobbyId, isReady });
    }
}
