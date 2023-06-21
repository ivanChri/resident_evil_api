import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccesResponseInterceptor } from './utils/middleware/SuccesResponse.interceptor';
import { ResponseExceptionFilter } from './utils/middleware/ResponseException.filter';
async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new SuccesResponseInterceptor());
  app.useGlobalFilters(new ResponseExceptionFilter());
  app.enableCors();
  await app.listen(port);
}
bootstrap();
