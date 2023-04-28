import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Customer } from "./customer.model";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./customer.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";



@ApiTags('customer')
@Controller('customer')
export class CustomerController {
   constructor ( private customerService : CustomerService) {}

    @Post()
    @ApiBody({description: 'add a customer', type: CreateCustomerDto,
            examples: { 'application/json': { value: { name: 'John' , address: 'mysore', phone : 111111 }, }, }, })
    
    async addCustomer(@Body()customer: CreateCustomerDto):Promise<Customer> {
        return this.customerService.createCustomer(customer)
    }

    @Get()
    async getAllCustomers(): Promise<Customer[]> {
        return this.customerService.findAll()
      
    }

    @Get(':id')
    async getCustomerById(@Param('id') id : string ): Promise<Customer> {
        return this.customerService.findById(id);
      
    }

   
}