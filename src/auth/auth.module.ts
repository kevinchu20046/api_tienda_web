import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { Argon2Module } from 'src/argon2/argon2.module';
import { JwtModule } from '@nestjs/jwt';
import ConfigEnv from '../../config'
import { JwtStrategy } from './strategy/jwt.estrategy';

@Module({
  imports:[
    UsersModule, 
    Argon2Module,
    JwtModule.register({
      secret: ConfigEnv.get_jwt_secret(),
      signOptions: { 
        expiresIn: '2h',
       },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
