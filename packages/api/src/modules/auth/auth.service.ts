import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import type { IAccessToken } from './interface';

@Injectable()
export class AuthService {
    private readonly userService: Readonly<UserService>;

    private readonly jwtService: Readonly<JwtService>;

    // Private readonly authGuard: AuthGuard;

    public constructor(
        userService: UserService,
        jwtService: JwtService,
        // AuthGuard: AuthGuard,
    ) {
        this.userService = Object.freeze(userService);
        this.jwtService = Object.freeze(jwtService);
        // This.authGuard = authGuard;
    }

    async login(email: string, pass: string): Promise<IAccessToken> {
        const userMatches = await this.userService.find({ email });
        const user = userMatches.at(0);

        if (!user) {
            throw new NotFoundException(`No account found for: ${email}`);
        }

        if (user.password !== pass) {
            throw new UnauthorizedException();
        }

        return {
            accessToken: await this.jwtService.signAsync({ user }),
            // AccessToken: await this.authGuard.generateToken(user),
        };
    }
}
