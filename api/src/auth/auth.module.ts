import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppusersModule } from '../appusers/appusers.module';

@Module({
  imports: [AppusersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
