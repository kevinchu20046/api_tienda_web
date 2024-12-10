import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, MaxLength, Min, ValidateNested } from "class-validator"

class ProductDto {

    @ApiProperty({description:'ID unico del producto', example:'675714fc66862f116a1a48s234'})
    @IsString({message:'el id del producto debe ser una cadena de texto'})
    @IsNotEmpty({message:'El id del producto no debe estar vacio'})
    product_id: string;
  
    @ApiProperty({description:'Cantidad del producto vendido', example:5})
    @IsNotEmpty({message:'la cantidad del producto vendido no puede estar vacio'})
    @Min(1,{message:'la cantidad debe ser de por lo menos de 1'})
    @IsInt({message:'la cantidad del producto vendido debe ser entera'})
    amount_product: number;

}



export class CreateVentaDto {

    @ApiProperty({
        description: 'Lista de productos incluidos en el pedido',
        type: () => ProductDto,
        isArray: true,
    })
    @ValidateNested({ each: true }) // Valida cada elemento del array como un ProductDto
    @Type(() => ProductDto)
    @IsNotEmpty({message:'la propiedad de productos no vendidos no puede esta vacio'}) 
    products: ProductDto[]


}
