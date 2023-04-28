import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./customer.model";
import * as mongoose from "mongoose";

@Injectable()
export class CustomerService{

    constructor(
        @InjectModel(Customer.name)
        private customerModel: mongoose.Model<Customer> ){}

    async createCustomer(customer: Customer): Promise<Customer>{
        const res = await this.customerModel.create(customer);
        return res;
    }    

    async findAll(): Promise<Customer[]> {
        const customer = await this.customerModel.find();
        return customer;
    }

    async findById(id: string): Promise<Customer> {
        const customer = await this.customerModel.findById(id);
        if(!customer){
            throw new NotFoundException('customer not present')
        }
        return customer;
    }
}