import { Controller, Get, HttpCode, Post , HttpException, Body, ConflictException} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users-create.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


// @ApiTags('Users')
@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}


  // // controlador para la creacion de los usuarios
  // @Post('/create-user')
  // @ApiResponse({status:201, description: 'Usuario creado exitosamente' })
  // @ApiResponse({status:500, description: 'Error en la peticion'})
  // @ApiResponse({status:409, description: 'El correo electrónico ya está registrado.' })
  // createUserController(@Body() createUserDto : createUserDto){
  //   try {
  //     return this.usersService.create(createUserDto)
  //   } catch (error) {
  //     throw error;
  //   }
  // }

}
