import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UsuarioResponse {
    @ApiProperty({ description: 'Codigo HTTP STATUS, 200, 500, 404..' })
    code:    number;
    @ApiProperty({ description: 'Mensagem de retorno do sistema'})
    message: string;
    @ApiProperty({ description: 'Dado retornado pelo sistema, pode ser um usuario ou qualquer coisa.' })
    data:       any; 

    constructor(init?: Partial<UsuarioResponse>) {
        Object.assign(this, init);
        this.code    = init?.code ?? HttpStatus.OK;
        this.message = init?.message ?? '';
        this.data    = init?.data ?? null;
    }
};

export class UsuarioRequest {

    @IsNotEmpty({ message: "Campo username é obrigatório!" })
    @IsString({ message: "Campo username é do tipo string!" })
    @ApiProperty({ description: 'Username do usuario.', example: 'usuario' })
    _username: string;
  
    @IsNotEmpty({ message: "Campo senha é obrigatório!" })
    @IsString({ message: "Campo senha é do tipo string!" })
    @ApiProperty({ description: 'Senha do usuario', example: 'usuario' })
    _senha: string;
  
    constructor(data: Partial<UsuarioRequest>) {
      Object.assign(this, data);
    };

  }
export class UsuarioUpdateRequest {

    @IsOptional()
    @IsString({ message: "Campo username é do tipo string!" })
    @ApiProperty({ description: 'Novo username do usuario', example: 'usuario123' })
    _username: string;

    @IsOptional()
    @IsString({ message: "Campo senha é do tipo string!" })
    @ApiProperty({ description: 'Nova senha pro usuario', example: 'usuario123' })
    _senha: string;

    @IsOptional()
    @IsString({ message: "Campo enabled é do tipo string!" })
    @ApiProperty({ description: 'Desativa ou ativa usuario no sistema. (1 = ativa, 2 = desativa)', example: '1' })
    _enabled: string;
    
    constructor(data: Partial<UsuarioRequest>) {
        Object.assign(this, data);
    };
};