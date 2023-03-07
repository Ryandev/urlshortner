import { Injectable } from '@nestjs/common';
import type { IAppData } from './app.interface';

@Injectable()
export default class AppService {
    public getData(): IAppData {
        return { message: `AppService:${JSON.stringify(this)} Welcome to api!` };
    }
}
