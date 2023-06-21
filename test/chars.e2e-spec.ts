/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClientModule } from '../src/utils/PrismaClient/prisma.module';
import { PrismaClientService } from './../src/utils/PrismaClient/prismaClient.service';
import * as request from 'supertest';
import { CharsModule } from './../src/chars/chars.module';
describe('GET /chars', () => {
    let app: INestApplication;
    const testToken = process.env.TEST_TOKEN;
    beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [CharsModule,PrismaClientModule],
    providers:[PrismaClientService]
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    });
    it('should be able to get chars data', () => {
        return request(app.getHttpServer())
        .get('/chars')
        .set('Authorization',`Bearer ${testToken}`)
        .expect(200)           
    });
    it('should be able to get filtered chars data using query', () => {
       return request(app.getHttpServer())
       .get('/chars')
       .set('Authorization',`Bearer ${testToken}`)
       .query({status:'alive',gender:'male',name:'leon',game:'resident evil 6'})
       .expect(200)
    });
    it('should be able to get the chars data in detail',() => {
        return request(app.getHttpServer())
        .get('/chars/1')
        .set('Authorization',`Bearer ${testToken}`)
        .expect(200)
    });
    it('should return not found exception if search using the query did not find results', () => {
        return request(app.getHttpServer())
        .get('/chars')
        .set('Authorization',`Bearer ${testToken}`)
        .query({status:'test',gender:'test',name:'test',game:'test'})
        .expect(404)
    });
    it('should return not found if chars id not valid',() => {
        return request(app.getHttpServer())
        .get('/chars/200')
        .set('Authorization',`Bearer ${testToken}`)
        .expect(404)
    });
    afterAll(async () => {
        await app.close();
     });
});