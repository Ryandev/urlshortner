import bootstrap from './start';

describe('Start', () => {
    // let app: INestApplication | null = null;

    // beforeAll(async () => {
    //     const moduleRef = await Test.createTestingModule({
    //         imports: [AppModule],
    //     }).compile();

    //     app = moduleRef.createNestApplication();
    //     await app.init();
    // });

    // afterAll(async () => {
    //     await app?.close();
    // });

    it('should start the application', async () => {
        const spy = jest.spyOn(console, 'error');
        await bootstrap();
        expect(spy).not.toHaveBeenCalled();
    });
});
