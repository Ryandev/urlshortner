import { validate } from 'class-validator';
import { CreateILinkDto } from './create.dto';

const emptyDto = () => new CreateILinkDto(undefined as any, undefined as any);

describe('CreateILinkDto', () => {
    it('should pass validation when all properties are valid', async () => {
        const createILinkDto = emptyDto();
        createILinkDto.name = 'Example Name';
        createILinkDto.url = 'https://example.com';

        const errors = await validate(createILinkDto);

        expect(errors.length).toEqual(0);
    });

    it('should fail validation when name is empty', async () => {
        const createILinkDto = emptyDto();
        createILinkDto.name = '';
        createILinkDto.url = 'https://example.com';

        const errors = await validate(createILinkDto);

        expect(errors.length).toEqual(1);
        expect(errors.at(0)?.constraints).toEqual({
            isNotEmpty: 'name should not be empty',
        });
    });

    it('should fail validation when url is empty', async () => {
        const createILinkDto = emptyDto();
        createILinkDto.name = 'Example Name';
        createILinkDto.url = '';

        const errors = await validate(createILinkDto);

        expect(errors.length).toEqual(1);
        expect(errors.at(0)?.constraints).toEqual({
            isNotEmpty: 'url should not be empty',
        });
    });
});
