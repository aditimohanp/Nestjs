import { Module } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerSchema } from "./customer.model";
import { ProductsModule } from "src/products/products.module";
import { ProductSchema } from "src/products/products.model";


@Module({
    imports:[MongooseModule.forFeature([{name: 'Customer' , schema: CustomerSchema}]), 
    MongooseModule.forFeature([{name:'Product', schema: ProductSchema}]),ProductsModule,], // import the module
    controllers:[CustomerController],
    providers:[CustomerService],
    exports:[CustomerService, CustomerModule], // export classes
})
export class CustomerModule{}