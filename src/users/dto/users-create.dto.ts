import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString , MinLength , MaxLength , Matches, IsOptional, IsIn } from "class-validator"



export class CreateUserDto {

    
    @ApiProperty({description: 'El nombre del usuario', example: 'Maria'})
    @IsNotEmpty() @IsString()
    name_user: string


    @ApiProperty({description:'Correo electronico del usuario', example:'Maria@example.com'})
    @IsNotEmpty({ message: 'El correo es obligatorio' })
    @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
    @IsString({ message: 'El correo debe ser una cadena de texto' })
    @MaxLength(255, { message: 'El correo no puede tener más de 255 caracteres' })
    email_user: string



    @ApiProperty({description:'Contraseña del usuario', example:'Password12345*'})
    @IsNotEmpty() @IsString() @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    @MaxLength(20, { message: 'La contraseña no puede tener más de 20 caracteres.' })
    @Matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
        },
    )
    password: string


    // @ApiProperty({description:'Rol del usuario',example:'Administrador o Cliente'})
    // @IsOptional()
    // @IsIn(['Administrador', 'Cliente'], { message: 'El rol debe ser Administrador o Cliente' })
    // @IsString()
    // role_user?: String
}