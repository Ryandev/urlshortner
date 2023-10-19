import { APP_GUARD } from '@nestjs/core';
import AuthModule from './auth/auth.module';
import authGuards from './auth/guard';
import HealthCheckModule from './health/health.module';
import LinkModule from './link/link.module';
import UserModule from './user/user.module';

export const modules = Object.freeze([
    LinkModule,
    UserModule,
    AuthModule,
    HealthCheckModule,
]);

const primaryAuthGuard = authGuards.at(0);

export const guards = Object.freeze(
    primaryAuthGuard
        ? [
              {
                  provide: APP_GUARD,
                  useClass: primaryAuthGuard,
              },
          ]
        : [],
);
