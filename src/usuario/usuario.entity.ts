import { BadRequestException, Injectable } from "@nestjs/common";
import { hashSync } from 'bcrypt';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsAdmin, UsuarioEnabled } from "./usuario.enums";
import { AppUtils } from "src/appUtils/app.utils";
import { use } from "passport";

@Injectable()
@Entity({ name: 'usuarios' })
export class UsuarioEntity {

    @PrimaryGeneratedColumn({ type: 'int', name: 'usuario_id' })
    _idUsuario: number;

    @Column({ nullable: false, name: 'username'})
    _username: string;

    @Column({ nullable: false, name: 'senha'})
    _senha: string;

    @Column({ nullable: false, name: 'contato'})
    _contact: string;

    @Column({ nullable: true, name: 'email'})
    _email: string;

    @Column({ nullable: false, default: UsuarioEnabled.TRUE, type: "bit", name: 'enabled'})
    _enabled: string;

    @Column({ nullable: false, default: IsAdmin.FALSE, type: "bit", name: 'is_admin'})
    _isAdmin: string;

    @CreateDateColumn({ name: 'data_de_criacao', nullable: false })
    _dataDeCriacao: string;

    constructor(data: Partial<UsuarioEntity>) {
        Object.assign(this, data);
    };

    @BeforeInsert()
    public dadosInseridosAutomaticamenteAoSalvar() {
        this._senha = hashSync(this._senha, 10);
        this._dataDeCriacao = new Date().toString();
    };

    // Setters
    set setIdUsuario(id: number) {
        this._idUsuario = id;
    };

    set setUsername(username: string) {
        if(AppUtils.isBlank(username)) 
            throw new BadRequestException('Username invalido!');

        this._username = username;
    };

    set setSenha(senha: string) {
        if(AppUtils.isBlank(senha))
            throw new BadRequestException('Senha invalida!');

        this._senha = senha;
    };

    set setEnabled(enabled: string) {
        if(AppUtils.isBlank(enabled))
            throw new BadRequestException('Enabled invalido!');

        if(enabled !== '0' && enabled !== '1') 
            throw new BadRequestException('Enabled deve ser 1 (verdadeiro) ou 0 (falso)!');

        this._enabled = enabled;
    };

    set setIsAdmin(isAdmin: string) {
        if(AppUtils.isBlank(isAdmin))
            throw new BadRequestException('Enabled invalido!');

        if(isAdmin !== '0' && isAdmin !== '1') 
            throw new BadRequestException('isAdmin deve ser 1 (verdadeiro) ou 0 (falso)!');

        this._isAdmin = isAdmin;
    };

    set setEmail(email: string) {
        // CRIAR REGEX EM AppUtils PARA VALIDAR EMAIL
        this._email = email;
    };

    set setContact(contact: string) {
        if(AppUtils.isBlank(contact))
            throw new BadRequestException('Contato invalido!');
        
        // CRIAR REGEX EM AppUtils PARA VALIDAR CONTATO
        this._contact = contact;
    }
};