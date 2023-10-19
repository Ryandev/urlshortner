import { HttpServer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import AppModule from '@url/api/app.module';
import {
    ResponseHttpStatusCodePayloads,
    dummyConfig,
    setupApp,
    teardownApp,
} from '../../../jest.util';
import LinkController from './link.controller';
import { LinkService } from './link.service';
const request = require('supertest'); /* import won't work with TS */

describe('Link', () => {
    it('should compile the module', async () => {
        const app = await setupApp(dummyConfig()).catch(_ => null);
        expect(app).toBeTruthy();
        if (app) {
            teardownApp(app);
        }
    });

    it('should have Link components', async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        expect(module.get(LinkController)).toBeInstanceOf(LinkController);
        expect(module.get(LinkService)).toBeInstanceOf(LinkService);
    });

    it(`GET /links (401)`, async () => {
        const config = dummyConfig({
            networkPort: 4000 + 2,
            urlPrefix: '',
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

        const paths = [`link`, 'link/link-id-example'];
        const promises = paths.map(path => _verify401Status(server, path));
        await Promise.all(promises);

        await teardownApp(app);
    }, 5000);
});
