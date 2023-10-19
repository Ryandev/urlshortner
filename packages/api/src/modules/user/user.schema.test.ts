import { Link } from '../link/link.schema';
import { User } from './user.schema';

describe('User', () => {
    it('should create a new user with default values', () => {
        const user = new User();

        expect(user.email).toBe('');
        expect(user.password).toBe('');
        expect(user.firstName).toBe('');
        expect(user.lastName).toBe('');
        expect(user.links).toEqual([]);
        expect(user.createdAt).toEqual(expect.any(Date));
        expect(user.updatedAt).toEqual(expect.any(Date));
    });

    it('should create a new user with given values', () => {
        const email = 'test@example.com';
        const password = 'password';
        const firstName = 'John';
        const lastName = 'Doe';
        const links = [
            new Link({
                url: 'https://example.com',
                name: 'Example link',
            }),
        ];

        const user = new User({
            email,
            password,
            firstName,
            lastName,
            links,
        });

        expect(user.email).toBe(email);
        expect(user.password).toBe(password);
        expect(user.firstName).toBe(firstName);
        expect(user.lastName).toBe(lastName);
        expect(user.links).toEqual(links);
    });
});
