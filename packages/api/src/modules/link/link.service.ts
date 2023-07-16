import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { CreateILinkDto } from './dto/create.dto';
import type { UpdateILinkDto } from './dto/update.dto';
import { Link } from './link.schema';

@Injectable()
export default class LinkService {
    readonly linkModel: Readonly<Model<Link>>;

    public constructor(@InjectModel(Link.name) linkModel: Model<Link>) {
        this.linkModel = Object.freeze(linkModel);
    }

    async create(model: CreateILinkDto): Promise<Link> {
        const object = await this.linkModel.create({
            ...model,
            creationDate: new Date(),
            modifiedDate: new Date(),
        });
        await object.save();
        return object;
    }

    async all(): Promise<Link[]> {
        return this.linkModel.find().exec();
    }

    async get(id: string): Promise<Link | null> {
        return this.linkModel.findOne({ _id: id }).exec();
    }

    async update(id: string, partial: UpdateILinkDto): Promise<void> {
        await this.linkModel.findByIdAndUpdate(id, partial);
    }

    async delete(id: string) {
        const deletedLink = await this.linkModel.findByIdAndRemove({ _id: id }).exec();
        return deletedLink;
    }
}
