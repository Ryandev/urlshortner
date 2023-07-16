import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
    imports: [TerminusModule, HttpModule],
    controllers: [HealthController],
    providers: [],
})

/* eslint-disable-next-line @typescript-eslint/no-extraneous-class */
export default class HealthModule {}
