import { Body, Controller, Inject, Injectable, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/users-create.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthLogin } from './dto/auth-login.dto';
import { LoginAttempGuard } from './guards/login_attemp.guard';
import { ApiCreateUserResponses, ApiLoginResponses } from './decorators/apiresponsesauth.decorator';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(@Inject(AuthService) private readonly authService: AuthService, ) {}



  //Controller para la creacion de usuarios
  @ApiCreateUserResponses()
  createAuthUserController(@Body() CreateUserDto:CreateUserDto){
    try {
        return this.authService.createAuthUserService(CreateUserDto)
    } catch (error) {
      throw error;
    }
  }


  
  // Controller para el login
  @ApiLoginResponses()
  loginAuthController(@Body() authLogin:AuthLogin){
    try {
        return this.authService.loginAuthService(authLogin)
    } catch (error) {
      throw error;
    }
  }


}
