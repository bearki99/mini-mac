import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/UserAuthDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: UserAuthDto, req: any): Promise<{
        token: string;
        userInfo: {
            id: string;
            username: string;
            avatar: string;
            role: string;
            createdAt: Date;
        };
        msg: string;
    }>;
    register(user: UserAuthDto): Promise<import(".prisma/client").User>;
}
