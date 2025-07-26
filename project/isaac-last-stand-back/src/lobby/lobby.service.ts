import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { Lobby, Player } from './lobby.interfaces';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class LobbyService {
    constructor(private readonly redisService: RedisService) {}

    private getKey(lobbyId: string): string {
        return `lobby:${lobbyId}`;
    }

    async getLobby(lobbyId: string): Promise<Lobby | null> {
        const lobbyData = await this.redisService.get(this.getKey(lobbyId));
        return lobbyData ? (JSON.parse(lobbyData) as Lobby) : null;
    }

    async createLobby(host: Player): Promise<Lobby> {
        let lobbyId: string;
        let lobbyExists = true;

        do {
            lobbyId = nanoid(5).toUpperCase();
            const existingLobby = await this.redisService.exists(
                this.getKey(lobbyId),
            );
            if (!existingLobby) {
                lobbyExists = false;
            }
        } while (lobbyExists);

        const newLobby: Lobby = {
            id: lobbyId,
            hostId: host.id,
            players: { [host.id]: host },
            status: 'waiting',
        };

        await this.redisService.set(
            this.getKey(lobbyId),
            JSON.stringify(newLobby),
        );
        console.log(`[LobbyService] Lobby CREADO con código corto: ${lobbyId}`);
        return newLobby;
    }

    async joinLobby(lobbyId: string, player: Player): Promise<Lobby | null> {
        const lobby = await this.getLobby(lobbyId);

        if (!lobby) return null;
        if (lobby.players[player.id]) return lobby;
        if (Object.keys(lobby.players).length >= 10) return null;

        lobby.players[player.id] = player;
        await this.redisService.set(
            this.getKey(lobbyId),
            JSON.stringify(lobby),
        );
        console.log(
            `[LobbyService] Jugador ${player.id} se unió al lobby ${lobbyId}`,
        );
        return lobby;
    }

    async removePlayer(
        lobbyId: string,
        playerId: string,
    ): Promise<Lobby | null> {
        const lobby = await this.getLobby(lobbyId);
        if (!lobby || !lobby.players[playerId]) return lobby;

        delete lobby.players[playerId];

        if (Object.keys(lobby.players).length === 0) {
            await this.redisService.del(this.getKey(lobbyId));
            return null;
        }

        if (lobby.hostId === playerId) {
            lobby.hostId = Object.keys(lobby.players)[0];
        }

        await this.redisService.set(
            this.getKey(lobbyId),
            JSON.stringify(lobby),
        );
        return lobby;
    }

    async setPlayerReady(
        lobbyId: string,
        playerId: string,
        isReady: boolean,
    ): Promise<Lobby | null> {
        const lobby = await this.getLobby(lobbyId);
        if (lobby?.players[playerId]) {
            lobby.players[playerId].isReady = isReady;
            await this.redisService.set(
                this.getKey(lobbyId),
                JSON.stringify(lobby),
            );
            return lobby;
        }
        return null;
    }

    async startGame(lobbyId: string): Promise<Lobby | null> {
        const lobby = await this.getLobby(lobbyId);
        if (lobby) {
            lobby.status = 'in-game';
            await this.redisService.set(
                this.getKey(lobbyId),
                JSON.stringify(lobby),
            );
            return lobby;
        }
        return null;
    }

    async getLobbies(): Promise<Lobby[]> {
        const client = this.redisService.getClient();
        const lobbyKeys = await client.keys('lobby:*');

        if (!lobbyKeys || lobbyKeys.length === 0) {
            return [];
        }

        const lobbyDataStrings = await client.mget(lobbyKeys);

        return lobbyDataStrings
            .filter((str): str is string => str !== null)
            .map((str) => JSON.parse(str) as Lobby);
    }
}
