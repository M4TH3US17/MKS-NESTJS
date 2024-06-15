import { ApiProperty } from "@nestjs/swagger";
import { MediaType } from "express";

export class MediaDTO {

    @ApiProperty({ description: 'Identificador do usuário no sistema', example: '1' })
    _idMedia: number;

    @ApiProperty({ description: 'Link AWS referente ao arquivo.' })
    _link: string;

    @ApiProperty({ description: 'Descricao do arquivo, video ou imagem.' })
    _descricao: string;

    @ApiProperty({ description: 'Tipo de arquivo salvo (Imagem, Video ou Arquivo)' })
    _mediaType: string;

    @ApiProperty({ description: 'Data de cricao da Media.' })
    _dataDeCriacao: string;
    
    constructor(data: Partial<MediaDTO>) {
        Object.assign(this, data);
    };

};