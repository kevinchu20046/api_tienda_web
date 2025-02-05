import { applyDecorators, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { ListRole, Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";


// Respuestas para el endpoint de creacion de ventas
export function ApiCreateVentaResponses() {
    return applyDecorators (
        ApiResponse({status:200, description: 'Venta creada correctamente' }),
        ApiResponse({status:500, description: 'Error en la peticion'}),
        ApiResponse({status:401, description: 'No tiene permisos sufucientes o no se realizo el inicio de sesion'}),
        ApiBearerAuth('JWT-auth'),
        Post('create-sale'),
        Roles(ListRole.Cliente,ListRole.Admin),
        UseGuards(JwtAuthGuard,RolesGuard)
    )
}


// Respuestas para el endpoint de busqueda de ventas
export function ApiFindAllVentaResponses() {
    return applyDecorators (
        ApiResponse({status:200, description: 'Lista de los productos' }),
        ApiResponse({status:500, description: 'Error en la peticion'}),
        ApiResponse({status:401, description: 'No tiene permisos sufucientes o no se realizo el inicio de sesion'}),
        ApiQuery({
            name:'category_product', 
            required:false, 
            type : String, 
            description: 'Filtra por categorías (ej: ?category_product=Aseo ej2: ?category_product=Aseo,Alimentos)',
        }),
        ApiBearerAuth('JWT-auth'),
        Get(),
        Roles(ListRole.Admin),
        UseGuards(JwtAuthGuard,RolesGuard)
    )
}


// Respuestas para el endpoint de busqueda de ventas de un usuario
export function ApiFindUserVentaResponses() {
    return applyDecorators (
        ApiResponse({status:200, description: 'Lista de las ventas realizadas del cliente' }),
        ApiResponse({status:500, description: 'Error en la peticion'}),
        ApiResponse({status:401, description: 'No tiene permisos sufucientes o no se realizo el inicio de sesion'}),
        ApiBearerAuth('JWT-auth'),
        Roles(ListRole.Cliente,ListRole.Admin),
        UseGuards(JwtAuthGuard,RolesGuard),
        Get('my-sales')
    )
}
