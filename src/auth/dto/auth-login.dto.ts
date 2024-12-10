import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class AuthLogin {

    @ApiProperty({description: 'Correo electronico del usuario', example: 'example@example.com'})
    @IsNotEmpty({ message: 'El correo es obligatorio' })
    @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
    @IsString()
    @MaxLength(255, { message: 'El correo no puede tener más de 255 caracteres' })
    email: string


    @ApiProperty({description: 'Contraseña del usuario', example: 'Password1234!'})
    @IsNotEmpty() 
    @IsString()
    password: string


}

