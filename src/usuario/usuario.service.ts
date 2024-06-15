import { BadRequestException, HttpStatus, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioRequest, UsuarioResponse, UsuarioUpdateRequest } from "./infrastructure/usuario.infra";
import { UsuarioUtils } from "./utils/usuario.utils";

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity) private readonly repository: Repository<UsuarioEntity>,
    ) { }

    public async findAll(): Promise<UsuarioResponse> {
        this.log(`UsuarioService :: Buscando todos os usuarios cadastrados no banco...`);
        const data = await this.repository.find();

        return new UsuarioResponse({
            code: HttpStatus.OK,
            message: "Segue as lista de usuarios encontrados!",
            data: UsuarioUtils.parseListToDTO(data)
        });
    };

    public async findUsuarioEntityByUsername(username: string): Promise<UsuarioEntity> {
        this.log(`UsuarioService :: Buscando na base de dados o usuario de username ${username}...`);
        const usuario = await this.repository.findOne({ where: { _username: username } });

        if (!usuario) throw new NotFoundException(`Usuário com username ${username} não encontrado`);

        this.log(`UsuarioService :: Usuario encontrado`);

        return usuario;
      }

    public async findById(id: number): Promise<UsuarioResponse> {
        this.log(`UsuarioService :: Buscando usuario de ID ${id} ...`);
        const options: FindOneOptions = { where: { id } };
        const data = await this.repository.findOne(options)

        return new UsuarioResponse({
            code: HttpStatus.OK,
            message: "Segue as lista de usuarios encontrados!",
            data: UsuarioUtils.parseToDTO(data)
        });
    };

    public async save(request: UsuarioRequest): Promise<UsuarioResponse> {
        this.log(`UsuarioService :: Iniciando processo de persistencia no banco de dados ...`);
        const usuario = UsuarioUtils.parseRequestToEntityForSave(request);

        this.log(`UsuarioService : Salvando usuario no banco de dados ...`);
        const usuarioSalvo = await this.repository.save(usuario);

        this.log(`UsuarioService : Retornando usuario para o client-side ...`);
        return new UsuarioResponse({
            code: HttpStatus.OK,
            message: "Usuario Salvo com sucesso!",
            data: UsuarioUtils.parseToDTO(usuarioSalvo)
        });
    };

    public async update(id: number, request: UsuarioUpdateRequest): Promise<UsuarioResponse> {
        this.log(`UsuarioService :: Iniciando processo de atualizacao no banco de dados ...`);
        this.log(`UsuarioService :: Buscado usuario de ID ${id} na base de dados ...`);

        const options: FindOneOptions = {where: { id: id }};
        const usuarioDoBanco = await this.repository.findOne(options);

        if(usuarioDoBanco === undefined || usuarioDoBanco === null) {
            throw new BadRequestException(`Usuario de ID ${id} nao encontrado na base de dados!`);
        };

        this.log(`UsuarioService :: Usuario encontrado na base de dados!!`);
        this.log(`UsuarioService :: Atualizando no banco de dados ...`);
        const usuarioAtualizado = await this.repository.save(UsuarioUtils.updateEntityDataForUpdate(request, usuarioDoBanco));

        return new UsuarioResponse({
            code: HttpStatus.OK,
            message: "Segue as lista de usuarios encontrados!",
            data: UsuarioUtils.parseToDTO(usuarioAtualizado)
        });
    };

    public async delete(id: number): Promise<UsuarioResponse> {
        this.log(`UsuarioService :: Deletando usuario de ID ${id} ...`);

        const options: FindOneOptions = {where: { id: id }};
        const usuarioDoBanco = await this.repository.findOne(options);

        if(usuarioDoBanco === undefined || usuarioDoBanco === null) {
            throw new BadRequestException(`Usuario de ID ${id} nao encontrado na base de dados!`);
        };

        usuarioDoBanco.setEnabled = '0';
        
        return  new UsuarioResponse({
            code: HttpStatus.OK,
            message: "Usuario desativado com sucesso!"
        });
    };

    // Métodos auxiliares (LOG)
    log = (str: string) => new Logger(UsuarioService.name).log(str);
    warn = (str: string) => new Logger(UsuarioService.name).warn(str);
    error = (str: string) => new Logger(UsuarioService.name).error(str);
};