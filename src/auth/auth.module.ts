import { Module } from "@nestjs/common";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
      PassportModule.register({defaultStrategy: 'jwt'}),
      MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
      ConfigModule.forRoot(),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string| number>('JWT_EXPIRATION_TIME'),
          },

        }),
        inject: [ConfigService],
      })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule, AuthService, JwtStrategy],
  })
  export class AuthModule {}


        
