import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsuariosModule } from 'src/usuario/usuario.module';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
@Module({
  imports:[
    UsuariosModule,
    TypeOrmModule.forFeature([UsuarioEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "86400s" }
    })
  ],
  providers: [
    AuthService,
    UsuarioService,
  ],
  controllers: [AuthController],
  exports: [AuthModule]
})
export class AuthModule {}