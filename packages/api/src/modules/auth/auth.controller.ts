import { Body, Controller, Post } from '@nestjs/common';
import { SetPublic } from '../../decorator/public';
import { AuthService } from './auth.service';
import { IAuth } from './interface';

@Controller({
    path: '/auth',
    version: '1',
})
export class AuthController {
    readonly authService: Readonly<AuthService>;

    public constructor(authService: AuthService) {
        this.authService = Object.freeze(authService);
    }

    @SetPublic()
    @Post('/login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        return this.authService.login(email, password);
    }

    @SetPublic()
    @Post('/register')
    async register(@Body() model: IAuth) {
        return this.authService.register(model.email, model.password);
    }
}
