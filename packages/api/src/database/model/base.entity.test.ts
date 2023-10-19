import { ObjectId } from 'mongodb';
import { BaseEntity } from './base.entity';

export class TestEntity extends BaseEntity {}

const objectId = new ObjectId('651b1d4e00878b2f0c0ccafb');

describe('BaseEntity', () => {
    it('should have an id property of type ObjectId', () => {
        const entity = new TestEntity(objectId);

        expect(entity).toHaveProperty('id');
        expect(entity.id).toBeInstanceOf(ObjectId);
        expect(entity.id).toBe(objectId);
    });

    it('should have a createdAt property of type Date', () => {
        const entity = new TestEntity(objectId);

        expect(entity).toHaveProperty('createdAt');
        expect(entity.createdAt).toBeInstanceOf(Date);
    });

    it('should have an updatedAt property of type Date', () => {
        const entity = new TestEntity(objectId);

        expect(entity).toHaveProperty('updatedAt');
        expect(entity.updatedAt).toBeInstanceOf(Date);
    });

    it('should set createdAt and updatedAt properties to the current timestamp', () => {
        const entity = new TestEntity(objectId);

        const currentTimestamp = new Date();
        expect(entity.createdAt.getTime()).toBeGreaterThanOrEqual(
            currentTimestamp.getTime(),
        );
        expect(entity.updatedAt.getTime()).toBeGreaterThanOrEqual(
            currentTimestamp.getTime(),
        );
    });
});
