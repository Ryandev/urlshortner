import { Controller, Get } from '@nestjs/common';
import type { HealthIndicatorFunction } from '@nestjs/terminus';
import {
    DiskHealthIndicator,
    HealthCheck,
    HealthCheckService,
    HttpHealthIndicator,
    MemoryHealthIndicator,
} from '@nestjs/terminus';
import { InjectRepository } from '@nestjs/typeorm';
import type { IConfiguration } from '@url/api/configuration/interface';
import { MongoRepository } from 'typeorm';
import configuration from '../../configuration';
import { SetPublic } from '../../decorator/public';
import { User } from '../user/user.schema';
import { OrmHealthIndicator } from './checks/check.orm.user';

@Controller({
    path: '/health',
    version: '1',
})
export class HealthController {
    readonly healthService: Readonly<HealthCheckService>;

    readonly httpIndicator: Readonly<HttpHealthIndicator>;

    readonly diskIndicator: Readonly<DiskHealthIndicator>;

    readonly memoryIndicator: Readonly<MemoryHealthIndicator>;

    readonly databaseIndicator: Readonly<OrmHealthIndicator>;

    readonly objectStore: Readonly<MongoRepository<User>>;

    public constructor(
        @InjectRepository(User) objectStore: MongoRepository<User>,
        healthService: HealthCheckService,
        httpIndicator: HttpHealthIndicator,
        diskIndicator: DiskHealthIndicator,
        memoryIndicator: MemoryHealthIndicator,
        databaseIndicator: OrmHealthIndicator,
    ) {
        this.objectStore = Object.freeze(objectStore);
        this.healthService = Object.freeze(healthService);
        this.httpIndicator = Object.freeze(httpIndicator);
        this.diskIndicator = Object.freeze(diskIndicator);
        this.memoryIndicator = Object.freeze(memoryIndicator);
        this.databaseIndicator = Object.freeze(databaseIndicator);
    }

    @Get()
    @SetPublic()
    @HealthCheck()
    async check() {
        const checks = this.checksList(configuration.load().healthCheck);
        return this.healthService.check(checks);
    }

    /* eslint-disable-next-line max-statements */
    private checksList(settings: IConfiguration['healthCheck']) {
        const checks: HealthIndicatorFunction[] = [];

        if (settings.urlCheck.length > 0) {
            checks.push(async () =>
                this.httpIndicator.pingCheck('internet-access', settings.urlCheck),
            );
        }

        if (settings.diskSpaceUsed > 0) {
            checks.push(async () =>
                this.diskIndicator.checkStorage('storage-used', {
                    path: process.cwd(),
                    threshold: settings.diskSpaceUsed,
                }),
            );
        }

        if (settings.diskSpacePercent > 0) {
            checks.push(async () =>
                this.diskIndicator.checkStorage('storage-percent', {
                    path: process.cwd(),
                    thresholdPercent: settings.diskSpacePercent,
                }),
            );
        }

        if (settings.memoryHeapMaximum > 0) {
            checks.push(async () =>
                this.memoryIndicator.checkHeap('memory-heap', settings.memoryHeapMaximum),
            );
        }

        if (settings.memoryRSSMaximum > 0) {
            checks.push(async () =>
                this.memoryIndicator.checkRSS('memory-rss', settings.memoryRSSMaximum),
            );
        }

        checks.push(async () =>
            this.databaseIndicator.isHealthy('database', this.objectStore),
        );

        return checks;
    }
}
