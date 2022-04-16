import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesService {
  getHello(): string {
    return 'Hello World!';
  }
}
