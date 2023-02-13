import { Module } from "@nestjs/common"
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from "src/users/users.service";
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "../users/users.model"
//import { LocalStrategy } from './local-strategy';
import { LocalStrategy } from './passport-strategies/local.strategy';
import { JwtStrategy } from "./passport-strategies/jwt.strategy";
import { UserAddressSchema } from "src/address.model";

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: 'secretKey',
    //signOptions: { expiresIn: '600s' },
  }), MongooseModule.forFeature([{ name: "user", schema: UserSchema },{ name: "useraddress", schema: UserAddressSchema }])],
  providers: [AuthService, UsersService, LocalStrategy,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }