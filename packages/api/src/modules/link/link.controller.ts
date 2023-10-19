import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import type { ILinkData } from './link.interface';
import type { LinkOnlyFields } from './link.schema';
import { LinkService } from './link.service';

@Controller({
    path: '/link',
    version: '1',
})
export default class LinkController {
    readonly service: Readonly<LinkService>;

    public constructor(service: LinkService) {
        this.service = Object.freeze(service);
    }

    @Get('/')
    async all(): Promise<ILinkData[]> {
        return this.service.all();
    }

    @Get(':id')
    async get(@Param('id') id: string): Promise<ILinkData> {
        return this.service.get(id);
    }

    @Post('/')
    async create(@Body() model: Required<LinkOnlyFields>) {
        return this.service.create(model);
    }

    @HttpCode(200)
    @Post('/search')
    async search(@Body() model: Partial<LinkOnlyFields>) {
        return this.service.find(model);
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() model: Partial<LinkOnlyFields>) {
        return this.service.update(id, model);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
