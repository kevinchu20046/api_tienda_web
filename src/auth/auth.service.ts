import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/users-create.dto';
import { UsersService } from 'src/users/users.service';
import { AuthLogin } from './dto/auth-login.dto';
import { Argon2Service } from 'src/argon2/argon2.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @Inject(UsersService) private readonly usersService: UsersService,
        @Inject(Argon2Service) private readonly argon2Service: Argon2Service,
        @Inject(JwtService) private readonly jwtService: JwtService
    ){}

    // Servicio para la creacion de clientes
    createAuthUserService(createUserDto:CreateUserDto){
        try {
            return this.usersService.createUsersService(createUserDto)
        } catch (error) {
            throw error
        }
    }
    
    // Servicio para iniciar sesion 
    async loginAuthService(authLogin:AuthLogin){
        try {
            
            const { email, password } = authLogin
            const finduser = await this.usersService.findUser({email_user:email})

            if(!finduser) throw new UnauthorizedException('Usuario o contraseña incorrecta')

            const checkpassword = await this.argon2Service.verificarPassword(finduser.password,password)

            if(!checkpassword) throw new UnauthorizedException('Usuario o contraseña incorrecta')
    
            const token =  await this.jwtService.signAsync({sub:finduser._id, role:finduser.role_user})
            
            return [{
                acces_token:token
            }] 
                


        } catch (error) {
            throw error
        }
    }

}
