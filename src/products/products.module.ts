import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema } from './products.model';
import { AuthorsSchema } from 'src/authors/authors.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Author', schema: AuthorsSchema },//import the author schema
      ]), AuthModule ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],//export service for the authors to retrieve products
})
export class ProductsModule {}
