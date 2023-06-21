/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClientModule } from '../src/utils/PrismaClient/prisma.module';
import { PrismaClientService } from './../src/utils/PrismaClient/prismaClient.service';
import * as request from 'supertest';
import { CharsModule } from './../src/chars/chars.module';
describe('AuthGuard e2e test',() => {
    let app: INestApplication;
    const testToken = process.env.TEST_TOKEN;
    const testApiKey = process.env.TEST_APIKEY;
    beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
     imports: [CharsModule,PrismaClientModule],
     providers:[PrismaClientService]
    }).compile();
    app = moduleFixture.createNestApplication();
     await app.init();
    });
    it('should be able to get data chars using jwt token',() => {
        return request(app.getHttpServer())
        .get('/chars')
        .set('Authorization',`Bearer ${testToken}`)
        .expect(200)
    })
    it('should be able to reject the request if the jwt token is invalid',() => {
        return request(app.getHttpServer())
        .get('/chars')
        .set('Authorization',`Bearer false jwt token`)
        .expect(401)
    })
    it('should be able to reject the request if the authorization header is not a Bearer',() => {
        return request(app.getHttpServer())
        .get('/chars')
        .set('Authorization','test')
        .expect(406)
    })
    it('should be able to get data chars using apiKey',async () => {
        return request(app.getHttpServer())
        .get('/chars')
        .query({apiKey:`${testApiKey}`})
        .expect(200)
    })
    it('should be able to reject the request if the apiKey is invalid',() => {
        return request(app.getHttpServer())
        .get('/chars')
        .query({apiKey:'false apiKey'})
        .expect(401)
    })
    it('should be able to reject the request if it does not provide a jwt token or apiKey',() => {
        return request(app.getHttpServer())
        .get('/chars')
        .expect(403)
    })
    afterAll(async () => {
     await app.close();
    });
});