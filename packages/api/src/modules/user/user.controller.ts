/*
 *https://docs.nestjs.com/controllers#controllers
 */

import {
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Request,
} from '@nestjs/common';
import { IUser } from './interface';
import { UserService } from './user.service';

function userFromRequest(request: Request): IUser {
    const record = request as unknown as Record<string, unknown>;
    const { user } = record;
    return user as IUser;
}

@Controller({
    path: '/user',
    version: '1',
})
export class UserController {
    readonly userService: Readonly<UserService>;

    public constructor(userService: UserService) {
        this.userService = Object.freeze(userService);
    }

    @Get('/')
    async all(): Promise<IUser[]> {
        return this.userService.all();
    }

    /* eslint-disable-next-line class-methods-use-this */
    @Get('/profile')
    profile(@Request() request: Request): IUser {
        return userFromRequest(request);
    }

    @Get(':id')
    async get(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
        const result = await this.userService.get(id);
        if (typeof result === 'undefined') {
            throw new NotFoundException();
        }
        return result;
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
}
