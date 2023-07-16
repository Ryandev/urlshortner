import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@sentry/node';
import type { Request } from 'express';
import { IsPublic } from '../../decorator/public';
import environment from '../../environment';

function _extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (typeof token === 'undefined' || typeof type === 'undefined') {
        return null;
    }
    return type === 'Bearer' ? token : null;
}

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly jwtService: Readonly<JwtService>;

    private readonly reflector: Readonly<Reflector>;

    public constructor(jwtService: JwtService, reflector: Reflector) {
        this.jwtService = Object.freeze(jwtService);
        this.reflector = Object.freeze(reflector);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (IsPublic(this.reflector, context)) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();

        const token = _extractTokenFromHeader(request);

        if (token === null) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync<User>(token, {
                secret: environment.jwt.secret,
            });
            /*
             * 💡 We're assigning the payload to the request object here
             * so that we can access it in our route handlers
             */
            // eslint-disable-next-line @typescript-eslint/dot-notation
            (request as unknown as Record<string, unknown>)['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}
