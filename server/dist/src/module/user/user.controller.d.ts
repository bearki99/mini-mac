import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import(".prisma/client").User>;
    findOne(id: string): Promise<import(".prisma/client").User>;
}
