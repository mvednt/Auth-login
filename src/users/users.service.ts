import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
    users: any;
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }
    async createUser(username: string, password: string): Promise<User> {
        return this.userModel.create({
            username,
            password,
            
        });
    }
    async getUser(query: object ): Promise<User> {
        return this.userModel.findOne(query);
    }
    async userlist(){
        return this.userModel.find();
    }
    
}
