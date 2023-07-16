import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import type { IAccessToken } from './interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly authService: Readonly<AuthService>;

    public constructor(authService: AuthService) {
        super();
        this.authService = Object.freeze(authService);
    }

    async validate(username: string, password: string): Promise<IAccessToken> {
        return this.authService.login(username, password);
    }
}
