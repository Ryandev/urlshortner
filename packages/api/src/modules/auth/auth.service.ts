import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IUser } from '../user/interface';
import { UserService } from '../user/user.service';
import type { IAccessToken } from './interface';

@Injectable()
export class AuthService {
    private readonly userService: Readonly<UserService>;

    private readonly jwtService: Readonly<JwtService>;

    public constructor(userService: UserService, jwtService: JwtService) {
        this.userService = Object.freeze(userService);
        this.jwtService = Object.freeze(jwtService);
    }

    async login(email: string, pass: string): Promise<IAccessToken> {
        const user = await this.userService.find(email);
        if (!user) {
            throw new NotFoundException();
        } else if (user.password !== pass) {
            throw new UnauthorizedException();
        }

        return {
            accessToken: await this.jwtService.signAsync(user),
        };
    }

    async register(email: string, password: string): Promise<IUser> {
        return this.userService.create(email, password);
    }
}
