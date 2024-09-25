import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsAlpha,
} from "class-validator";

export class NewUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    @IsAlpha()
    firstName: string;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    @IsAlpha()
    lastName: string;
}
