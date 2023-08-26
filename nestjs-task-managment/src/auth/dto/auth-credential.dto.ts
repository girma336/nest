import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsEmail()
    @MinLength(7)
    @MaxLength(50)
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(32)
    password: string;
}