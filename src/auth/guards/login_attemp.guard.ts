import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { BadRequestException, CanActivate, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import {Cache} from "cache-manager";


@Injectable()
export class LoginAttempGuard implements CanActivate {

    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache){}

    async canActivate(context: any): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { email,password } = request.body

        if(!email || !password){
            throw new BadRequestException('Ingrese el correo electronico y la contraseña para iniciar sesion');
        }

        await this.getLoginAttemp(email);


        return true
    }


    private async getLoginAttemp(user: string): Promise<void> {
    
        let loginattemp = `login_attemp_${user}`;

        const result =  (await this.cacheManager.get<number>(loginattemp)) || 0;

        if(result >= 5){
            throw new UnauthorizedException('limite de intentos de inicio de superado');
        }
    }
}