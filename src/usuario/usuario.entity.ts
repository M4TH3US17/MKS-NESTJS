import { BadRequestException, Injectable } from "@nestjs/common";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Injectable()
@Entity({ name: 'usuarios' })
export class UsuarioEntity {

    @PrimaryGeneratedColumn({ type: 'int', name: 'usuario_id' })
    _idUsuario: number;

    @Column({ nullable: false , name: 'username'})
    _username: string;

    @Column({ nullable: false , name: 'senha'})
    _senha: string;

    @Column({ nullable: false, default: "1", type: "bit", name: 'enabled'})
    _enabled: string;

    @Column({ nullable: false, default: "0", type: "bit", name: 'is_admin'})
    _isAdmin: string;

    @CreateDateColumn({ name: 'data_de_criacao', nullable: false })
    _dataDeCriacao: string;

    constructor(data: Partial<UsuarioEntity>) {
        Object.assign(this, data);
    };

    // Setters
    set setIdUsuario(id: number) {
        this._idUsuario = id;
    }

    set setUsername(username: string) {
        if(username.trim() === "" || username === undefined) {
            throw new BadRequestException('Username invalido!');
        };

        this._username = username;
    }

    set setSenha(senha: string) {
        if(senha.trim() === "" || senha === undefined)
            throw new BadRequestException('Senha invalida!');

        this._senha = senha;
    }

    set setEnabled(enabled: string) {
        if(enabled.trim() === "" || enabled === undefined)
            throw new BadRequestException('Enabled invalido!');

        if(enabled !== '0' && enabled !== '1') 
            throw new BadRequestException('Enabled deve ser 1 (verdadeiro) ou 0 (falso)!');

        this._enabled = enabled;
    }

    set setIsAdmin(isAdmin: string) {
        if(isAdmin.trim() === "" || isAdmin === undefined)
            throw new BadRequestException('Enabled invalido!');

        if(isAdmin !== '0' && isAdmin !== '1') 
            throw new BadRequestException('isAdmin deve ser 1 (verdadeiro) ou 0 (falso)!');

        this._isAdmin = isAdmin;
    }

    set setDataDeCriacao(data: string) {
        this._dataDeCriacao = data;
    }

    // Getters
    get getIdUsuario(): number {
        return this._idUsuario;
    }

    get getUsername(): string {
        return this._username;
    }

    get getSenha(): string {
        return this._senha;
    }

    get getEnabled(): string {
        return this._enabled;
    }

    get getIsAdmin(): string {
        return this._isAdmin;
    }

    get getDataDeCriacao(): string {
        return this._dataDeCriacao;
    }

};