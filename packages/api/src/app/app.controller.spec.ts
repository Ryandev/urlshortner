import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import AppController from './app.controller';
import type { IAppData } from './app.interface';
import AppService from './app.service';

describe('AppController', () => {
    let app: TestingModule | null = null;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();
    });

    describe('getData', () => {
        it('should return "[object Object] Welcome to api!"', () => {
            const appController = app?.get<AppController>(AppController);
            const actualValue: IAppData = appController?.getData() ?? { message: '' };
            const expectedValue: IAppData = {
                message: '[object Object] Welcome to api!',
            };
            expect(expectedValue).toEqual(actualValue);
        });
    });
});
