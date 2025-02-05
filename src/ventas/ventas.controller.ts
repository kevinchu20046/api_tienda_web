import { Controller, Body, Req, Query } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { RequestWhitUser } from 'src/auth/interface/requestuser.interface';
import { ApiTags } from '@nestjs/swagger';
import { GetVentaQueryDto } from './dto/getquery-venta-dto';
import { ApiCreateVentaResponses, ApiFindAllVentaResponses, ApiFindUserVentaResponses } from './decorators/apiresponsesventas.decorator';


@ApiTags('Sales')
@Controller('sales')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}


  // Controller para crear una venta 
  @ApiCreateVentaResponses()
  createventasController(@Body() createVentaDto: CreateVentaDto, @Req() request:RequestWhitUser) {
    try {
      return this.ventasService.createVentasService(createVentaDto,request);
    } catch (error) {
      throw error
    }
  }


  // Controlador para traer todas las ventas , se puede filtrar por precio o por categoria
  @ApiFindAllVentaResponses()
  findAllVentasController(@Query() query:GetVentaQueryDto) {
   try {
     return this.ventasService.findAllVentasService(query);
   } catch (error) {
    throw error
   }
  }



  // Controlador para traer todas la ventas de un usuario cliente
  @ApiFindUserVentaResponses()
  findSaleUserController(@Req() request:RequestWhitUser) {
    try {
      return this.ventasService.findSaleUserService(request);
    } catch (error) {
      throw error
    }
  }
}
