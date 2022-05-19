import { Controller, Body, Param, HttpCode, Get, Post, Put, Delete } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AuthService } from './auth.service';
import { AppuserDto } from './dtos/appuser.dto';
import { Appuser } from '../appusers/appuser.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Get()
  async ping(@Body() userData: AppuserDto): Promise<String> {
    return 'Pong!';
  }

  @HttpCode(201)
  @Post()
  async login(@Body() userData: AppuserDto): Promise<string> {
    return this.authService.validateUser(userData.username, userData.password);
  }

  @HttpCode(204)
  @Put()
  async register(@Body() userData: AppuserDto): Promise<string> {
    return this.authService.registerUser(userData.username, userData.password);
  }
}
