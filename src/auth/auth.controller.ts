import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signupdto";
import { LoginDto } from "./dto/logindto";

@Controller('auth')
@ApiTags('Authentication')
export class AuthController{
    constructor(private authService: AuthService){}


    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{token : string}>{
        return this.authService.signUp(signUpDto);
    }

    @Post('/login')
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'Successful Login'})
    login(@Body() loginDto: LoginDto): Promise<{token : string}>{
        return this.authService.login(loginDto);
    }
}
