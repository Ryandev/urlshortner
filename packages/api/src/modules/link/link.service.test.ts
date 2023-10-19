import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Repository } from 'typeorm';
import { Link, LinkOnlyFields } from './link.schema';
import { LinkService } from './link.service';

let userFieldIndex = 0;

const _createDummyLinkFields = (partial: Partial<LinkOnlyFields> = {}): LinkOnlyFields => ({
    name: `name${userFieldIndex++}`,
    url: `url${userFieldIndex++}`,
    ...partial,
});

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};

const _repositoryMockFactory: () => MockType<Repository<Link>> = jest.fn(() => ({
    save: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    findOneAndUpdate: jest.fn().mockResolvedValue({}),
    findOneAndDelete: jest.fn().mockResolvedValue({}),
})) as any;

describe('LinkService', () => {
    let linkService: LinkService;
    let mongoServer: MongoMemoryServer;
    let repositoryMock: MockType<Repository<Link>>;

    beforeEach(async () => {
        mongoServer = new MongoMemoryServer();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LinkService,
                {
                    provide: getRepositoryToken(Link),
                    useFactory: _repositoryMockFactory,
                },
            ],
        }).compile();

        linkService = module.get<LinkService>(LinkService);
        repositoryMock = module.get(getRepositoryToken(Link));

        expect(linkService).toBeDefined();
        expect(repositoryMock).toBeDefined();
    });

    afterEach(async () => {
        await mongoServer.stop();
    });

    describe('create', () => {
        it('should create a new link object', async () => {
            const modelData: Required<LinkOnlyFields> = _createDummyLinkFields();
            const modelLink = new Link(modelData);
            jest.spyOn(linkService.objectStore, 'save').mockResolvedValue(modelLink);

            const result = await linkService.create(modelData);

            expect(result).toEqual(modelLink);
            expect(linkService.objectStore.save).toHaveBeenCalledWith(expect.any(Link));
        });
    });

    describe('all', () => {
        it('should return all link objects', async () => {
            const users = [
                new Link(_createDummyLinkFields()),
                new Link(_createDummyLinkFields()),
                new Link(_createDummyLinkFields()),
            ];
            jest.spyOn(linkService.objectStore, 'find').mockResolvedValue(users);

            const result = await linkService.all();

            expect(result).toEqual(users);
            expect(linkService.objectStore.find).toHaveBeenCalled();
        });
    });

    describe('get', () => {
        it('should throw NotFoundException if id is invalid', async () => {
            const id = 'invalid-id';
            jest.spyOn(linkService.objectStore, 'findOne').mockResolvedValue(null);

            await expect(linkService.get(id)).rejects.toThrow(NotFoundException);
            expect(linkService.objectStore.findOne).not.toHaveBeenCalled();
        });

        it('should return a link object if found', async () => {
            const link = new Link(_createDummyLinkFields());

            jest.spyOn(linkService.objectStore, 'findOne').mockResolvedValue(link);

            const result = await linkService.get(link.id.toHexString());

            expect(result).toEqual(link);
            expect(linkService.objectStore.findOne).toHaveBeenCalledWith({
                where: { _id: expect.any(ObjectId) },
            });
        });
    });

    describe('update', () => {
        it('should throw NotFoundException if id is invalid', async () => {
            const invalidId = 'invalid-id';

            await expect(linkService.update(invalidId, {})).rejects.toThrowError(
                NotFoundException,
            );

            expect(linkService.objectStore.findOneAndUpdate).not.toHaveBeenCalled();
        });

        it('should update a link object and return the updated object', async () => {
            const originalData = _createDummyLinkFields();
            const partialData: Partial<Link> = {
                name: originalData.name + '_1',
            };
            const originalLink = new Link(originalData);
            const updatedLink = new Link({ ...originalData, ...partialData });

            jest.spyOn(linkService.objectStore, 'findOneAndUpdate').mockResolvedValue(
                updatedLink,
            );

            const result = await linkService.update(
                originalLink.id.toHexString(),
                partialData,
            );

            expect(linkService.objectStore.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: expect.any(ObjectId) },
                { $set: { ...partialData, updatedAt: expect.any(Date) } },
                { returnDocument: 'after' },
            );

            expect(result).toBe(updatedLink);
        });
    });

    describe('delete', () => {
        it('should throw NotFoundException if id is invalid', async () => {
            await expect(linkService.delete('invalid-id')).rejects.toThrowError(
                NotFoundException,
            );
        });

        it('should delete a link object and return the deleted object', async () => {
            const mockLink: Link = new Link(_createDummyLinkFields());
            expect(mockLink.id.toHexString().length).toBeGreaterThanOrEqual(24);

            jest.spyOn(linkService.objectStore, 'findOneAndDelete').mockResolvedValue(
                mockLink,
            );

            const result = await linkService.delete(mockLink.id.toHexString());

            expect(linkService.objectStore.findOneAndDelete).toHaveBeenCalledWith({
                _id: expect.any(ObjectId),
            });
            expect(result).toBe(mockLink);
        });
    });

    describe('find', () => {
        it('should throw NotFoundException if item is empty', async () => {
            const emptyItem: Partial<LinkOnlyFields> = {};

            await expect(linkService.find(emptyItem)).rejects.toThrowError(
                NotFoundException,
            );
            expect(linkService.objectStore.find).not.toHaveBeenCalled();
        });

        it('should find link objects based on the given criteria', async () => {
            const criteria: Partial<LinkOnlyFields> = {
                name: 'hello',
            };
            const mockResult: Link[] = [
                new Link(_createDummyLinkFields()),
                new Link(_createDummyLinkFields()),
            ];

            jest.spyOn(linkService.objectStore, 'find').mockResolvedValue(mockResult);

            const result = await linkService.find(criteria);

            expect(linkService.objectStore.find).toHaveBeenCalledWith(criteria);
            expect(result).toBe(mockResult);
        });
    });
});
