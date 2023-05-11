import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import * as path from 'path';


require('dotenv').config(); //configure .env file
async function bootstrap() {
  dotenv.config();
  //snapshot: true //devtools integration

  const app = await NestFactory.create<NestExpressApplication> (AppModule);
  app.useStaticAssets(path.join(__dirname, "../../uploads/"));

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder() //swagger
  .setTitle('my book app')
  .setDescription('Book API')
  .setVersion('1.0')
  .addTag('books')
  .build();
const document = SwaggerModule.createDocument(app, config);//settingup swagger
SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
