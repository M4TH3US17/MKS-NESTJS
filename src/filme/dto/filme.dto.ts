import { ApiProperty } from "@nestjs/swagger";

export class FilmeDTO {

    @ApiProperty({ description: 'Identificador do filme no sistema', example: '1' })
    _idFilme: number;

    @ApiProperty({ description: 'Nome do filme', example: 'A Volta Dos Que Nao Foram' })
    _nome: string;

    @ApiProperty({ description: 'Descricao do filme' })
    _descricao: string;

    @ApiProperty({ description: 'Enabled do filme no sistema', example: '0 (desativado) ou 1 (ativado)' })
    _enabled: string;
    
    //media

    @ApiProperty({ description: 'Data de cricao do filme', example: new Date().toString()})
    _dataDeCriacao: string;

    @ApiProperty({ description: 'Data de atualizacao do filme', example: new Date().toString()})
    _dataDeAtualizacao: string;

    constructor(data: Partial<FilmeDTO>) {
        Object.assign(this, data);
    };
    
};
