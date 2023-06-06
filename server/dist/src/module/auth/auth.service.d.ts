import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "nestjs-prisma";
import { UserAuthDto } from "./dto/UserAuthDto";
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
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
