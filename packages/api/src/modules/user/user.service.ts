import { Injectable } from '@nestjs/common';
import type { IUser } from './interface';

@Injectable()
export class UserService {
    private users: IUser[] = [
        {
            id: 1,
            email: 'john.asdf@website.com',
            password: 'changeMe',
        },
        {
            id: 2,
            email: 'maria.asdf@website.com',
            password: 'guess',
        },
    ];

    async all(): Promise<IUser[]> {
        return Promise.resolve(this.users);
    }

    async get(id: number): Promise<IUser | undefined> {
        return Promise.resolve(this.users.find(user => user.id === id));
    }

    async find(email: string): Promise<IUser | undefined> {
        return Promise.resolve(this.users.find(user => user.email === email));
    }

    async delete(id: number): Promise<void> {
        this.users = this.users.filter(user => user.id !== id);
        return Promise.resolve();
    }

    async create(email: string, password: string): Promise<IUser> {
        const record: IUser = { id: this.users.length + 1, email, password };
        this.users = [...this.users, record];
        return Promise.resolve(record);
    }
}
