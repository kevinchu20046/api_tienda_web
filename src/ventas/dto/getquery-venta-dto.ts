
import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";



export class GetVentaQueryDto {

    
    @IsOptional()
    @IsString({each:true})
    @Transform(({ value }) => {
      if (typeof value === 'string' && value.includes(',')) {
        
        return value.split(',').map(item => item.trim()) // Divide por comas y elimina espacios
      }
      return value; // Si ya es un array, lo deja intacto
    })
    category_product?: string | string[]
  
    
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => {

      const queryvalor = Number(value) 
      return isNaN(queryvalor) ? value: queryvalor
    })
    total_sale?: string
}