import { Controller, Get } from '@nestjs/common';

import AppService from './app.service';

@Controller()
export default class AppController {
    constructor(private readonly appService: AppService) {
        this.appService = appService;
    }

    @Get()
    getData() {
        return this.appService.getData();
    }
}
