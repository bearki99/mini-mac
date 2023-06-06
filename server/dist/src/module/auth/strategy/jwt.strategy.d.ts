import { Strategy } from 'passport-jwt';
import { PrismaService } from 'nestjs-prisma';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate({ sub }: {
        sub: any;
    }): Promise<import(".prisma/client").User>;
}
export {};
