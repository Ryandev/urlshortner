import { Test } from '@nestjs/testing';
import AppModule from '@url/api/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { dummyConfig, setupApp, teardownApp } from '../../../jest.util';
import { HealthController } from './health.controller';
const request = require('supertest'); /* import won't work with TS */

describe('Link', () => {
    it('should compile the module', async () => {
        const app = await setupApp(dummyConfig()).catch(_ => null);
        expect(app).toBeTruthy();
        if (app) {
            teardownApp(app);
        }
    });

    it('should have Health components', async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        expect(module.get(HealthController)).toBeInstanceOf(HealthController);
    });

    it(`GET /health (200)`, async () => {
        const mongoServer = await MongoMemoryServer.create();

        const config = dummyConfig({
            networkPort: 4000 + 1,
            urlPrefix: '',
            mongoDB: {
                connectionString: mongoServer.getUri(),
                connectionTimeout: 5000,
                databaseName: 'test',
            },
            healthCheck: {
                urlCheck: 'https://www.google.com',
                memoryHeapMaximum: 16_000_000_000,
                memoryRSSMaximum: 16_000_000_000,
                diskSpaceUsed: 0,
                diskSpacePercent: 0,
            },
        });

        const app = await setupApp(config);

        const server = `http://127.0.0.1:${config.networkPort}/`; // app.getHttpAdapter();

        const response = await request(server)
            .get('health')
            .catch((error: Error) => {
                expect(error).toBeFalsy();
                throw error;
            });
        expect(response.status).toBe(200);
        expect(response.header).toBeTruthy();
        expect(response.header['content-type']).toContain('application/json');
        expect(response['text']).toBeTruthy();
        const payload = JSON.parse(String(response['text']));
        expect(payload['status']).toBe('ok');
        expect(payload['details']).not.toBeFalsy();
        expect(payload['info']).not.toBeFalsy();

        await teardownApp(app);
    }, 15000);
});
