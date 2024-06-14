import { BadRequestException, Injectable } from "@nestjs/common";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Injectable()
@Entity({ name: 'filmes' })
export class FilmeEntity {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'filme_id' })
    public _idFilme: number;

    @Column({ name: 'nome', nullable: false })
    public _nome: string;

    @Column({ name: 'descricao', nullable: false, length: 255 })
    public _descricao: string;

    @Column({ name: `enabled`, nullable: false, default: "1", type: "bit" })
    public _enabled: string;

    // @ManyToOne(type => Media) // Uncomment and adjust if Media is another entity
    // media: Media;

    @CreateDateColumn({ name: 'data_de_criacao', nullable: false })
    public _dataDeCriacao: string;

    @Column({ name: 'data_de_atualizacao', length: 255, nullable: true })
    public _dataDeAtualizacao: string;

    constructor(data: Partial<FilmeEntity>) {
        Object.assign(this, data);
    }

    // Setters
    set setIdFilme(id: number) {
        this._idFilme = id;
    }

    set setNome(nome: string) {
        if(nome.trim() === "" || nome === undefined)
             throw new BadRequestException('Filme deve possuir um nome valido!');

        this._nome = nome;
    }

    set setDescricao(descricao: string) {
        this._descricao = descricao;
    }

    set setEnabled(enabled: string) {
        if(enabled.trim() === "" || enabled === undefined)  
            throw new BadRequestException('Enabled invalido!');
        if(enabled !== '0' && enabled !== '1') 
            throw new BadRequestException('Enabled deve ser 1 (verdadeiro) ou 0 (falso)!');

        this._enabled = enabled;
    }

    set setDataDeCriacao(data: string) {
        this._dataDeCriacao = data;
    }

    set setDataDeAtualizacao(data: string) {
        this._dataDeAtualizacao = new Date().toString();
    }

    // Getters
    get getIdFilme(): number {
        return this._idFilme;
    }

    get getNome(): string {
        return this._nome;
    }

    get getDescricao(): string {
        return this._descricao;
    }

    get getEnabled(): string {
        return this._enabled;
    }

    get getDataDeCriacao(): string {
        return this._dataDeCriacao;
    }

    get getDataDeAtualizacao(): string {
        return this._dataDeAtualizacao;
    }

}