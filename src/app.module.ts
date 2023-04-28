import { INestApplication, MiddlewareConsumer, Module } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder  } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AuthorsModule } from './authors/authors.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CustomerModule } from './customer/customer.module';


@Module({
  imports: [ConfigModule.forRoot({envFilePath:'.env', isGlobal:true,}), ProductsModule,AuthorsModule,AuthModule,JwtModule,CustomerModule,
    MongooseModule.forRoot('mongodb+srv://aditi:aditi%40123@cluster0.7in18ev.mongodb.net/bookapp?authMechanism=DEFAULT'),],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}






