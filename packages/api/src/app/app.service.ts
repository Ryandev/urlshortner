import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
    getData(): { message: string } {
        return { message: `${this} Welcome to api!` };
    }
}
