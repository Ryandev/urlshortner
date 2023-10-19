import { Injectable } from '@nestjs/common';
import type { HealthIndicatorResult } from '@nestjs/terminus';
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus';
import type { MongoRepository, ObjectLiteral } from 'typeorm';

@Injectable()
export class OrmHealthIndicator extends HealthIndicator {
    async isHealthy<Entity extends ObjectLiteral>(
        key: string,
        repository: MongoRepository<Entity>,
    ): Promise<HealthIndicatorResult> {
        try {
            await repository.find();
            return this.getStatus(key, true);
        } catch (error: unknown) {
            throw new HealthCheckError('TypeOrm Health check failed', error);
        }
    }
}
