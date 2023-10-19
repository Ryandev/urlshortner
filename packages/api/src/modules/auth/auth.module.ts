import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import configuration from '../../configuration';
import UserModule from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import guards from './guard';
import strategies from './strategy';

const settings = configuration.load();

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: settings.jwt.secret,
            signOptions: { expiresIn: `${settings.jwt.expiryDelay}s` },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, ...guards, ...strategies],
    exports: [AuthService],
})

/* eslint-disable-next-line @typescript-eslint/no-extraneous-class */
export default class AuthModule {}
