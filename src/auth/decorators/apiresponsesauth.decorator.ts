import { applyDecorators, Post, UseGuards } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { LoginAttempGuard } from "../guards/login_attemp.guard";


export function ApiCreateUserResponses() {
    return applyDecorators (
        ApiResponse({status:201, description: 'Usuario creado exitosamente' }),
        ApiResponse({status:500, description: 'Error en la peticion'}),
        ApiResponse({status:409, description: 'El usuario ya se encuentra registrado.' }),
        Post('create-user')
    )
}


export function ApiLoginResponses() {
    return applyDecorators(
      ApiResponse({ status: 200, description: 'Inicio de sesion correcto' }),
      ApiResponse({ status: 400, description: 'Envío incorrecto de datos' }),
      ApiResponse({ status: 401, description: 'Credenciales inválidas' }),
      ApiResponse({ status: 500, description: 'Error interno del servidor' }),
      UseGuards(LoginAttempGuard),
      Post('login')
    );
  }

