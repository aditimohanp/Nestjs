import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiParam, ApiProperty } from "@nestjs/swagger";

@Schema({})
export class Customer{

    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    phone: number;

}
export const CustomerSchema = SchemaFactory.createForClass(Customer)