import { Injectable } from "@nestjs/common";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MediaType } from "./media.enums";

@Injectable()
@Entity({ name: 'media' })
export class MediaEntity {

    @PrimaryGeneratedColumn({ type: 'int', name: 'media_id' })
    _idMedia: number;

    @Column({ nullable: false, name: 's3_key'})
    _link: string;

    @Column({ nullable: true, name: 'descricao', length: 255})
    _descricao: string;

    @Column({ nullable: true, name: 'media_type'})
    _mediaType: MediaType;

    @CreateDateColumn({ name: 'data_de_criacao', nullable: false })
    _dataDeCriacao: string;

    constructor(data: Partial<MediaEntity>) {
        Object.assign(this, data);
    };

    @BeforeInsert()
    public dadosInseridosAutomaticamenteAoSalvar() {
        this._dataDeCriacao = new Date().toString();
    };

};