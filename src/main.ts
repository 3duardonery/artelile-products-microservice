import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configurationConfig from './config/configuration.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configurationConfig().port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
