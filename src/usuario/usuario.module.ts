import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioService } from "./usuario.service";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioController } from "./usuario.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioService],
    exports: [UsuarioService],
  })
  export class UsuariosModule {}