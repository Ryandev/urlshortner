import AppController from './app.controller';
import type { IAppData } from './app.interface';
import AppService from './app.service';

describe('App.Controller', () => {
    describe('getData', () => {
        it('Validate getData() response', () => {
            const controller = new AppController(new AppService());
            const actualValue: IAppData = controller.getData();
            const expectedValue: IAppData = {
                message: 'AppService:{} Welcome to api!',
            };
            expect(expectedValue).toEqual(actualValue);
        });
    });
});
