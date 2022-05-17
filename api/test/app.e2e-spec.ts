import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { NotesModule } from '../src/notes/notes.module';
import { AuthModule } from '../src/auth/auth.module';
import { DatabaseModule } from '../src/database/database.module';
import { INestApplication } from '@nestjs/common';

describe('Notes', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [NotesModule, AuthModule, DatabaseModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`GET auth/`, () => { // register
    return request(app.getHttpServer())
      .get('/auth')
      .expect(200);
  });

  it(`PUT auth/`, () => { // register
    return request(app.getHttpServer())
      .put('/auth')
      .send({
        username: 'newuser',
        password: 'testpassword123/',
      })
      .expect(204);
  });

  it(`POST auth/`, () => { // login
    return request(app.getHttpServer())
      .post('/auth')
      .send({
        username: 'newuser',
        password: 'testpassword123/',
      })
      .expect(201);
  });

  it(`POST notes/`, () => {
    return request(app.getHttpServer())
      .post('/notes')
      .send({
        title: 'hello',
        content: 'hi my friend!',
        owner: '62830902f73cce62a3edffc2'
      })
      .expect(201);
  });

  // it(`/GET notes/:id`, () => {
  //   return request(app.getHttpServer())
  //     .get('/notes/626f6025358aaecf5a34a811')
  //     .expect(200)
  //     .expect([
  //       {
  //         "_id":"626f6025358aaecf5a34a811",
  //         "title":"hello",
  //         "content":"hi my friend!",
  //         "owner":"626f5fd7a7f528ceb5fa94d5","__v":0
  //       }
  //     ]);
  // });

  afterAll(async () => {
    await app.close();
  });
});
