import { HttpServer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import AppModule from '@url/api/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {
    ResponseHttpStatusCodePayloads,
    dummyConfig,
    setupApp,
    teardownApp,
} from '../../../jest.util';
import { UserController } from './user.controller';
import { UserService } from './user.service';
const request = require('supertest'); /* import won't work with TS */

describe('Link', () => {
    it('should compile the module', async () => {
        const app = await setupApp(dummyConfig()).catch(_ => null);
        expect(app).toBeTruthy();
        if (app) {
            teardownApp(app);
        }
    });

    it('should have User components', async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        expect(module.get(UserController)).toBeInstanceOf(UserController);
        expect(module.get(UserService)).toBeInstanceOf(UserService);
    });

    it(`GET /user (400)`, async () => {
        const mongoServer = await MongoMemoryServer.create();

        const config = dummyConfig({
            networkPort: 4000 + 3,
            urlPrefix: '',
            mongoDB: {
                connectionString: mongoServer.getUri(),
                connectionTimeout: 5000,
                databaseName: 'test',
            },
        });

        const app = await setupApp(config);

        const server = `http://127.0.0.1:${config.networkPort}/`; // app.getHttpAdapter();

        async function _verify401Status(
            server: HttpServer<any, any> | string,
            path: string,
        ) {
            const response = await request(server)
                .get(path)
                .catch((error: Error) => {
                    expect(error).toBeFalsy();
                    throw error;
                });
            expect(response.status).toBe(401);
            expect(response.header).toBeTruthy();
            expect(response.header['content-type']).toContain('application/json');
            expect(response['text']).toBeTruthy();
            const payload = JSON.parse(String(response['text']));
            expect(payload).toMatchObject(ResponseHttpStatusCodePayloads[401]);
        }

        const paths = [`user`, 'user/profile', 'user/link-id-example'];
        const promises = paths.map(path => _verify401Status(server, path));
        await Promise.all(promises);

        await teardownApp(app);
    }, 15000);
});
