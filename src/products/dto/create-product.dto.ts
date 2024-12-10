import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Max, MaxLength, Min, MinLength } from "class-validator"





export class CreateProductDto {

    @ApiProperty({description:'nombre del producto',example:'Arroz 2KG'})
    @IsString() @IsNotEmpty() @MinLength(3)
    @MaxLength(100)
    name_product: string


    @ApiProperty({description:'precio del producto', example:4000})
    @IsNumber() @IsPositive() @IsNotEmpty({ message: 'El precio es obligatorio.' })
    @Min(1, { message: 'El precio debe ser al menos 1 peso.' })
    @Max(1000000000, { message: 'El precio no puede superar los 1,000,000,000 pesos.' })
    price_product: number


    @ApiProperty({description:'cantidad del producto', example: 50})
    @IsInt({ message: 'La cantidad debe ser un número entero.' })
    @IsNotEmpty({ message: 'La cantidad es obligatoria.' })
    @Min(0, { message: 'La cantidad no puede ser menor a 0.' }) // Cambiar a @IsPositive si no se permite 0
    @Max(100000, { message: 'La cantidad no puede exceder las 100,000 unidades.' })
    amount_product: number


    @IsString({message:'la categoria debe ser una cadena de texto'})
    @IsNotEmpty({ message: 'La categoría es obligatoria.' })
    @MaxLength(30, { message: 'La categoría no puede tener más de 30 caracteres.' })
    category_product:string
}
