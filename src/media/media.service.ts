import { BadRequestException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { MediaRequest, MediaResponse, MediaUpdateRequest } from "./infrastructure/media.infra";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { MediaEntity } from "./media.entity";
import { MediaUtils } from "./utils/media.utils";

@Injectable()
export class MediaService {

    constructor(@InjectRepository(MediaEntity) private readonly repository: Repository<MediaEntity>) { }

    public async save(request: MediaRequest): Promise<MediaResponse> {
        this.log(`MediaService :: Iniciando processo de persistencia no banco de dados ...`);
        const media = MediaUtils.parseRequestToEntityForSave(request);

        this.log(`MediaService : Salvando media no banco de dados ...`);
        const mediaSalva = await this.repository.save(media);

        this.log(`MediaService : Retornando media para o client-side ...`);
        return new MediaResponse({
            code: HttpStatus.OK,
            message: "Media salva com sucesso!",
            data: MediaUtils.parseToDTO(mediaSalva),
        });
    };

    public async update(id: number, request: MediaUpdateRequest): Promise<MediaResponse> {
        this.log(`MediaService :: Iniciando processo de atualizacao no banco de dados ...`);
        this.log(`MediaService :: Buscado usuario de ID ${id} na base de dados ...`);

        const options: FindOneOptions = {where: { id: id }};
        const mediaDoBanco = await this.repository.findOne(options);

        if(!mediaDoBanco) 
            throw new BadRequestException(`Usuario de ID ${id} nao encontrado na base de dados!`);

        this.log(`MediaService :: Media encontrado na base de dados!!`);
        this.log(`MediaService :: Atualizando no banco de dados ...`);
        const mediaAtualizado = await this.repository.save(MediaUtils.updateEntityDataForUpdate(request, mediaDoBanco));

        return new MediaResponse({
            code: HttpStatus.OK,
            message: "Media atualizada com sucesso!",
            data: MediaUtils.parseToDTO(mediaAtualizado),
        });
    };

    // Métodos auxiliares (LOG)
    log = (str: string) => new Logger(MediaService.name).log(str);

};