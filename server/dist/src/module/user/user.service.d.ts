import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<import(".prisma/client").User>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").User[]>;
    findOne(id: string): Promise<import(".prisma/client").User>;
}
