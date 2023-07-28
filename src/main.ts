import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configurationConfig from './config/configuration.config';
import { ValidationPipe } from '@nestjs/common';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(configurationConfig().port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
