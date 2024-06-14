import { HttpStatus } from "@nestjs/common";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class FilmeResponse {
    code:    number;
    message: string;
    data:       any; 

    constructor(init?: Partial<FilmeResponse>) {
        Object.assign(this, init);
        this.code    = init?.code ?? HttpStatus.OK;
        this.message = init?.message ?? '';
        this.data    = init?.data ?? null;
    }
};

export class FilmeRequest {
    @IsNotEmpty({ message: "Campo nome é obrigatório!" })
    @IsString({ message: "Campo nome é do tipo string!" })
    _nome: string;

    @IsNotEmpty({ message: "Campo descricao é obrigatório!" })
    @IsString({ message: "Campo descricao é do tipo string!" })
    _descricao: string;

    //media
};

export class FilmeUpdateRequest {

    @IsOptional()
    @IsString({ message: "Campo nome é do tipo string!" })
    _nome: string;

    @IsOptional()
    @IsString({ message: "Campo descricao é do tipo string!" })
    _descricao: string;

    @IsOptional()
    @IsString({ message: "Campo enabled é do tipo string!" })
    _enabled: string;

    //media
};