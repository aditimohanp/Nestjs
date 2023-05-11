import mongoose from "mongoose";

export class CreateCustomerDto {
    readonly name: string;

    address: string;

    readonly phone: number;

    products:mongoose.Types.ObjectId[]; // added a product field in the schema
}