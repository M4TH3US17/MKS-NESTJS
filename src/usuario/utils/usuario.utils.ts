import { BadRequestException, Logger, NotFoundException } from "@nestjs/common";
import { UsuarioDTO } from "../dto/usuario.dto";
import { UsuarioEntity } from "../usuario.entity";
import { UsuarioRequest, UsuarioUpdateRequest } from "../infrastructure/usuario.infra";
import { IsAdmin, UsuarioEnabled } from "../usuario.enums";
import { AppUtils } from "src/appUtils/app.utils";


export class UsuarioUtils {

    /**
     * Converte uma entidade de usuário para um DTO de usuário.
     * @param data A entidade de usuário a ser convertida.
     * @returns O DTO de usuário correspondente.
     */
    public static parseToDTO(data: UsuarioEntity): UsuarioDTO {
        this.log('UsuarioUtils (parseToDTO) :: convertendo entidade para DTO...');

        return new UsuarioDTO({
            _idUsuario: data._idUsuario,
            _username:  data._username,
            _email:     data._email,
            _contact:   data._contact,
            _enabled:   data._enabled,
            _isAdmin:   data._isAdmin,
            _dataDeCriacao: data._dataDeCriacao
        });
    };

    /**
     * Converte uma lista de entidades de usuário para uma lista de DTOs de usuário.
     * @param data A lista de entidades de usuário a ser convertida.
     * @returns A lista de DTOs de usuário correspondente.
     */
    public static parseListToDTO(data: UsuarioEntity[]): UsuarioDTO[] {
        this.log('UsuarioUtils (parseListToDTO) :: convertendo lista de entidades para DTO...');
        return data.map(entity => this.parseToDTO(entity));
    };

    /**
     * Converte dados de um request em uma entidade de usuário para salvar no banco de dados.
     * @param data Os dados do request a serem convertidos.
     * @returns A entidade de usuário correspondente para salvar.
     * @throws BadRequestException Se os dados do usuário forem inválidos.
     */
    public static parseRequestToEntityForSave(data: UsuarioRequest): UsuarioEntity {
        this.log('UsuarioUtils (parseRequestToEntityForSave) :: Convertendo dados do request para entidade ...');

        this.log('UsuarioUtils :: Verificando se Username esta valido...');
        if (AppUtils.isBlank(data._username))
            throw new BadRequestException('Username Invalido!!');

        this.log('UsuarioUtils :: Verificando se a senha esta valida...');
        if (AppUtils.isBlank(data._senha))
            throw new BadRequestException('Senha Invalida!!');

        this.log(`UsuarioService :: Verificando se o usuario informou o contato ...`);
        if (AppUtils.isBlank(data._contact))
            throw new BadRequestException('Informe o contato!!');

        this.log(`UsuarioService :: Verificando se o usuario repetiu a senha corretamente ...`);
        if(AppUtils.nonEqual(data._senha, data._senhaRepetida))
            throw new BadRequestException('As senhas informadas nao coincidem!');

        return new UsuarioEntity({
            _idUsuario: null,
            _username: data._username,
            _senha:    data._username,
            _contact:  data._contact,
            _email:    data._email,
            _isAdmin:  IsAdmin.FALSE,
            _enabled:  UsuarioEnabled.TRUE,
            _dataDeCriacao: new Date().toString(),
        });
    };

    /**
     * Atualiza uma entidade de usuário com dados do request para atualização no banco de dados.
     * @param data Os dados do request a serem atualizados na entidade.
     * @param entity A entidade de usuário a ser atualizada.
     * @returns A entidade de usuário atualizada.
     */
    public static updateEntityDataForUpdate(data: UsuarioUpdateRequest, entity: UsuarioEntity): UsuarioEntity {
        this.log('UsuarioUtils (updateEntityDataForUpdate) :: Convertendo dados do request para entidade ...');
        const isEnabledZeroOrOne = (data._enabled === "0" || data._enabled === "1");

        if(AppUtils.isEqual(entity._enabled, UsuarioEnabled.TRUE)) {

            if(AppUtils.nonBlank(data._username)) {
                this.log('UsuarioUtils :: Atualizando username...');
                entity.setUsername = data._username;
            };
    
            if(AppUtils.nonBlank(data._senha)) {
                this.log('UsuarioUtils :: Atualizando senha...');
                entity.setSenha = data._senha;
            };
    
            if (AppUtils.nonBlank(data._contact)) {
                this.log('UsuarioUtils :: Atualizando contato...');
                entity._contact = data._contact;
            };
    
            if (AppUtils.nonBlank(data._email)) {
                this.log('UsuarioUtils :: Atualizando email...');
                entity._email = data._email;
            };
    
        };

        if (AppUtils.nonBlank(data._enabled) && isEnabledZeroOrOne) {
            this.log('UsuarioUtils :: Atualizando enabled...');
            entity.setEnabled = data._enabled;
        }

        return entity;
    };

    // Métodos auxiliares (LOG)
    private static log = (str: string) => new Logger(UsuarioUtils.name).log(str);
    private static warn = (str: string) => new Logger(UsuarioUtils.name).warn(str);
    private static error = (str: string) => new Logger(UsuarioUtils.name).error(str);

};