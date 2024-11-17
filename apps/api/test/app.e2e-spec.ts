import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should sign up a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/users/signup')
      .send({
        username: 123,
        email: 'ahmad',
        password: 'pw123',
      })
      .expect(201); // Mengharapkan status kode 201 untuk berhasil dibuat

    console.log(response.body);

    // Memastikan respons yang diterima sesuai dengan yang diharapkan
    expect(response.body).toEqual({
      data: {
        id: expect.any(Number), // Menggunakan expect.any(Number) karena id dapat berbeda
        username: 'ah masa berhasil sii', // Sesuaikan nilai ini dengan yang diterima
        email: 'email', // Sesuaikan nilai ini dengan yang diterima
        password: 'password', // Sesuaikan nilai ini dengan yang diterima
        profile_id: 1,
        role_id: 1,
      },
      error: null,
    });
  });
});
