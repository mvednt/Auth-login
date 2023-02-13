import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
//import { Address } from 'src/address.model';
//import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class UsersController {
    databaseService: any;
    constructor(private readonly usersService: UsersService) { }

    @Post('/signup')
    async createUser(
        @Body('password') password: string,
        @Body('username') username: string,
        //@Body('address') address: Address,
    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        console.log(hashedPassword)
        const result = await this.usersService.createUser(
            username,
            hashedPassword,
            
            );
        return result;
    }
    @UseGuards(JwtAuthGuard)
    @Get('/userlist')
    async userlist(){
        return await this.usersService.userlist();
    }
}