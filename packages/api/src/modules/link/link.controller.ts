import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateILinkDto } from './dto/create.dto';
import { UpdateILinkDto } from './dto/update.dto';
import type { ILinkData } from './link.interface';
import LinkService from './link.service';

@Controller({
    path: '/link',
    version: '1',
})
export default class LinkController {
    readonly linkService: Readonly<LinkService>;

    public constructor(linkService: LinkService) {
        this.linkService = Object.freeze(linkService);
    }

    @Post('/')
    async create(@Body() model: CreateILinkDto) {
        return this.linkService.create(model);
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() model: UpdateILinkDto) {
        await this.linkService.update(id, model);
    }

    @Get('/')
    async all(): Promise<ILinkData[]> {
        return this.linkService.all();
    }

    @Get(':id')
    async get(@Param('id') id: string): Promise<ILinkData> {
        const result = await this.linkService.get(id);
        if (result === null) {
            throw new NotFoundException();
        }
        return result;
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.linkService.delete(id);
    }
}
