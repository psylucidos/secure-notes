import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/note-app-db')
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
