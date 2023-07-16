import AuthModule from './auth/auth.module';
import HealthCheckModule from './health/health.module';
import LinkModule from './link/link.module';
import UserModule from './user/user.module';

export const modules = Object.freeze([
    LinkModule,
    UserModule,
    AuthModule,
    HealthCheckModule,
]);
