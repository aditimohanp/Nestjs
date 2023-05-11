import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AuthorsModule } from './authors/authors.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CustomerModule } from './customer/customer.module';
import { GatewayModule } from './gateway/gateway.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module ({
  imports: [ConfigModule.forRoot({envFilePath:'.env', isGlobal:true,}),GatewayModule,ProductsModule,AuthorsModule,AuthModule,JwtModule,CustomerModule,
    MongooseModule.forRoot('mongodb+srv://aditi:aditi%40123@cluster0.7in18ev.mongodb.net/bookapp?authMechanism=DEFAULT'),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    })],
  controllers: [AppController],
  providers: [AppService], 
 }
)
export class AppModule {}






