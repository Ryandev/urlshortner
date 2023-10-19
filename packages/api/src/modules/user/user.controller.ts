/*
 *https://docs.nestjs.com/controllers#controllers
 */

import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Request,
} from '@nestjs/common';
import { SetPublic } from '../../decorator/public';
import type { UserOnlyFields } from './user.schema';
import { User } from './user.schema';
import { UserService } from './user.service';

function userFromRequest(request: Request): User {
    const record = request as unknown as Record<string, unknown>;
    const { user } = record;
    return user as User;
}

@Controller({
    path: '/user',
    version: '1',
})
export class UserController {
    readonly service: Readonly<UserService>;

    public constructor(service: UserService) {
        this.service = Object.freeze(service);
    }

    @Get('/')
    async all(): Promise<User[]> {
        return this.service.all();
    }

    @Get(':id')
    async get(@Param('id') id: string): Promise<User> {
        return this.service.get(id);
    }

    /* eslint-disable-next-line class-methods-use-this */
    @Get('/profile')
    profile(@Request() request: Request): User {
        return userFromRequest(request);
    }

    @SetPublic()
    @Post('/')
    async create(@Body() model: Required<UserOnlyFields>) {
        const isAlreadyRegistered = await this.service.exists(model);

        if (isAlreadyRegistered) {
            throw new BadRequestException(`Account already exists for ${model.email}`);
        }

        const user = await this.service.create(model);

        return user;
    }

    @HttpCode(200)
    @Post('/search')
    async search(@Body() model: Partial<UserOnlyFields>) {
        return this.service.find(model);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
