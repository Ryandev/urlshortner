import { Field } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { ObjectIdColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @ObjectIdColumn({ name: '_id' })
    @Field(() => Date, { description: 'Unique identifier(mongo-db usage only)' })
    id: ObjectId;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    @Field(() => Date, { description: 'Created At' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    @Field(() => Date, { description: 'Updated At' })
    updatedAt: Date;

    constructor(
        id: ObjectId = new ObjectId('000000000000000000000000'),
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
