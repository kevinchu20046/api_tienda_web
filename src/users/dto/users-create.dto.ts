import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString , MinLength , MaxLength , Matches } from "class-validator"



export class createUserDto {

    @ApiProperty({description: 'El nombre del usuario', example: 'Maria'})
    @IsNotEmpty() @IsString()
    name_user: String

    @ApiProperty({description:'Correo electronico del usuario', example:'Maria@example.com'})
    @IsNotEmpty() @IsString() @IsEmail()
    email_user: String

    @ApiProperty({description:'Contraseña del usuario', example:'Maria12345*'})
    @IsNotEmpty() @IsString() @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    @MaxLength(20, { message: 'La contraseña no puede tener más de 20 caracteres.' })
    @Matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
        },
    )
    password: String

    @ApiProperty({description:'Rol del usuario',example:'Administrador o Cliente'})
    @IsNotEmpty()
    @IsString()
    role_user: String
}