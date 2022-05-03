import { Controller, Body, Param, HttpCode, Get, Post, Put, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppuserDto } from './dtos/appuser.dto';
import { Appuser } from '../appusers/appuser.schema';

@Controller('auth')
export class NotesController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post()
  async login(@Body() userData: AppuserDto): Promise<Boolean> {
    return this.authService.validateUser(userData.username, userData.password);
  }

  @HttpCode(204)
  @Put()
  async register(@Body() userData: AppuserDto): Promise<Boolean> {
    return this.authService.registerUser(userData.username, userData.password);
  }
}
