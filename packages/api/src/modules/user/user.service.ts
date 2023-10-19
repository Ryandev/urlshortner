import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import type { UserOnlyFields } from './user.schema';
import { User } from './user.schema';

@Injectable()
export class UserService {
    readonly objectStore: Readonly<MongoRepository<User>>;

    public constructor(@InjectRepository(User) objectStore: MongoRepository<User>) {
        this.objectStore = Object.freeze(objectStore);
    }

    async create(model: Omit<Required<UserOnlyFields>, 'links'>): Promise<User> {
        const newObject = new User({
            links: [],
            ...model,
        });

        const savedObject = await this.objectStore.save(newObject);
        return savedObject;
    }

    async all(): Promise<User[]> {
        return this.objectStore.find();
    }

    async get(id: string): Promise<User> {
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

    async update(id: string, partial: Partial<UserOnlyFields>): Promise<User> {
        if (!ObjectId.isValid(id)) {
            throw new NotFoundException();
        }

        const data: Partial<User> = {
            ...partial,
            updatedAt: new Date(),
        };

        return this.objectStore.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: data },
            { returnDocument: 'after' },
        ) as Promise<User>;
    }

    async delete(id: string): Promise<User> {
        if (!ObjectId.isValid(id)) {
            throw new NotFoundException();
        }

        const item = (await this.objectStore.findOneAndDelete({
            _id: new ObjectId(id),
        })) as User | null;

        if (item === null) {
            throw new NotFoundException();
        }

        return item;
    }

    async find(item: Partial<UserOnlyFields>): Promise<User[]> {
        if (Object.keys(item).length <= 0) {
            throw new NotFoundException();
        }

        return this.objectStore.find({
            ...item,
        });
    }

    async exists(item: Partial<UserOnlyFields>): Promise<boolean> {
        const match = (await this.find(item).catch(_ => [])).at(0);
        return typeof match !== 'undefined';
    }
}
