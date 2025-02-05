import { Controller, Body, Param, Req, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestWhitUser } from 'src/auth/interface/requestuser.interface';
import { ApiCreateProductResponses, ApiDeleteProductResponses, ApiFindAllProductResponses, ApiUpdateProductResponses } from './decorators/apiresponsesproducts.decorator';




@ApiTags('Products')
@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @ApiCreateProductResponses()
  createProductController(@Body() createProductDto: CreateProductDto,@Req() request:RequestWhitUser ) {
    try {
      return this.productsService.createProductService(createProductDto,request);
    } catch (error) {
      throw error
    }
  }


  @ApiFindAllProductResponses()
  findAllProductController(@Query('name') name?:string, 
  @Query('price') price?:string, @Query('category') category?:string, @Query('amount') amount?:string) {
    try {
      const filters = {name_product:name , 
        price_product:price , 
        category_product:category, 
        amount_product:amount}

      const objfil: { [key: string]: string }  = Object.fromEntries(Object.entries(filters).filter(([key , value])=>{
        return value && String(value).trim() !== '';
      }))

      return this.productsService.findProductService(objfil);
    } catch (error) {
      throw error
    }
  }


  @ApiUpdateProductResponses()
  updateProductController(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return this.productsService.updateProductService(id, updateProductDto);
    } catch (error) {
      throw error
    }
  }


  @ApiDeleteProductResponses()
  removeProductController(@Param('id') id: string,@Req() request:RequestWhitUser) {
    return this.productsService.deleteProductService(id,request);
  }
}
