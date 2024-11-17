import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth.module';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('AuthController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should say hello', () => {
    return request(app.getHttpServer())
      .get('/api/users/hello?name=titiedd') // Memanggil endpoint dengan query parameter
      .expect(200) // Memastikan status kode 200
      .expect('Hello titiedd'); // Memastikan respons yang diterima
  });

  it('should sign up a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/users/signup')
      .send({
        "username": "ahmad",
        "email": "ahmad@gmail",
        "password": "pw123"
      }
      )
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
