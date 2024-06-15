import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MediaType } from "express";

export class MediaResponse {
    code: number;
    message: string;
    data: any;

    constructor(init?: Partial<MediaResponse>) {
        Object.assign(this, init);
        this.code = init?.code ?? HttpStatus.OK;
        this.message = init?.message ?? '';
        this.data = init?.data ?? null;
    }
};

export class MediaRequest {
    
    @IsString({ message: "Campo Base64 é do tipo string!" })
    @IsNotEmpty({ message: "Campo Base64 é obrigatório!" })
    _base64: string;

    @IsOptional()
    @IsString({ message: "Campo descricao é do tipo string!" })
    _descricao: string;

    /*@IsNotEmpty({ message: "Campo media type é obrigatório!" })
    @IsString({ message: "Campo media type é do tipo string!" })
    _mediaType: string;*/

    constructor(data: Partial<MediaRequest>) {
        Object.assign(this, data);
    };

};

export class MediaUpdateRequest {

    @IsString({ message: "Campo Base64 é do tipo string!" })
    @IsNotEmpty({ message: "Campo Base64 é obrigatório!" })
    _base64: string;

    @IsOptional()
    @IsString({ message: "Campo descricao é do tipo string!" })
    _descricao: string;

    /*@IsOptional()
    @IsString({ message: "Campo media type é do tipo string!" })
    _mediaType: string;*/

    constructor(data: Partial<MediaUpdateRequest>) {
        Object.assign(this, data);
    };

};