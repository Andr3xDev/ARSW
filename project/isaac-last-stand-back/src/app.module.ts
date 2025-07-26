import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { LobbyModule } from './lobby/lobby.module';
import { LobbyGateway } from './lobby/lobby.gateway';
import { LobbyService } from './lobby/lobby.service';
import { ConfigModule } from '@nestjs/config';
import redisConfig from './configs/redis.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [redisConfig],
        }),
        RedisModule,
        LobbyModule,
    ],
    controllers: [],
    providers: [LobbyService, LobbyGateway],
})
export class AppModule {}
