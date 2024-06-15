import { Body, Controller, Get, HttpCode, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './constants';
import { AuthenticationRequest } from './infrastructure/auth.infra';

@Controller('/api/v1/auth')
export class AuthController {
    constructor (private authService: AuthService){}
    
    @Public()
    @Post("login")
    sigIn(@Body() request: AuthenticationRequest) {
        console.log("request", request)
        return this.authService.signIn(request.username, request.senha);
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }
}