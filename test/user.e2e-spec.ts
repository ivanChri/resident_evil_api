/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { userDto } from '../src/user/user.dto';
describe('POST /user/register', () => {
  let app: INestApplication;
  const dto:userDto = {
    email:'test@gmail.com'
  }
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('should register new user', () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send(dto)
      .expect(201)
  });
  it('should reject user if email already exsist in the db',() => {
     return request(app.getHttpServer())
     .post('/user/register')
     .send(dto)
     .expect(403)
  });
  it('should reject if request not provide email',() => {
    return request(app.getHttpServer())
    .post('/user/register')
    .send({email:''})
    .expect(406)
  });
  afterAll(async () => {
    await app.close();
  });
});
