/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaClientModule } from '../src/utils/PrismaClient/prisma.module';
import { PrismaClientService } from '../src/utils/PrismaClient/prisma.service';
import { GamesModule } from './../src/games/games.module';
describe('GET /games', () => {
    let app: INestApplication;
    const testToken = process.env.TEST_TOKEN;
    beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [GamesModule,PrismaClientModule],
    providers:[PrismaClientService]
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    });
    it('should be able to get games data',() => {
      return request(app.getHttpServer())
      .get('/games')
      .set('Authorization',`Bearer ${testToken}`)
      .expect(200)
    });
    it('should be able to get filtered games data using query', () => {
        return request(app.getHttpServer())
        .get('/games')
        .set('Authorization',`Bearer ${testToken}`)
        .query({platfrom:'playstation 2',title:'resident evil 4'})
        .expect(200)
    });
    it('should be able to get the games data in detail',() => {
      return request(app.getHttpServer())
      .get('/games/3')
      .set('Authorization',`Bearer ${testToken}`)
      .expect(200)
    });
    it('should return not found exception if games id not valid',() => {
        return request(app.getHttpServer())
        .get('/games/100')
        .set('Authorization',`Bearer ${testToken}`)
        .expect(404)
    });
    it('should return not found exception if search using the query did not find results',() => {
        return request(app.getHttpServer())
        .get('/games')
        .query({platfrom:'test',title:'test'})
        .set('Authorization',`Bearer ${testToken}`)
        .expect(404)
    });
    it('should reject if request param is not numeric', () => {
        return request(app.getHttpServer())
        .get('/games/abc')
        .set('Authorization',`Bearer ${testToken}`)
        .expect(400)
    });
    afterAll(async () => {
      await app.close();
    });
});