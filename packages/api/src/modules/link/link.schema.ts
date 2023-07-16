import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';
import { Schema as MongooseSchema, now } from 'mongoose';

/* eslint-disable-next-line @typescript-eslint/no-type-alias */
export type LinkDocument = HydratedDocument<Link>;

@Schema({ timestamps: true })
@ObjectType()
export class Link {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId;

    @Prop()
    @Field(() => String, { description: 'Name' })
    name: string;

    @Prop()
    @Field(() => String, { description: 'URL' })
    url: string;

    @Prop({ default: now() })
    @Field(() => Date, { description: 'Created At' })
    createdAt: Date;

    @Prop({ default: now() })
    @Field(() => Date, { description: 'Updated At' })
    updatedAt: Date;

    constructor(
        id: MongooseSchema.Types.ObjectId,
        name: string,
        url: string,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this._id = id;
        this.name = name;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export const LinkSchema = SchemaFactory.createForClass(Link);
