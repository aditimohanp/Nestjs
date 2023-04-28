import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


require('dotenv').config();

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
  .setTitle('my book app')
  .setDescription('Book API')
  .setVersion('1.0')
  .addTag('books')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
