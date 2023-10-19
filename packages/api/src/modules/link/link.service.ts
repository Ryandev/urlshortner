import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import type { LinkOnlyFields } from './link.schema';
import { Link } from './link.schema';

@Injectable()
export class LinkService {
    readonly objectStore: Readonly<MongoRepository<Link>>;

    public constructor(@InjectRepository(Link) objectStore: MongoRepository<Link>) {
        this.objectStore = Object.freeze(objectStore);
    }

    async create(model: Required<LinkOnlyFields>): Promise<Link> {
        const newObject = new Link({
            ...model,
        });
        const savedObject = await this.objectStore.save(newObject);
        return savedObject;
    }

    async all(): Promise<Link[]> {
        return this.objectStore.find();
    }

    async get(id: string): Promise<Link> {
        if (!ObjectId.isValid(id)) {
            throw new NotFoundException();
        }

        const item = await this.objectStore.findOne({
            where: { _id: new ObjectId(id) },
        });

        if (item === null) {
            throw new NotFoundException();
        }

        return item;
    }

    async update(id: string, partial: Partial<LinkOnlyFields>): Promise<Link> {
        if (!ObjectId.isValid(id)) {
            throw new NotFoundException();
        }

        const data: Partial<Link> = {
            ...partial,
            updatedAt: new Date(),
        };

        return this.objectStore.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: data },
            { returnDocument: 'after' },
        ) as Promise<Link>;
    }

    async delete(id: string): Promise<Link> {
        if (!ObjectId.isValid(id)) {
            throw new NotFoundException();
        }

        const item = (await this.objectStore.findOneAndDelete({
            _id: new ObjectId(id),
        })) as Link | null;

        if (item === null) {
            throw new NotFoundException();
        }

        return item;
    }

    async find(item: Partial<LinkOnlyFields>): Promise<Link[]> {
        if (Object.keys(item).length <= 0) {
            throw new NotFoundException();
        }

        return this.objectStore.find({
            ...item,
        });
    }
}
