import { Logger } from '@nestjs/common';
import configuration from './configuration';
import start from './start';

start()
    .then(() => {
        const settings = configuration.load();
        Logger.log(`Serving localhost:${settings.networkPort}/${settings.urlPrefix}`);
    })
    .catch(error => {
        Logger.error(`Failed to run, error occurred: ${JSON.stringify(error)}`);
        process.exitCode = -1;
        throw error;
    });
