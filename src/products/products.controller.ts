import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWhitUser } from 'src/auth/interface/requestuser.interface';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/decorators/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';




@ApiTags('Products')
@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({status:201, description: 'Producto creado exitosamente' })
  @ApiResponse({status:500, description: 'Error en la peticion'})
  @ApiResponse({status:400, description: 'Envio incorrecto de los datos' })
  @ApiResponse({status:401, description: 'No se realizado el inicio de sesion' })
  @ApiResponse({status:409, description: 'El producto ya se encuentra registrado'})
  @ApiBearerAuth('JWT-auth')
  @Post('create-product') 
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard) 
  createProductController(@Body() createProductDto: CreateProductDto,@Req() request:RequestWhitUser ) {
    try {
      return this.productsService.createProductService(createProductDto,request);
    } catch (error) {
      throw error
    }
  }



  @ApiResponse({status:200, description: 'Lista de los productos' })
  @ApiResponse({status:500, description: 'Error en la peticion'})
  @Get()
  findAllProductController() {
    try {
      return this.productsService.findAllProductService();
    } catch (error) {
      throw error
    }
  }

  @ApiResponse({status:200, description: 'Producto traido por nombre' })
  @ApiResponse({status:500, description: 'Error en la peticion'})
  @Get(':name')
  findNameProductController(@Param('name') name:string) {
    try {
      return this.productsService.findNameProductService(name);
    } catch (error) {
      throw error
    }
  }

  @ApiResponse({status:200, description: 'Producto actualizado' })
  @ApiResponse({status:500, description: 'Error en la peticion'})
  @ApiResponse({status:400, description: 'No se pudo encontrar el producto para actualizar'})
  @ApiResponse({status:401, description: 'No tiene permisos sufucientes o no realizado el inicio de sesion'})
  @ApiBearerAuth('JWT-auth')
  @Roles(Role.Admin)
  @Patch(':id')
  updateProductController(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return this.productsService.updateProductService(id, updateProductDto);
    } catch (error) {
      throw error
    }
  }


  @ApiResponse({status:200, description: 'Producto eliminado' })
  @ApiResponse({status:500, description: 'Error en la peticion'})
  @ApiResponse({status:401, description: 'No tiene permisos sufucientes o no se realizo el inicio de sesion'})
  @ApiBearerAuth('JWT-auth')
  @Roles(Role.Admin)
  @Delete(':id')
  removeProductController(@Param('id') id: string) {
    return this.productsService.deleteProductService(id);
  }
}
