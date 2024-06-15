import { Body, Controller, HttpStatus, Logger, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MediaService } from "./media.service";
import { MediaRequest, MediaResponse, MediaUpdateRequest } from "./infrastructure/media.infra";

@ApiTags('medias')
@Controller('api/v1/medias')
export class MediaController {
    constructor(private readonly service: MediaService) { };

    @Post()
    @ApiOperation({ summary: 'Cadastra uma media no sistema.' })
    @ApiBody({ type: MediaRequest, description: 'Objeto para cadastrar uma media. Exemplo: [inserir exemplo de json aqui]' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Media cadastrada com sucesso', type: MediaResponse })
    public async save(@Body() request: MediaRequest): Promise<MediaResponse> {
        this.log(`MediaController :: Iniciando processo de registro de uma nova media...`);
        let response = await this.service.save(request);
        return response;
    };

    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza uma media no sistema.' })
    @ApiBody({ type: MediaUpdateRequest, description: 'Objeto para cadastrar uma media. Exemplo: [inserir exemplo de json aqui]' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Media atualizado com sucesso!', type: MediaResponse })
    public async update(@Param('id') id: number, @Body() request: MediaUpdateRequest): Promise<MediaResponse> {
        this.log(`MediaController :: Iniciando processo de atualizacao da media de id ${id} ...`);
        let response = await this.service.update(id, request);
        return response;
    };

    // Métodos auxiliares (LOG)
    log = (str: string) => new Logger(MediaController.name).log(str);
};