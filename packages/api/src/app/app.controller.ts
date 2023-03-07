import { Controller, Get } from '@nestjs/common';
import type { IAppData } from './app.interface';

import type AppService from './app.service';

@Controller()
export default class AppController {
    readonly appService: AppService;

    public constructor(appService: Readonly<AppService>) {
        this.appService = appService;
    }

    @Get()
    public getData(): Readonly<IAppData> {
        return this.appService.getData();
    }
}
