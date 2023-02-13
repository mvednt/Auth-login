import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserAddress } from 'src/address.model';
import { ObjectId } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { profile } from 'console';
@Controller()
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService) { }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
    // @UseGuards(JwtAuthGuard)
    // @Get('profile')
    // getProfile(@Request() req) {
    //   return req.user;
    // }
    @Get('profile')
    async getProfile(@Request() req) {
    const userId = req.params.userId;
    const profile = await this.authService.getProfile(userId, present_address);
    return profile;
  }

    @UseGuards(JwtAuthGuard)
    @Post('address')
    async createAddress(
     @Body('present_address') present_address,
     @Request() req
    ) {
      var uid = req.user.userId
      
      return this.authService.createAddress(present_address,uid);
    }
    }