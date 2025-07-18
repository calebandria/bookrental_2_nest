import {IsEmail, IsString, MaxLength, MinLength} from 'class-validator';
export class CreateUserDto{
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(8,{ message:"Password must be at least 8 characters long"})
    password: string;

    @IsString()
    @MaxLength(30)
    firstname: string;

    @IsString()
    @MaxLength(30)
    lastname: string;

    
}