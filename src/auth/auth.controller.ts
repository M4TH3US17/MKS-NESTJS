import { Body, Controller, Get, HttpCode, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './constants';

@Controller('/api/v1/auth')
export class AuthController {
    constructor (private authService: AuthService){}
    
    @Public()
    @Post("login")
    sigIn(@Body() signInDto: Record<string, any>) {
        console.log("signInDto", signInDto)
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }
}