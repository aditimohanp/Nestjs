import { Module } from "@nestjs/common";
import { Mygateway } from "./gateway";

@Module({
    providers:[Mygateway]
})
export class GatewayModule{}