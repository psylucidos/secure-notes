import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';
import { ObjectId } from 'mongoose';
import { AppusersService } from '../appusers/appusers.service';
import { AppuserDto } from './dtos/appuser.dto';

@Injectable()
export class AuthService {
  constructor(private appusersService: AppusersService) {}

  async validateUser(username: string, password: string): Promise<string> {
    const targetAppuser = await this.appusersService.findByUsername(username);

    if (targetAppuser) {
      const [salt, key] = targetAppuser.password.split(':');
      const hashedBuffer = scryptSync(password, salt, 64);
      const keyBuffer = Buffer.from(key, 'hex');
      const match = timingSafeEqual(hashedBuffer, keyBuffer);

      if (match) {
        return targetAppuser._id;
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async registerUser(username: string, password: string): Promise<string> {
    const targetAppuser = await this.appusersService.findByUsername(username);

    if (targetAppuser) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    } else {
      const salt = randomBytes(16).toString('hex');
      const hashedPassword = scryptSync(password, salt, 64).toString('hex');
      const userPassword = `${salt}:${hashedPassword}`;
      const newUser = await this.appusersService.create({
        username,
        password: userPassword
      });

      if (newUser) {
        return newUser._id;
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    }
  }
}
