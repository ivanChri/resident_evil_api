/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClientModule } from '../src/utils/PrismaClient/prisma.module';
import { PrismaClientService } from './../src/utils/PrismaClient/prismaClient.service';
import * as request from 'supertest';
import { CreatureModule } from './../src/creature/creature.module';
describe('GET /creature',() => {
    let app: INestApplication;
    const testToken = process.env.TEST_TOKEN;
    beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [CreatureModule,PrismaClientModule],
    providers:[PrismaClientService]
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    });
    it('should be able to get creature data', () => {
        return request(app.getHttpServer())
        .get('/creature')
        .set('Authorization',`Bearer ${testToken}`)
        .expect(200)           
    });
    it('should be able to get filtered creature data using query', () => {
        return request(app.getHttpServer())
        .get('/creature')
        .set('Authorization',`Bearer ${testToken}`)
        .query({name:'zombie',based:'t-virus',game:'resident evil 1'})
        .expect(200)
    });
    it('should be able to get the creature data in detail',() => {
        return request(app.getHttpServer())
        .get('/creature/1')
        .set('Authorization',`Bearer ${testToken}`)
        .expect(200)
    });
    it('should return not found exception if creature id not valid',() => {
        return request(app.getHttpServer())
        .get('/games/200')
        .set('Authorization',`Bearer ${testToken}`)
        .expect(404)
    });
    it('should return not found exception if search using the query did not find results',() => {
        return request(app.getHttpServer())
        .get('/creature')
        .query({name:'test',based:'test',game:'test'})
        .set('Authorization',`Bearer ${testToken}`)
        .expect(404)
    });
    it('should reject if request param is not numeric', () => {
        return request(app.getHttpServer())
        .get('/creature/abc')
        .set('Authorization',`Bearer ${testToken}`)
        .expect(400)
    });
    afterAll(async () => {
        await app.close();
    });
})