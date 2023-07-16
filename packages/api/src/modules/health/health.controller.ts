import { Controller, Get } from '@nestjs/common';
import {
    DiskHealthIndicator,
    HealthCheck,
    HealthCheckService,
    HttpHealthIndicator,
    MemoryHealthIndicator,
    MongooseHealthIndicator,
} from '@nestjs/terminus';
import { SetPublic } from '../../decorator/public';
import environment from '../../environment';

@Controller({
    path: '/health',
    version: '1',
})
export class HealthController {
    readonly healthService: Readonly<HealthCheckService>;

    readonly httpIndicator: Readonly<HttpHealthIndicator>;

    readonly diskIndicator: Readonly<DiskHealthIndicator>;

    readonly memoryIndicator: Readonly<MemoryHealthIndicator>;

    readonly mongoHealth: Readonly<MongooseHealthIndicator>;

    public constructor(
        healthService: HealthCheckService,
        httpIndicator: HttpHealthIndicator,
        diskIndicator: DiskHealthIndicator,
        memoryIndicator: MemoryHealthIndicator,
        mongoHealth: MongooseHealthIndicator,
    ) {
        this.healthService = Object.freeze(healthService);
        this.httpIndicator = Object.freeze(httpIndicator);
        this.diskIndicator = Object.freeze(diskIndicator);
        this.memoryIndicator = Object.freeze(memoryIndicator);
        this.mongoHealth = Object.freeze(mongoHealth);
    }

    @Get()
    @SetPublic()
    @HealthCheck()
    async check() {
        return this.healthService.check([
            async () =>
                this.httpIndicator.pingCheck(
                    'internet-access',
                    environment.healthCheck.urlCheck,
                ),
            async () =>
                this.diskIndicator.checkStorage('storage-used', {
                    path: process.cwd(),
                    threshold: environment.healthCheck.diskSpaceUsed,
                }),
            async () =>
                this.diskIndicator.checkStorage('storage-percent', {
                    path: process.cwd(),
                    thresholdPercent: environment.healthCheck.diskSpacePercent,
                }),
            async () =>
                this.memoryIndicator.checkHeap(
                    'memory-heap',
                    environment.healthCheck.memoryHeapMaximum,
                ),
            async () =>
                this.memoryIndicator.checkRSS(
                    'memory-rss',
                    environment.healthCheck.memoryRSSMaximum,
                ),
            async () => this.mongoHealth.pingCheck('db'),
        ]);
    }
}
