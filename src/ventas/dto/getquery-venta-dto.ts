import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";



export class GetProductsQueryDto {

    @ApiProperty({description:'query para filtrado de las ventas por categoria de producto', example:'?category_product=Aseo o ?category_product=Aseo&category_product=Alimento'})
    @IsOptional()
    category_product?: string | string[]
  
    @ApiProperty({description:'query para filtrado de las ventas por total de venta', example:'?total_sale=3000'})
    @IsOptional()
    total_sale?: string
  }