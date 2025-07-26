import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly client: Redis;

    constructor(private readonly configService: ConfigService) {
        this.client = new Redis({
            host: this.configService.get('redis.host'),
            port: this.configService.get('redis.port'),
            password: this.configService.get('redis.password'),
            db: this.configService.get('redis.db'),
            enableReadyCheck: false,
            maxRetriesPerRequest: null,
        });
    }

    getClient(): Redis {
        return this.client;
    }

    async set(key: string, value: string, ttl?: number): Promise<void> {
        if (ttl) {
            await this.client.setex(key, ttl, value);
        } else {
            await this.client.set(key, value);
        }
    }

    async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    async del(key: string): Promise<number> {
        return await this.client.del(key);
    }

    async exists(key: string): Promise<number> {
        return await this.client.exists(key);
    }

    private getSocketKey(socketId: string): string {
        return `socket:${socketId}`;
    }

    async setSocketId(
        socketId: string,
        lobbyId: string,
        ttl: number = 3600,
    ): Promise<void> {
        await this.set(this.getSocketKey(socketId), lobbyId, ttl);
    }

    async getLobbyIdBySocketId(socketId: string): Promise<string | null> {
        return await this.get(this.getSocketKey(socketId));
    }

    async delSocketId(socketId: string): Promise<number> {
        return await this.del(this.getSocketKey(socketId));
    }

    onModuleDestroy() {
        this.client.disconnect();
    }
}
