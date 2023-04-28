import { Module } from "@nestjs/common";
import { AuthorsController } from "./authors.controller";
import { AuthorsService } from "./authors.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthorsSchema } from "./authors.model";
import { ProductsModule } from "src/products/products.module";//import module first
import { ProductSchema } from "../products/products.model";//then import the schema
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports:[MongooseModule.forFeature([{name:'Author', schema: AuthorsSchema}]),
    MongooseModule.forFeature([{name:'Product', schema: ProductSchema}]),ProductsModule,AuthModule],//import the product schema and module
    controllers: [AuthorsController],
    providers: [AuthorsService],
    exports:[AuthorsService,AuthorsModule],//export the service and the module
})
export class AuthorsModule {}