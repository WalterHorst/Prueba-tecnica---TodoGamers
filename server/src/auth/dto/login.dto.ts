import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDTO {
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
