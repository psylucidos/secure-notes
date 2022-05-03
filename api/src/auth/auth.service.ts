import { Injectable } from '@nestjs/common';
import { AppusersService } from '../appusers/appusers.service';
import { AppuserDto } from './dtos/appuser.dto';
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private appusersService: AppusersService) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    const targetAppuser = await this.appusersService.findByUsernameAndPassword(username, password);

    if (targetAppuser.username) {
      const [salt, key] = targetAppuser.password.split(':');
      const hashedBuffer = scryptSync(password, salt, 64);
      const keyBuffer = Buffer.from(key, 'hex');
      const match = timingSafeEqual(hashedBuffer, keyBuffer);

      if (match) {
        return true;
      } else {
        return false;
      }
    }
  }

  async registerUser(username: string, password: string): Promise<any> {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');
    const userPassword = `${salt}:${hashedPassword}`;
    const newUser = await this.appusersService.create({
      username,
      password: userPassword
    });

    if (newUser) {
      return newUser;
    } else {
      return null;
    }
  }
}
