import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Product } from "src/products/products.model";
import { SchemaTypes } from "mongoose";
import { Entity } from "typeorm";

export type CustomerDocument = Customer & Document;

//@Schema({})
@Entity()
export class Customer{

    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    phone: number;

    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Product' }] })
  products: Product[]; //make a reference to the product

}
export const CustomerSchema = SchemaFactory.createForClass(Customer)