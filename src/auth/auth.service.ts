import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
//import { Address } from 'src/address.model';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserAddress, UserAddressDocument } from 'src/address.model';
import { profile } from 'console';

@Injectable()
export class AuthService {
    userModel: any;
    //addressModel: any;
    constructor(@InjectModel('useraddress') private addressModel: Model<UserAddressDocument>,private readonly usersService: UsersService, private jwtService: JwtService, ) { }
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUser({ username });
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async createAddress(presentaddress,userid): Promise<any> {
        console.log (presentaddress)
        console.log (userid)
        var uaddressdata = {'present_address':presentaddress,'user_id':userid};
            const newAddress = new this.addressModel(uaddressdata);
            return await newAddress.save();
            
    // async addAddress(presentaddress,userid): Promise<any> {
    //     const newAddress = new this.addressModel(presentaddress,userid);
    //     return await newAddress.save();
    //}
}

    async getProfile(userId: string,presentaddress) {
        console.log (presentaddress)
        console.log (userId)
        const user = await this.userModel.findById(userId).exec();
        const addresses = await this.addressModel.find(presentaddress);

        return {userId, addresses};
}
}