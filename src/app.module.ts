import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsuariosModule } from './usuario/usuario.module';
import { FilmeModule } from './filme/filme.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UsuarioEntity } from './usuario/usuario.entity';
import { FilmeEntity } from './filme/filme.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsuariosModule,
    FilmeModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION || `postgres`,
      host: process.env.TYPEORM_HOST || `localhost`,
      port: process.env.TYPEORM_PORT || 5432,
      username: process.env.TYPEORM_USERNAME || 'postgres',
      password: process.env.TYPEORM_PASSWORD || `admin`,
      database: process.env.TYPEORM_DATABASE || 'teste-mks',
      entities: [UsuarioEntity, FilmeEntity],
      synchronize: true,
    } as TypeOrmModuleOptions),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
  ],
})
export class AppModule {}
