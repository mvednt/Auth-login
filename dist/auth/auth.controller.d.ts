import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UsersService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    createAddress(present_address: any, req: any): Promise<any>;
}
