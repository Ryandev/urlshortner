import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/model/base.entity';

@Entity({ name: 'link' })
@ObjectType()
export class Link extends BaseEntity {
    @Column()
    @Field(() => String, { description: 'Name' })
    name: string;

    @Column()
    @Field(() => String, { description: 'URL' })
    url: string;

    constructor(
        {
            name,
            url,
        }: {
            name: string;
            url: string;
        } = { name: '', url: '' },
    ) {
        super();
        this.name = name;
        this.url = url;
    }
}

export const Keys: (keyof Link)[] = ['name', 'url'];

export type LinkOnlyFields = Required<Omit<Link, 'createdAt' | 'id' | 'updatedAt'>>;
