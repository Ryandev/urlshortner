import { IsOptional, IsString } from 'class-validator';

export class UpdateILinkDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    url: string;

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }
}
