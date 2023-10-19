import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.schema';
import { OrmHealthIndicator } from './checks/check.orm.user';
import { HealthController } from './health.controller';

@Module({
    imports: [TerminusModule, HttpModule, TypeOrmModule.forFeature([User])],
    controllers: [HealthController],
    providers: [OrmHealthIndicator],
})

/* eslint-disable-next-line @typescript-eslint/no-extraneous-class */
export default class HealthModule {}
