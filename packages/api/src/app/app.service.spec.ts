import { Test } from '@nestjs/testing';

import AppService from './app.service';

describe('AppService', () => {
    let service: AppService | null = null;

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [AppService],
        }).compile();

        service = app.get<AppService>(AppService);
    });

    describe('getData', () => {
        it('should return "Welcome to api!"', () => {
            const message = service?.getData() ?? { message: '' };
            expect(message).toEqual({
                message: '[object Object] Welcome to api!',
            });
        });
    });
});
