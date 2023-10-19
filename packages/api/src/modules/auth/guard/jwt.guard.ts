import type { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IsPublic } from '../../../decorator/public';
import { IDENTITY_STRATEGY_JWT } from '../strategy/jwt.strategy';

@Injectable()
/* eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided */
export class JwtAuthGuard extends AuthGuard(IDENTITY_STRATEGY_JWT) {
    private readonly reflector: Readonly<Reflector>;

    public constructor(reflector: Reflector) {
        super();
        this.reflector = Object.freeze(reflector);
    }

    /* Cannot match type of boolean | Promise<boolean> when using async */
    /* eslint-disable-next-line @typescript-eslint/promise-function-async */
    override canActivate(context: ExecutionContext) {
        if (IsPublic(this.reflector, context)) {
            return true;
        }

        return super.canActivate(context);
    }
}
