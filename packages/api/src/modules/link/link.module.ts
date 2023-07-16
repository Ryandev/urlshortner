import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import LinkController from './link.controller';
import { Link, LinkSchema } from './link.schema';
import LinkService from './link.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }])],
    controllers: [LinkController],
    providers: [LinkService],
    exports: [LinkService],
})

/* eslint-disable-next-line @typescript-eslint/no-extraneous-class */
export default class LinkModule {}
