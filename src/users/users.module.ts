import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users,UserSchema } from './schema/user.schema';
import { Argon2Module } from 'src/argon2/argon2.module';


@Module({
  imports:[ MongooseModule.forFeature([{name: Users.name , schema:UserSchema}]),
    Argon2Module
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
