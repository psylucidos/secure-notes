import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`)
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
