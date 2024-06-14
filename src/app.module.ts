import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsuariosModule } from './usuario/usuario.module';
import { FilmeModule } from './filme/filme.module';
import { UsuarioEntity } from './usuario/usuario.entity';
import { FilmeEntity } from './filme/filme.entity';

@Module({
  imports: [
    UsuariosModule,
    FilmeModule,
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [UsuarioEntity, FilmeEntity],
      synchronize: true,
    } as TypeOrmModuleOptions)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
