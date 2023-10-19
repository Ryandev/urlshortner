import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import LinkController from './link.controller';
import { Link } from './link.schema';
import { LinkService } from './link.service';

@Module({
    imports: [TypeOrmModule.forFeature([Link])],
    controllers: [LinkController],
    providers: [LinkService],
    exports: [LinkService],
})

/* eslint-disable-next-line @typescript-eslint/no-extraneous-class */
export default class LinkModule {}
