import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Customer } from "./customer.model";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./customer.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
    constructor(@InjectModel(Customer.name) private readonly CustomerModel: Model<Customer>,
                private customerService : CustomerService) {}

    @Post()
    @ApiBody({description: 'add a customer', type: CreateCustomerDto, //decorators
            examples: { 'application/json': { value: { name: 'John' , address: 'mysore', phone : 111111 }, }, }, })
    
    async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
      const customer = new this.CustomerModel(createCustomerDto);
        const savedCustomer = await customer.save();
        return savedCustomer;
    }       Customer

    @Get()
    async getAllCustomers(): Promise<Customer[]> {
        return this.customerService.findAll()
      
    }

    @Get(':id')
    async getCustomerById(@Param('id') id : string ): Promise<Customer> {
        return this.customerService.findById(id);
      
    }  

    
}