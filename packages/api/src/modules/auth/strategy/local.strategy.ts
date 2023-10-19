import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import type { User } from '../../user/user.schema';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

export const IDENTITY_STRATEGY_LOCAL = 'LOCAL';

@Injectable()
/* eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided */
export class LocalStrategy extends PassportStrategy(Strategy, IDENTITY_STRATEGY_LOCAL) {
    readonly authService: Readonly<AuthService>;

    readonly userService: Readonly<UserService>;

    public constructor(authService: AuthService, userService: UserService) {
        super();

        this.authService = Object.freeze(authService);
        this.userService = Object.freeze(userService);
    }

    async validate(email: string, password: string): Promise<User> {
        const token = await this.authService.login(email, password);
        if (token.accessToken.length <= 1) {
            throw new UnauthorizedException();
        }

        const matches = await this.userService.find({ email });
        const user = matches.at(0);

        if (matches.length <= 0 || !user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
