import { TypeOrmModule } from "@nestjs/typeorm";
import { FilmeController } from "./filme.controller";
import { FilmeService } from "./filme.service";
import { FilmeEntity } from "./filme.entity";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([FilmeEntity])],
    controllers: [FilmeController],
    providers: [FilmeService],
    exports: [FilmeService],
  })
  export class FilmeModule {}