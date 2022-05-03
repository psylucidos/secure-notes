import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppusersModule } from '../appusers/appusers.module';

@Module({
  imports: [AppusersModule],
  providers: [AuthService],
})
export class AuthModule {}
