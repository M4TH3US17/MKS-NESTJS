import { BadRequestException, Logger } from "@nestjs/common";
import { UsuarioDTO } from "../dto/usuario.dto";
import { UsuarioEntity } from "../usuario.entity";
import { UsuarioRequest, UsuarioUpdateRequest } from "../infrastructure/usuario.infra";
import { IsAdmin, UsuarioEnabled } from "../enums/usuario.enum";


export class UsuarioUtils {

    /**
     * Converte uma entidade de usuário para um DTO de usuário.
     * @param data A entidade de usuário a ser convertida.
     * @returns O DTO de usuário correspondente.
     */
    public static parseToDTO(data: UsuarioEntity): UsuarioDTO {
        this.log('UsuarioUtils :: convertendo entidade para DTO...');

        return new UsuarioDTO({
            _idUsuario: data._idUsuario,
            _username: data._username,
            _enabled: data._enabled,
            _isAdmin: data._isAdmin,
            _dataDeCriacao: data._dataDeCriacao
        });
    };

    /**
     * Converte uma lista de entidades de usuário para uma lista de DTOs de usuário.
     * @param data A lista de entidades de usuário a ser convertida.
     * @returns A lista de DTOs de usuário correspondente.
     */
    public static parseListToDTO(data: UsuarioEntity[]): UsuarioDTO[] {
        this.log('UsuarioUtils :: convertendo lista de entidades para DTO...');
        return data.map(entity => this.parseToDTO(entity));
    };

    /**
     * Converte dados de um request em uma entidade de usuário para salvar no banco de dados.
     * @param data Os dados do request a serem convertidos.
     * @returns A entidade de usuário correspondente para salvar.
     * @throws BadRequestException Se os dados do usuário forem inválidos.
     */
    public static parseRequestToEntityForSave(data: UsuarioRequest): UsuarioEntity {
        this.log('UsuarioUtils :: Convertendo dados do request para entidade (salvar)...');

        this.log('UsuarioUtils :: Verificando se Username esta valido...');
        if (data._username.trim() === '' || data._username === undefined)
            throw new BadRequestException('Username Invalido!!')

        this.log('UsuarioUtils :: Verificando se a senha esta valida...');
        if (data._senha.trim() === '' || data._senha === undefined)
            throw new BadRequestException('Senha Invalida!!')

        return new UsuarioEntity({
            _idUsuario: null,
            _username: data._username,
            _senha: data._username,
            _isAdmin: IsAdmin.FALSE,
            _enabled: UsuarioEnabled.TRUE,
            _dataDeCriacao: new Date().toString()
        });
    };

    /**
     * Atualiza uma entidade de usuário com dados do request para atualização no banco de dados.
     * @param data Os dados do request a serem atualizados na entidade.
     * @param entity A entidade de usuário a ser atualizada.
     * @returns A entidade de usuário atualizada.
     */
    public static updateEntityDataForUpdate(data: UsuarioUpdateRequest, entity: UsuarioEntity): UsuarioEntity {
        this.log('UsuarioUtils :: Convertendo dados do request para entidade (atualizar)...');
        const enabledIsValid = (data._enabled !== null && data._enabled !== undefined) && (data._enabled === "0" || data._enabled === "1") && data._enabled.trim() !== '';

        if(data._username.trim() !== '' && data._username !== undefined) {
            this.log('UsuarioUtils :: Atualizando username...');
            entity.setUsername = data._username;
        };

        if(data._senha.trim() !== '' && data._senha !== undefined) {
            this.log('UsuarioUtils :: Atualizando senha...');
            //criptografar senha
            entity.setSenha = data._senha;
        };

        if (enabledIsValid) {
            this.log('UsuarioUtils :: Atualizando Enabled...');
            entity.setEnabled = data._enabled;
        }

        return entity;
    };

    // Métodos auxiliares (LOG)
    private static log = (str: string) => new Logger(UsuarioUtils.name).log(str);
    private static warn = (str: string) => new Logger(UsuarioUtils.name).warn(str);
    private static error = (str: string) => new Logger(UsuarioUtils.name).error(str);
};