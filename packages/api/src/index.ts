import { Logger } from '@nestjs/common';
import env from './environment';
import start from './start';

start()
    .then(() => {
        Logger.log(`Serving: http://localhost:${env.networkPort}/${env.urlPrefix}`);
    })
    .catch(error => {
        Logger.error(`Failed to boot, error: ${JSON.stringify(error)}`);
        process.exitCode = -1;
    });
