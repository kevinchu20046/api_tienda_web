import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, Users } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/users-create.dto';
import { Argon2Service } from 'src/argon2/argon2.service';

@Injectable()
export class UsersService {


    constructor(
        @InjectModel(Users.name) private usersModel:Model<UserDocument>,
        @Inject(Argon2Service) private readonly argon2Service:Argon2Service
    ){}

    // Servicio de creacion de usuarios 
    async createUsersService(createUserDto:CreateUserDto){
        try {

            const {email_user,password , ...rest} = createUserDto;

            const existingUser = await this.usersModel.findOne({ email_user:email_user });
            if(existingUser){
                throw new ConflictException('El correo electrónico ya está registrado.');
            }

            const hashedpassword =  await this.argon2Service.codificarPassword(password);
            
            const newUser = {
                email_user:email_user,
                password:hashedpassword,
                ...rest
            }

            const usercreated= await this.usersModel.create(newUser)

            const data = {
                message:'usuario creado correctamente',
                user: usercreated._id
            }

            return [data] 
        } catch (error) {
            throw error;
        }
    }


    // Servicio para encontrar usuario por nombre,correo,id 
    async findUser(filters:{name_user?:string,email_user?:string,_id?:string}){
        try {
            return await this.usersModel.findOne(filters);
        } catch (error) {
            throw error
        }
    }
}
