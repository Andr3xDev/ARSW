import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyGateway } from './lobby.gateway';
import { RedisModule } from 'src/redis/redis.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [RedisModule, ScheduleModule.forRoot()],
    providers: [LobbyService, LobbyGateway],
})
export class LobbyModule {}
