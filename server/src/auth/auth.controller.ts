import { Body, ConflictException, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterUserDTO) {
    try {
      return await this.authService.register(body);
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDTO, @Res() res: Response) {
    try {
      return await this.authService.login(
        loginDto.email,
        loginDto.password,
        res,
      );
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    try {
      res.clearCookie('auth_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }
}
