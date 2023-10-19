import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { isObject } from '@url/shared/lib/utils/object';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configuration from '../../../configuration';

export const IDENTITY_STRATEGY_JWT = 'JWT';

@Injectable()
/* eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided */
export class JwtStrategy extends PassportStrategy(Strategy, IDENTITY_STRATEGY_JWT) {
    constructor() {
        const settings = configuration.load();

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: settings.jwt.secret,
        });
    }

    async validate(payload: unknown) {
        let username = '';
        let userId = 0;

        if (isObject(payload)) {
            username = String(payload.username);
            userId = parseInt(String(payload.sub), 10);
        }

        return Promise.resolve({ userId, username });
    }
}
