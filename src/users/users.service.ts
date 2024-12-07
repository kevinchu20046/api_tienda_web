import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, Users } from './schema/user.schema';
import { Model } from 'mongoose';
import { createUserDto } from './dto/users-create.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(Users.name) private UsersModel:Model<UserDocument>){}

    async create(createUserDto:createUserDto): Promise<Users>{
        try {
            
            const existingUser = await this.UsersModel.findOne({ email_user: createUserDto.email_user });
    
            if(existingUser){
                throw new ConflictException('El correo electrónico ya está registrado.');
            }
            return await this.UsersModel.create(createUserDto)
        } catch (error) {
            throw error;
        }
    }
}
