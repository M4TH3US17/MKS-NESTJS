import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationRequest {
  @IsNotEmpty({ message: 'Campo username é obrigatório!' })
  @IsString({ message: 'Campo username é do tipo string!' })
  @ApiProperty({ description: 'username para autenticar no sistema.', example: 'usuario' })
  username: string;

  @IsNotEmpty({ message: 'Campo senha é obrigatório!' })
  @IsString({ message: 'Campo senha é do tipo string!' })
  @ApiProperty({ description: 'senha para autenticar no sistema.', example: 'usuario' })
  senha: string;
}