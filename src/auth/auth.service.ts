import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor (
        private userServices: UsuarioService,
        private jwtService: JwtService
        ) {}
    
    async signIn(username: string, password: string): Promise<any> {

        const user = await this.userServices.findUsuarioEntityByUsername(username);
        console.log(user)

        if (!user/* || user._senha !== password*/) {
            throw new ForbiddenException({
              message: 'Usuário ou senha inválidos.',
            });
          }
        
        const payload = { 
            id: user._idUsuario, 
            username: user._username,
            is_admin: user._isAdmin
        }
        console.log(payload)
        return {
            access_token: await this.jwtService.signAsync(payload),
            data: payload
        }
     
    }
}