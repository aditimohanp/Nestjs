import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./customer.model";
import * as mongoose from "mongoose";
import { Product } from "src/products/products.model";
import { Model } from "mongoose";


@Injectable()
export class CustomerService{
    productService: any;

    constructor(
        @InjectModel(Customer.name)
        private customerModel: mongoose.Model<Customer>,
        @InjectModel('Product') private readonly productModel: Model<Product> // inject the product model
        ) {}

        async createCustomer(customer: Customer): Promise<Customer> {
            const products = await this.productService.findAll();
            customer.products = products.map((product) => product._id);
            const res = await this.customerModel.create(customer);
            return res; //map the the customer-product to include products
          }   

    async findAll(): Promise<Customer[]> {
        const customer = await this.customerModel.find().populate('products'); // populate
        return customer;
    }

    async findById(id: string): Promise<Customer> {
        const customer = await this.customerModel.findById(id).populate('products');
        if(!customer){
            throw new NotFoundException('customer not present')
        }
        return customer;
    }
}