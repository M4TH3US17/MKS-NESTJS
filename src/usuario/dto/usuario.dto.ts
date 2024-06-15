import { ApiProperty } from "@nestjs/swagger";

export class UsuarioDTO {

    @ApiProperty({ description: 'Identificador do usuário no sistema', example: '1' })
    _idUsuario: number;

    @ApiProperty({ description: 'Nome do usuário', example: 'usuario' })
    _username: string;

    @ApiProperty({ description: 'Email do usuário', example: 'usuario@gmail.com' })
    _email: string;

    @ApiProperty({ description: 'Contato do usuário', example: '+55 (00) 00000-0000' })
    _contact: string;

    @ApiProperty({ description: 'Codigo de checagem pra ver se esta ativado no sistema', example: '0 ou 1' })
    _enabled: string;

    @ApiProperty({ description: 'Informa se eh admin ou usuario', example: '0 ou 1' }) 
    _isAdmin: string;

    @ApiProperty({ description: 'Data de criacao da conta/perfil', example: new Date().toString() }) 
    _dataDeCriacao: string;

    constructor(data: Partial<UsuarioDTO>) {
        Object.assign(this, data);
    };
};