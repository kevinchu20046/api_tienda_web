import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../decorators/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';



@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

}



