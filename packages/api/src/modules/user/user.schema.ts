import { Field } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/model/base.entity';
import { Link } from '../link/link.schema';

@Entity({ name: 'user' })
export class User extends BaseEntity {
    @Column()
    @Field(() => String, { description: 'Email' })
    email: string;

    @Column()
    @Field(() => String, { description: 'Password' })
    password: string;

    @Column()
    @Field(() => String, { description: 'First Name' })
    firstName: string;

    @Column()
    @Field(() => String, { description: 'Last Name' })
    lastName: string;

    @Column(_ => Link)
    @Field(() => String, { description: 'Links' })
    links: Link[];

    constructor(
        {
            email,
            password,
            firstName,
            lastName,
            links,
        }: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            links: Link[];
        } = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            links: [],
        },
    ) {
        super();

        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.links = links;
    }
}

export const Keys: (keyof User)[] = ['email', 'password', 'firstName', 'lastName', 'links'];

export type UserOnlyFields = Required<Omit<User, 'createdAt' | 'id' | 'updatedAt'>>;
