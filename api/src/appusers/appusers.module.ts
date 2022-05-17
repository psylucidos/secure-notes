import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppusersService } from './appusers.service';
import { Appuser, AppuserSchema } from './appuser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Appuser.name, schema: AppuserSchema }])
  ],
  providers: [AppusersService],
  exports: [AppusersService],
})
export class AppusersModule {}
