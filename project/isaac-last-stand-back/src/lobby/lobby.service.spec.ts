import { Test, TestingModule } from '@nestjs/testing';
import { LobbyService } from './lobby.service';
import { RedisService } from '../redis/redis.service';
import { Player, Lobby } from './lobby.interfaces';
import { nanoid } from 'nanoid';

// Mock de la librería nanoid para tener IDs predecibles en los tests
jest.mock('nanoid');
const mockedNanoid = nanoid as jest.Mock;

// Tipado para el mock de RedisService
type MockRedisService = {
    [key in keyof RedisService]: jest.Mock;
};

describe('LobbyService', () => {
    let service: LobbyService;
    let redisService: MockRedisService;

    // Datos de prueba
    const hostPlayer: Player = {
        id: 'host-1',
        name: 'Host Player',
        isReady: false,
    };
    const guestPlayer: Player = {
        id: 'guest-2',
        name: 'Guest Player',
        isReady: false,
    };

    beforeEach(async () => {
        // Crear una implementación mock para cada método de RedisService
        const mockRedisService: MockRedisService = {
            get: jest.fn(),
            set: jest.fn(),
            exists: jest.fn(),
            del: jest.fn(),
            getClient: jest.fn().mockReturnValue({
                // Mock del cliente y sus métodos
                keys: jest.fn(),
                mget: jest.fn(),
            }),
            setSocketId: jest.fn(),
            getLobbyIdBySocketId: jest.fn(),
            delSocketId: jest.fn(),
            onModuleDestroy: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LobbyService,
                {
                    provide: RedisService,
                    useValue: mockRedisService,
                },
            ],
        }).compile();

        service = module.get<LobbyService>(LobbyService);
        redisService = module.get(RedisService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    // ... dentro del describe('LobbyService', () => { ... })

    describe('createLobby', () => {
        it('should create a new lobby successfully', async () => {
            const lobbyId = 'ABCDE';
            mockedNanoid.mockReturnValue(lobbyId); // Controlamos el ID generado
            redisService.exists.mockResolvedValue(0); // Simulamos que el lobby no existe

            const newLobby = await service.createLobby(hostPlayer);

            expect(newLobby.id).toBe(lobbyId);
            expect(newLobby.hostId).toBe(hostPlayer.id);
            expect(newLobby.players[hostPlayer.id]).toEqual(hostPlayer);

            // Verificamos que se llamó a Redis para guardar el lobby
            expect(redisService.set).toHaveBeenCalledWith(
                `lobby:${lobbyId}`,
                JSON.stringify(newLobby),
            );
        });

        it('should handle ID collision and retry', async () => {
            const firstId = 'COLLIDE';
            const secondId = 'UNIQUE';
            mockedNanoid
                .mockReturnValueOnce(firstId) // Primera llamada genera colisión
                .mockReturnValueOnce(secondId); // Segunda llamada genera ID único

            redisService.exists
                .mockResolvedValueOnce(1) // El primer ID existe
                .mockResolvedValueOnce(0); // El segundo no

            const newLobby = await service.createLobby(hostPlayer);

            expect(redisService.exists).toHaveBeenCalledTimes(2);
            expect(newLobby.id).toBe(secondId);
            expect(redisService.set).toHaveBeenCalledWith(
                `lobby:${secondId}`,
                expect.any(String),
            );
        });
    });
    // ... dentro del describe('LobbyService', () => { ... })

    describe('joinLobby', () => {
        const lobbyId = 'TESTLOBBY';
        let existingLobby: Lobby;

        beforeEach(() => {
            existingLobby = {
                id: lobbyId,
                hostId: hostPlayer.id,
                players: { [hostPlayer.id]: hostPlayer },
                status: 'waiting',
            };
        });

        it('should allow a player to join an existing lobby', async () => {
            redisService.get.mockResolvedValue(JSON.stringify(existingLobby));

            const updatedLobby = await service.joinLobby(lobbyId, guestPlayer);

            expect(updatedLobby?.players[guestPlayer.id]).toEqual(guestPlayer);
            expect(Object.keys(updatedLobby?.players || {}).length).toBe(2);
            expect(redisService.set).toHaveBeenCalledWith(
                `lobby:${lobbyId}`,
                JSON.stringify(updatedLobby),
            );
        });

        it('should return null if the lobby does not exist', async () => {
            redisService.get.mockResolvedValue(null);

            const result = await service.joinLobby('NONEXISTENT', guestPlayer);

            expect(result).toBeNull();
            expect(redisService.set).not.toHaveBeenCalled();
        });
    });
    // ... dentro del describe('LobbyService', () => { ... })

    describe('removePlayer', () => {
        const lobbyId = 'TESTLOBBY';
        let lobbyWithTwoPlayers: Lobby;

        beforeEach(() => {
            lobbyWithTwoPlayers = {
                id: lobbyId,
                hostId: hostPlayer.id,
                players: {
                    [hostPlayer.id]: hostPlayer,
                    [guestPlayer.id]: guestPlayer,
                },
                status: 'waiting',
            };
        });

        it('should remove a player and reassign host if necessary', async () => {
            redisService.get.mockResolvedValue(
                JSON.stringify(lobbyWithTwoPlayers),
            );

            // Removemos al host
            const updatedLobby = await service.removePlayer(
                lobbyId,
                hostPlayer.id,
            );

            expect(updatedLobby?.hostId).toBe(guestPlayer.id);
            expect(updatedLobby?.players[hostPlayer.id]).toBeUndefined();
            expect(redisService.set).toHaveBeenCalled();
        });

        it('should delete the lobby if the last player is removed', async () => {
            const lobbyWithOnePlayer: Lobby = {
                id: lobbyId,
                hostId: hostPlayer.id,
                players: { [hostPlayer.id]: hostPlayer },
                status: 'waiting',
            };
            redisService.get.mockResolvedValue(
                JSON.stringify(lobbyWithOnePlayer),
            );

            const result = await service.removePlayer(lobbyId, hostPlayer.id);

            expect(result).toBeNull();
            expect(redisService.del).toHaveBeenCalledWith(`lobby:${lobbyId}`);
            expect(redisService.set).not.toHaveBeenCalled();
        });
    });
});
