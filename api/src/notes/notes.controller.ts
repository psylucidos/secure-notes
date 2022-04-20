import { Controller, Body, Param, HttpCode, Get, Post, Put, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { Note } from './note.schema';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @HttpCode(200)
  @Get()
  async getNotes(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  async getNote(@Param('id') id: string): Promise<Note> {
    return this.notesService.findByID(id);
  }

  @HttpCode(201)
  @Post()
  async createNote(@Body() newNote: CreateNoteDto): Promise<Note> {
    return this.notesService.create(newNote);
  }

  @HttpCode(204)
  @Put()
  async updateNote(@Body() body: UpdateNoteDto): Promise<Boolean> {
    return this.notesService.updateOne(body);
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<Note> {
    return this.notesService.deleteOne(id);
  }
}
