import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { NotesModule } from '../src/notes/notes.module';
import { AuthModule } from '../src/auth/auth.module';
import { DatabaseModule } from '../src/database/database.module';
import { INestApplication } from '@nestjs/common';

describe('Notes', () => {
  let app: INestApplication;
  let testUserID: String;
  let testNoteID: String;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [NotesModule, AuthModule, DatabaseModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`PUT auth/`, () => { // register
    return request(app.getHttpServer())
      .put('/auth')
      .send({
        username: 'newuser',
        password: 'testpassword123/',
      })
      .expect(204)
      .then((res) => {
        console.log('Test user has id:', res.body);
        testUserID = res.body;
      });
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
        owner: testUserID
      })
      .expect(201)
      .then((res) => {
        console.log('Test note has id:', res.body._id);
        testNoteID = res.body._id;
      })
  });

  it(`GET notes/:id`, () => {
    return request(app.getHttpServer())
      .get(`/notes/${testNoteID}`)
      .expect(200)
      .expect({
        '_id': testNoteID,
        'title': 'hello',
        'content': 'hi my friend!',
        'owner': testUserID,
        '__v': 0
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
