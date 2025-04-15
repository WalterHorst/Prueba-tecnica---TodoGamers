import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { RegisterUserDTO } from './dto/register-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterUserDTO) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.usersService.create({
        ...data,
        password: hashedPassword,
      });

      return this.generateToken(user);
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  async login(userEmail: string, userPassword: string, res: Response) {
    try {
      const user = await this.usersService.findByEmail(userEmail);

      if (!user) {
        throw new UnauthorizedException('Email or password is incorrect');
      }

      const isMatch = await bcrypt.compare(userPassword, user.password);

      if (!isMatch) {
        throw new UnauthorizedException('Email or password is incorrect');
      }

      const payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
      });

      return res.send('Logged in successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException('Email or password is incorrect');
      }

      throw error;
    }
  }

  private generateToken(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
