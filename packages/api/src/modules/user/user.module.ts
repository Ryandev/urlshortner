import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})

/* eslint-disable-next-line @typescript-eslint/no-extraneous-class */
export default class UserModule {}
