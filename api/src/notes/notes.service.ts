import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './note.schema';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async findByID(id: string): Promise<Note> {
    return this.noteModel.findOne({ _id: id }).exec();
  }

  async updateOne(newNote: UpdateNoteDto): Promise<boolean> {
    const { _id, title, content } = newNote;
    const updateQuery = await this.noteModel.updateOne({ _id }, { title, content }).exec();
    return updateQuery.acknowledged;
  }

  async deleteOne(id: string): Promise<Note> {
    const targetNote = await this.noteModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return targetNote;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
