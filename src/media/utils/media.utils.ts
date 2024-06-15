import { Logger } from "@nestjs/common";
import { MediaEntity } from "../media.entity";
import { MediaDTO } from "../dto/media.dto";
import { MediaRequest, MediaUpdateRequest } from "../infrastructure/media.infra";
import { AppUtils } from "src/appUtils/app.utils";

export class MediaUtils {

    public static parseToDTO(data: MediaEntity): MediaDTO {
        this.log('MediaUtils (parseToDTO) :: convertendo entidade para DTO...');

        return new MediaDTO({
            _idMedia: data._idMedia,
            _link: data._link,
            _mediaType: data._mediaType,
            _descricao: data._descricao,
            _dataDeCriacao: data._dataDeCriacao
        });
    };

    public static parseListToDTO(data: MediaEntity[]): MediaDTO[] {
        this.log('MediaUtils (parseListToDTO) :: convertendo lista de entidades para DTO...');
        return data.map(entity => this.parseToDTO(entity));
    };

    public static parseRequestToEntityForSave(data: MediaRequest): MediaEntity {
        this.log('MediaUtils (parseRequestToEntityForSave) :: Convertendo dados do request para entidade ...');

        return new MediaEntity({
            _idMedia: null,
            _link: '',
            _descricao: data._descricao,
            _dataDeCriacao: new Date().toString(),
            // _mediaType: AppUtils.parseStringToMediaType(data._mediaType),
        });
    };

    public static updateEntityDataForUpdate(data: MediaUpdateRequest, entity: MediaEntity): MediaEntity {
        this.log('MediaUtils (updateEntityDataForUpdate) :: Convertendo dados do request para entidade ...');

        return entity;
    };


    // Métodos auxiliares (LOG)
    private static log = (str: string) => new Logger(MediaUtils.name).log(str);
    private static warn = (str: string) => new Logger(MediaUtils.name).warn(str);
    private static error = (str: string) => new Logger(MediaUtils.name).error(str);
};