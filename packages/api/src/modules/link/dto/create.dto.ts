import { IsNotEmpty, IsString } from 'class-validator';

export class CreateILinkDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    url: string;

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }
}
