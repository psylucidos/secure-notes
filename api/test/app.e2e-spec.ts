import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { NotesModule } from '../src/notes/notes.module';
import { DatabaseModule } from '../src/database/database.module';
import { INestApplication } from '@nestjs/common';

describe('Notes', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [NotesModule, DatabaseModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET notes`, () => {
    return request(app.getHttpServer())
      .get('/notes')
      .expect(200)
      .expect([]);
  });

  it(`/GET notes/:id`, () => {
    return request(app.getHttpServer())
      .get('/notes/626f6025358aaecf5a34a811')
      .expect(200)
      .expect([
        {
          "_id":"626f6025358aaecf5a34a811",
          "title":"hello",
          "content":"hi my friend!",
          "owner":"626f5fd7a7f528ceb5fa94d5","__v":0
        }
      ]);
  });

  it(`/POST notes/`, () => {
    return request(app.getHttpServer())
      .post('/notes')
      .send({
        title: 'hello',
        content: 'hi my friend!',
        owner: '626f5fd7a7f528ceb5fa94d5'
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
