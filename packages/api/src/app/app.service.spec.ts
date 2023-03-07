import type { IAppData } from './app.interface';
import AppService from './app.service';

describe('App.Service', () => {
    describe('getData', () => {
        it('Validate getData() response', () => {
            const service = new AppService();
            expect(service).not.toBeFalsy();
            const actualValue = service.getData();
            const expectedValue: IAppData = {
                message: 'AppService:{} Welcome to api!',
            };
            expect(expectedValue).toEqual(actualValue);
        });
    });
});
