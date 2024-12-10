import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class Argon2Service {

    // hashear la contraseña
    async codificarPassword(plain_password:string): Promise<string>{
        try {
            const hashedPassword = await argon2.hash(plain_password,{timeCost:4,parallelism:2});
            return hashedPassword
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    // verificar el hash de la contraseña
    async verificarPassword(hash:string,plain_password:string):Promise<boolean>{
        try {
            const ismatch = await argon2.verify(hash,plain_password)
            return ismatch
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
