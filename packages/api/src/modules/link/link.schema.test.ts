import { Keys, Link, LinkOnlyFields } from './link.schema'; // Import the Link class, Keys array, and LinkOnlyFields type

const data: Required<LinkOnlyFields> = Object.freeze({
    // Create a new instance of the Link class with default values
    name: 'Test Link',
    url: 'https://www.testlink.com',
});

describe('Link', () => {
    it('should have name and url properties', () => {
        const link = new Link(data);

        expect(link.name).toBe(data.name); // Check if the name property is set correctly
        expect(link.url).toBe(data.url); // Check if the url property is set correctly
    });

    it('should have createdAt and updatedAt properties', () => {
        const link = new Link(data);

        expect(link.createdAt).toBeInstanceOf(Date); // Check if the createdAt property is an instance of Date
        expect(link.updatedAt).toBeInstanceOf(Date); // Check if the updatedAt property is an instance of Date
    });

    it('should have the correct keys', () => {
        expect(Keys).toEqual(['name', 'url']); // Check if the Keys array contains the correct keys
    });
});
