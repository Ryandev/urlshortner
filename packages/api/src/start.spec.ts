import bootstrap from './start';

describe('Start', () => {
    it('should start the application', async () => {
        const spy = jest.spyOn(console, 'error');
        const app = await bootstrap();
        /* wait 5s */
        await new Promise(timer => setTimeout(timer, 5000));
        expect(spy).not.toHaveBeenCalled();

        await app.close();
    });
});
