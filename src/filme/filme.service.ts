import { BadRequestException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilmeEntity } from "./filme.entity";
import { FindOneOptions, Repository } from "typeorm";
import { FilmeRequest, FilmeResponse, FilmeUpdateRequest } from "./infrastructure/filme.infra";
import { FilmeUtils } from "./utils/filme.utils";

@Injectable()
export class FilmeService {

    constructor(
        @InjectRepository(FilmeEntity) private readonly repository: Repository<FilmeEntity>,
    ) { }

    public async findAll(): Promise<FilmeResponse> {
        this.log(`FilmeService :: Buscando todos os filmes cadastrados no banco...`);
        const data = await this.repository.find();

        return new FilmeResponse({
            code: HttpStatus.OK,
            message: "Segue as lista de filmes encontrados!",
            data: FilmeUtils.parseListToDTO(data)
        });
    };

    public async findById(id: number): Promise<FilmeResponse> {
        this.log(`FilmeService :: Buscando filme de ID ${id} ...`);
        const options: FindOneOptions = { where: { id } };
        const data = await this.repository.findOne(options)

        return new FilmeResponse({
            code: HttpStatus.OK,
            message: "Segue as lista de filmes encontrados!",
            data: FilmeUtils.parseToDTO(data)
        });
    };

    public async save(request: FilmeRequest): Promise<FilmeResponse> {
        this.log(`FilmeService :: Iniciando processo de persistencia no banco de dados ...`);

        const filme = FilmeUtils.parseRequestToEntityForSave(request);

        return new FilmeResponse({
            code: HttpStatus.OK,
            message: "Segue as lista de filmes encontrados!",
            data: FilmeUtils.parseToDTO(filme)
        });
    };

    public async update(id: number, request: FilmeUpdateRequest): Promise<FilmeResponse> {
        this.log(`FilmeService :: Iniciando processo de atualizacao no banco de dados ...`);
        this.log(`FilmeService :: Buscado filme de ID ${id} na base de dados ...`);

        const options: FindOneOptions = {where: { id: id }};
        const filmeDoBanco = await this.repository.findOne(options);

        if(filmeDoBanco === undefined || filmeDoBanco === null) {
            throw new BadRequestException(`Filme de ID ${id} nao encontrado na base de dados!`);
        };

        this.log(`FilmeService :: Filme encontrado na base de dados!!`);
        this.log(`FilmeService :: Atualizando no banco de dados ...`);
        const filmeAtualizado = await this.repository.save(FilmeUtils.updateEntityDataForUpdate(request, filmeDoBanco));

        return new FilmeResponse({
            code: HttpStatus.OK,
            message: "Segue as lista de filmes encontrados!",
            data: FilmeUtils.parseToDTO(filmeAtualizado)
        });
    };

    public async delete(id: number): Promise<FilmeResponse> {
        this.log(`FilmeService :: Deletando filme de ID ${id} ...`);

        const options: FindOneOptions = {where: { id: id }};
        const filmeDoBanco = await this.repository.findOne(options);

        if(filmeDoBanco === undefined || filmeDoBanco === null) {
            throw new BadRequestException(`Filme de ID ${id} nao encontrado na base de dados!`);
        };

        filmeDoBanco.setEnabled = '0';
        
        return  new FilmeResponse({
            code: HttpStatus.OK,
            message: "Filme desativado com sucesso!"
        });
    };

    // Métodos auxiliares (LOG)
    log = (str: string) => new Logger(FilmeService.name).log(str);
    warn = (str: string) => new Logger(FilmeService.name).warn(str);
    error = (str: string) => new Logger(FilmeService.name).error(str);

}