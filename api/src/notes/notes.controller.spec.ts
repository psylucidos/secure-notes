import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

describe('NotesController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const notes: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService],
    }).compile();

    notesController = app.get<NotesController>(NotesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(notesController.getHello()).toBe('Hello World!');
    });
  });
});
