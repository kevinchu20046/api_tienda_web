import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, ParseFloatPipe } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/decorators/roles.enum';
import { RequestWhitUser } from 'src/auth/interface/requestuser.interface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetProductsQueryDto } from './dto/getquery-venta-dto';


@ApiTags('Sales')
@Controller('sales')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}


  // Servicio para crear un producto
  @ApiResponse({status:200, description: 'Venta creada correctamente' })
  @ApiResponse({status:500, description: 'Error en la peticion'})
  @ApiResponse({status:401, description: 'No tiene permisos sufucientes o no se realizo el inicio de sesion'})
  @ApiBearerAuth('JWT-auth')
  @Post('create-sale')
  @Roles(Role.Cliente,Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
  createventasController(@Body() createVentaDto: CreateVentaDto, @Req() request:RequestWhitUser) {
    try {
      return this.ventasService.createVentasService(createVentaDto,request);
    } catch (error) {
      throw error
    }
  }


  // Controlador para traer todas las ventas , se puede filtrar por precio o por categoria
  @ApiResponse({status:200, description: 'Lista de los productos' })
  @ApiResponse({status:500, description: 'Error en la peticion'})
  @ApiResponse({status:401, description: 'No tiene permisos sufucientes o no se realizo el inicio de sesion'})
  @ApiBearerAuth('JWT-auth')
  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
  findAllVentasController(@Query() query:GetProductsQueryDto) {
   try {
     return this.ventasService.findAllVentasService(query);
   } catch (error) {
    throw error
   }
  }


  // Controlador para traer todas la ventas de un usuario cliente
  @ApiResponse({status:200, description: 'Lista de las ventas realizadas del cliente' })
  @ApiResponse({status:500, description: 'Error en la peticion'})
  @ApiResponse({status:401, description: 'No tiene permisos sufucientes o no se realizo el inicio de sesion'})
  @ApiBearerAuth('JWT-auth')
  @Roles(Role.Cliente,Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('my-sales')
  findSaleUserController(@Req() request:RequestWhitUser) {
    try {
      return this.ventasService.findSaleUserService(request);
    } catch (error) {
      throw error
    }
  }
}
