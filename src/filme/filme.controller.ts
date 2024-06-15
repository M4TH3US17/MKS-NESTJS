import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FilmeRequest, FilmeResponse, FilmeUpdateRequest } from "./infrastructure/filme.infra";
import { FilmeService } from "./filme.service";
import { Public } from "src/auth/constants";

@ApiTags('filmes')
@Controller('api/v1/filmes')
export class FilmeController {

    constructor(private readonly service: FilmeService) { }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Retorna todos os filmes cadastrados no sistema' })
    @ApiResponse({ status: HttpStatus.OK, type: FilmeResponse })
    public async findAll(): Promise<FilmeResponse> {
        this.log(`FilmeController :: Iniciando processo de busca de todos os filmes cadastrados...`);
        let response = await this.service.findAll();
        return response;
    };

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Retorna um filme por ID.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Filme nao encontrado' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Filme localizado com sucesso', type: FilmeResponse })
    @ApiResponse({ status: HttpStatus.OK, type: FilmeResponse })
    public async findById(@Param('id') id: number): Promise<FilmeResponse> {
        this.log(`FilmeController :: Iniciando processo de busca de filme de ID ${id} ...`);
        let response = await this.service.findById(id);
        return response;
    };

    @Post()
    @ApiOperation({ summary: 'Cadastra um filme no sistema.' })
    @ApiBody({ type: FilmeRequest, description: 'Objeto para cadastrar um filme. Exemplo: [inserir exemplo de json aqui]' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Filme cadastrado com sucesso', type: FilmeResponse })
    public async save(@Body() request: FilmeRequest): Promise<FilmeResponse> {
        this.log(`FilmeController :: Iniciando processo de registro de um novo filme...`);
        let response = await this.service.save(request);
        return response;
    };

    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza um filme no sistema.' })
    @ApiBody({ type: FilmeUpdateRequest, description: 'Objeto para cadastrar um Filme. Exemplo: [inserir exemplo de json aqui]' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Filme atualizado com sucesso!', type: FilmeResponse })
    public async update(@Param('id') id: number, @Body() request: FilmeUpdateRequest): Promise<FilmeResponse> {
        this.log(`FilmeController :: Iniciando processo de atualizacao do filme de id ${id} ...`);
        let response = await this.service.update(id, request);
        return response;
    };

    @Delete(':id')
    @ApiOperation({ summary: 'Deleta um filme no sistema.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Filme deletadO com sucesso!', type: FilmeResponse })
    public async delete(@Param('id') id: number): Promise<FilmeResponse> {
        this.log(`FilmeController :: Iniciando processo de desativacao do filme de ID ${id} ...`);
        let response = await this.service.delete(id);
        return response;
    };

    // Métodos auxiliares (LOG)
    log = (str: string) => new Logger(FilmeController.name).log(str);
    warn = (str: string) => new Logger(FilmeController.name).warn(str);
    error = (str: string) => new Logger(FilmeController.name).error(str);
};