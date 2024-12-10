import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/users-create.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthLogin } from './dto/auth-login.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService, ) {}



  //Controller para la creacion de usuarios
  @ApiResponse({status:201, description: 'Usuario creado exitosamente' })
  @ApiResponse({status:500, description: 'Error en la peticion'})
  @ApiResponse({status:409, description: 'El usuario ya se encuentra registrado.' })
  @Post('create-user')
  createAuthUserController(@Body() CreateUserDto:CreateUserDto){
    try {
        return this.authService.createAuthUserService(CreateUserDto)
    } catch (error) {
      throw error;
    }
  }


  
  // Controller para el login
  @ApiResponse({status:200, description: 'login correcto' })
  @ApiResponse({status:500, description: 'error en la peticion'})
  @ApiResponse({status:400, description: 'envio incorrecto de los datos' })
  @ApiResponse({status:401, description: 'usuario o contraseña incorrecta'})
  @Post('login')
  loginAuthController(@Body() authLogin:AuthLogin){
    try {
        return this.authService.loginAuthService(authLogin)
    } catch (error) {
      throw error;
    }
  }


}
