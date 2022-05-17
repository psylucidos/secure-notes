import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`)],
})
export class DatabaseModule {
  constructor() {
    console.log(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`);
  }
}
