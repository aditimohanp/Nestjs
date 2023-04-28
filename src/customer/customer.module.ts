import { Module } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerSchema } from "./customer.model";

@Module({
    imports:[MongooseModule.forFeature([{name: 'Customer' , schema: CustomerSchema}]),],
    controllers:[CustomerController],
    providers:[CustomerService],
    exports:[CustomerService],
})
export class CustomerModule{}