import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Repository } from 'typeorm';
import { User, UserOnlyFields } from './user.schema';
import { UserService } from './user.service';

let userFieldIndex = 0;

const _createDummyUserFields = (partial: Partial<UserOnlyFields> = {}): UserOnlyFields => ({
    email: `email${userFieldIndex++}@a.com`,
    password: `password${userFieldIndex++}`,
    firstName: `firstName${userFieldIndex++}`,
    lastName: `lastName${userFieldIndex++}`,
    links: [],
    ...partial,
});

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};

const _repositoryMockFactory: () => MockType<Repository<User>> = jest.fn(() => ({
    save: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    findOneAndUpdate: jest.fn().mockResolvedValue({}),
    findOneAndDelete: jest.fn().mockResolvedValue({}),
})) as any;

describe('UserService', () => {
    let userService: UserService;
    let mongoServer: MongoMemoryServer;
    let repositoryMock: MockType<Repository<User>>;

    beforeEach(async () => {
        mongoServer = new MongoMemoryServer();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useFactory: _repositoryMockFactory,
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        repositoryMock = module.get(getRepositoryToken(User));

        expect(userService).toBeDefined();
        expect(repositoryMock).toBeDefined();
    });

    afterEach(async () => {
        await mongoServer.stop();
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const model: Required<UserOnlyFields> = _createDummyUserFields();
            const savedObject = new User(model);
            jest.spyOn(userService.objectStore, 'save').mockResolvedValue(savedObject);

            const result = await userService.create(model);

            expect(result).toEqual(savedObject);
            expect(userService.objectStore.save).toHaveBeenCalledWith(expect.any(User));
        });
    });

    describe('all', () => {
        it('should return all users', async () => {
            const users = [
                new User(_createDummyUserFields()),
                new User(_createDummyUserFields()),
                new User(_createDummyUserFields()),
            ];
            jest.spyOn(userService.objectStore, 'find').mockResolvedValue(users);

            const result = await userService.all();

            expect(result).toEqual(users);
            expect(userService.objectStore.find).toHaveBeenCalled();
        });
    });

    describe('get', () => {
        it('should return a user by ID', async () => {
            const user = new User(_createDummyUserFields());

            jest.spyOn(userService.objectStore, 'findOne').mockResolvedValue(user);

            const result = await userService.get(user.id.toHexString());

            expect(result).toEqual(user);
            expect(userService.objectStore.findOne).toHaveBeenCalledWith({
                where: { _id: expect.any(ObjectId) },
            });
        });

        it('should throw NotFoundException if ID is not valid', async () => {
            const id = 'invalid-id';
            jest.spyOn(userService.objectStore, 'findOne').mockResolvedValue(null);

            await expect(userService.get(id)).rejects.toThrow(NotFoundException);
            expect(userService.objectStore.findOne).not.toHaveBeenCalled();
        });

        it('should throw NotFoundException if user is not found', async () => {
            const id = '000000000000000000000000';
            jest.spyOn(userService.objectStore, 'findOne').mockResolvedValue(null);

            await expect(userService.get(id)).rejects.toThrow(NotFoundException);
            expect(userService.objectStore.findOne).toHaveBeenCalledWith({
                where: { _id: expect.any(ObjectId) },
            });
        });
    });

    describe('update', () => {
        it('should update a user by ID', async () => {
            const data = _createDummyUserFields();

            const partial: Partial<User> = {
                firstName: data.firstName + '_1',
            };
            const updatedUser = {
                ...data,
                ...partial,
            };

            jest.spyOn(userService.objectStore, 'findOneAndUpdate').mockResolvedValue(
                updatedUser,
            );

            const result = await userService.update('000000000000000000000000', partial);

            expect(result).toEqual(updatedUser);
            expect(userService.objectStore.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: expect.any(ObjectId) },
                { $set: expect.any(Object) },
                { returnDocument: 'after' },
            );
        });

        it('should throw NotFoundException if ID is not valid', async () => {
            const id = 'invalid-id';

            await expect(userService.update(id, {})).rejects.toThrow(NotFoundException);
            expect(userService.objectStore.findOneAndUpdate).not.toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        it('should throw NotFoundException if id is invalid', async () => {
            await expect(userService.delete('invalid-id')).rejects.toThrowError(
                NotFoundException,
            );
        });

        it('should delete a link object and return the deleted object', async () => {
            const mockLink = new User(_createDummyUserFields());
            expect(mockLink.id.toHexString().length).toBeGreaterThanOrEqual(24);

            jest.spyOn(userService.objectStore, 'findOneAndDelete').mockResolvedValue(
                mockLink,
            );

            const result = await userService.delete(mockLink.id.toHexString());

            expect(userService.objectStore.findOneAndDelete).toHaveBeenCalledWith({
                _id: expect.any(ObjectId),
            });
            expect(result).toBe(mockLink);
        });
    });

    describe('find', () => {
        it('should throw NotFoundException if item is empty', async () => {
            const emptyItem: Partial<UserOnlyFields> = {};

            await expect(userService.find(emptyItem)).rejects.toThrowError(
                NotFoundException,
            );
            expect(userService.objectStore.find).not.toHaveBeenCalled();
        });

        it('should find link objects based on the given criteria', async () => {
            const criteria: Partial<UserOnlyFields> = {
                email: 'hello',
            };
            const mockResult: User[] = [
                new User(_createDummyUserFields()),
                new User(_createDummyUserFields()),
            ];

            jest.spyOn(userService.objectStore, 'find').mockResolvedValue(mockResult);

            const result = await userService.find(criteria);

            expect(userService.objectStore.find).toHaveBeenCalledWith(criteria);
            expect(result).toBe(mockResult);
        });
    });

    describe('exists', () => {
        it('should return false if no match found', async () => {
            jest.spyOn(userService.objectStore, 'find').mockResolvedValue([]);

            const result = await userService.exists({ email: 'hello' });

            expect(result).toBeFalsy();

            expect(userService.objectStore.find).toHaveBeenCalled();
        });

        it('should return true if match found', async () => {
            const items = [new User(_createDummyUserFields())];

            jest.spyOn(userService.objectStore, 'find').mockResolvedValue(items);

            const result = await userService.exists({ email: 'hello' });

            expect(result).toBeTruthy();

            expect(userService.objectStore.find).toHaveBeenCalled();
        });
    });
});
