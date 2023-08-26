import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './tranform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const logger = new Logger();
  const port = 3000
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(3000);
  logger.log(`Application Listening on potr ${port}`)
}
bootstrap();
