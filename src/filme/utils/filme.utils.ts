import { BadRequestException, Logger } from "@nestjs/common";
import { FilmeDTO } from "../dto/filme.dto";
import { FilmeEntity } from "../filme.entity";
import { FilmeRequest, FilmeUpdateRequest } from "../infrastructure/filme.infra";

export class FilmeUtils {

    public static parseToDTO(data: FilmeEntity): FilmeDTO {
        this.log('FilmeUtils :: convertendo entidade para DTO...');

        return new FilmeDTO({
            _idFilme: data.getIdFilme,
            _nome: data.getNome,
            _descricao: data.getDescricao,
            _enabled: data.getEnabled,
            _dataDeAtualizacao: data.getDataDeAtualizacao,
            _dataDeCriacao: data.getDataDeCriacao
        });
    };

    public static parseListToDTO(data: FilmeEntity[]): FilmeDTO[] {
        this.log('FilmeUtils :: convertendo lista de entidades para DTO...');
        return data.map(entity => this.parseToDTO(entity));
    };

    public static parseRequestToEntityForSave(data: FilmeRequest): FilmeEntity {
        this.log('FilmeUtils :: Convertendo dados do request para entidade (salvar)...');

        this.log('FilmeUtils :: Verificando se Nome esta valido...');
        if (data._nome.trim() === '' || data._nome === undefined) throw new BadRequestException('Nome Invalido!!')

        return new FilmeEntity({
            _idFilme: undefined,
            _nome: data._nome,
            _enabled: '1',
            _descricao: data._descricao,
            //media
            _dataDeCriacao: new Date().toString(),
            _dataDeAtualizacao: new Date().toString()
        });
    };

    public static updateEntityDataForUpdate(data: FilmeUpdateRequest, entity: FilmeEntity): FilmeEntity {
        this.log('FilmeUtils :: Convertendo dados do request para entidade (atualizar)...');
        const enabledIsValid = (data._enabled !== null && data._enabled !== undefined) && (data._enabled === "0" || data._enabled === "1") && data._enabled.trim() !== '';

        if(enabledIsValid) {
            this.log('FilmeUtils :: Atualizando enabled do filme...');
            entity.setEnabled = data._enabled;
        }
        
        if(data._nome.trim() !== '' && data._nome !== undefined) {
            this.log('FilmeUtils :: Atualizando nome do filme...');
            entity.setNome = data._nome;
        };

        if(data._descricao.trim() !== '' && data._descricao !== undefined) {
            this.log('FilmeUtils :: Atualizando descricao do filme...');
            entity.setDescricao = data._descricao;
        };

        entity.setDataDeAtualizacao = new Date().toString();

        return entity;
    };

    // Métodos auxiliares (LOG)
    private static log = (str: string) => new Logger(FilmeUtils.name).log(str);
    private static warn = (str: string) => new Logger(FilmeUtils.name).warn(str);
    private static error = (str: string) => new Logger(FilmeUtils.name).error(str);
};