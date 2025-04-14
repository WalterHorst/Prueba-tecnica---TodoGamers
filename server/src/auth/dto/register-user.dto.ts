import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  name: string;
}
