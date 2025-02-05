import { applyDecorators, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { ListRole, Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";


// Respuestas para el endpoint de creacion de productos
export function ApiCreateProductResponses() {
    return applyDecorators(
        ApiResponse({status:200, description: 'Producto creado' }),
        ApiResponse({status:500, description: 'Error en la peticion'}),
        ApiResponse({status:400, description: 'Envio incorrecto de los datos' }),
        ApiResponse({status:401, description: 'No se realizado el inicio de sesion' }),
        ApiResponse({status:409, description: 'El producto ya se encuentra registrado'}),
        ApiBearerAuth('JWT-auth'),
        Post('create-product'), 
        Roles(ListRole.Admin),
        UseGuards(JwtAuthGuard,RolesGuard), 
    );
}


// Respuestas para el endpoint de busqueda de productos
export function ApiFindAllProductResponses() {
    return applyDecorators(
        ApiResponse({status:200, description: 'Lista de los productos'}),
        ApiResponse({status:500, description: 'Error en la peticion'}),
        Get()
    );
}

// Respuetas para el endpoint de actualizacion de productos
export function ApiUpdateProductResponses() {
    return applyDecorators(
        ApiResponse({status:200, description: 'Producto actualizado' }),
        ApiResponse({status:500, description: 'Error en la peticion'}),
        ApiResponse({status:400, description: 'No se pudo encontrar el producto para actualizar'}),
        ApiResponse({status:401, description: 'No tiene permisos sufucientes o no realizado el inicio de sesion'}),
        ApiBearerAuth('JWT-auth'),
        Roles(ListRole.Admin),
        UseGuards(JwtAuthGuard,RolesGuard),
        Patch(':id')
    );
}


// Respuestas para el endpoint de eliminacion de productos
export function ApiDeleteProductResponses() {
    return applyDecorators(
        ApiResponse({status:200, description: 'Producto eliminado' }),
        ApiResponse({status:500, description: 'Error en la peticion'}),
        ApiResponse({status:401, description: 'No tiene permisos sufucientes o no se realizo el inicio de sesion'}),
        ApiBearerAuth('JWT-auth'),
        Roles(ListRole.Admin),
        UseGuards(JwtAuthGuard,RolesGuard),
        Delete(':id'),
    );
}
