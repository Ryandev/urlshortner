import { validate } from 'class-validator';
import { UpdateILinkDto } from './update.dto';

const emptyDto = () => new UpdateILinkDto(undefined as any, undefined as any);

describe('UpdateILinkDto', () => {
    describe('name', () => {
        it('should be a string if provided', async () => {
            const dto = emptyDto();
            dto.name = 'Test Name';

            const errors = await validate(dto);
            expect(errors.length).toBe(0);
        });

        it('should not have errors if not provided', async () => {
            const dto = emptyDto();

            const errors = await validate(dto);
            expect(errors.length).toBe(0);
        });

        it('should have errors if not a string', async () => {
            const dto = emptyDto();
            dto.name = 123 as any;

            const errors = await validate(dto);
            expect(errors.length).toBeGreaterThan(0);
        });
    });

    describe('url', () => {
        it('should be a string if provided', async () => {
            const dto = emptyDto();
            dto.url = 'https://example.com';

            const errors = await validate(dto);
            expect(errors.length).toBe(0);
        });

        it('should not have errors if not provided', async () => {
            const dto = emptyDto();

            const errors = await validate(dto);
            expect(errors.length).toBe(0);
        });

        it('should have errors if not a string', async () => {
            const dto = emptyDto();
            dto.url = 123 as any;

            const errors = await validate(dto);
            expect(errors.length).toBeGreaterThan(0);
        });
    });
});
