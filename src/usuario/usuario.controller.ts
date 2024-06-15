import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsuarioService } from "./usuario.service";
import { UsuarioRequest, UsuarioResponse, UsuarioUpdateRequest } from "./infrastructure/usuario.infra";
import { AuthGuard } from "@nestjs/passport";
import { Public } from "src/auth/constants";

@ApiTags('usuarios')
@Controller('api/v1/usuarios')
//@UseGuards(AuthGuard('jwt'))
export class UsuarioController {
    constructor(private readonly service: UsuarioService) { }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Retorna todos os usuarios cadastrados no sistema' })
    @ApiResponse({ status: HttpStatus.OK, type: UsuarioResponse })
    public async findAll(): Promise<UsuarioResponse> {
        this.log(`UsuarioController :: Iniciando processo de busca de todos os usuarios cadastrados...`);
        let response = await this.service.findAll();
        return response;
    };

   /* @Get(':username')
    async findByUsername(@Param('username') username: string) {
        this.log(`UsuarioController :: Iniciando processo de busca de usuario de username ${username} ...`);
        return await this.service.findUsuarioEntityByUsername(username)
    }*/

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Retorna um usuario por ID.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuario nao encontrado' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Usuario localizado com sucesso', type: UsuarioResponse })
    @ApiResponse({ status: HttpStatus.OK, type: UsuarioResponse })
    public async findById(@Param('id') id: number): Promise<UsuarioResponse> {
        this.log(`UsuarioController :: Iniciando processo de busca de usuario de ID ${id} ...`);
        let response = await this.service.findById(id);
        return response;
    };

    @Post()
    @Public()
    @ApiOperation({ summary: 'Cadastra um usuario no sistema.' })
    @ApiBody({ type: UsuarioRequest, description: 'Objeto para cadastrar um usuario. Exemplo: [inserir exemplo de json aqui]' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Usuario cadastrado com sucesso', type: UsuarioResponse })
    public async save(@Body() request: UsuarioRequest): Promise<UsuarioResponse> {
        this.log(`UsuarioController :: Iniciando processo de registro de um novo usuario...`);
        let response = await this.service.save(request);
        return response;
    };

    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza um usuario no sistema.' })
    @ApiBody({ type: UsuarioUpdateRequest, description: 'Objeto para cadastrar um usuario. Exemplo: [inserir exemplo de json aqui]' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Usuario atualizado com sucesso!', type: UsuarioResponse })
    public async update(@Param('id') id: number, @Body() request: UsuarioUpdateRequest): Promise<UsuarioResponse> {
        this.log(`UsuarioController :: Iniciando processo de atualizacao do usuario de id ${id} ...`);
        let response = await this.service.update(id, request);
        return response;
    };

    @Delete(':id')
    @ApiOperation({ summary: 'Deleta um usuario no sistema.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Manutencão Preventiva deletada com sucesso!', type: UsuarioResponse })
    public async delete(@Param('id') id: number): Promise<UsuarioResponse> {
        this.log(`UsuarioController :: Iniciando processo de exclusao do usuario de ID ${id} ...`);
        let response = await this.service.delete(id);
        return response;
    };

    // Métodos auxiliares (LOG)
    log = (str: string) => new Logger(UsuarioController.name).log(str);
    warn = (str: string) => new Logger(UsuarioController.name).warn(str);
    error = (str: string) => new Logger(UsuarioController.name).error(str);
};