import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { PrismaService } from "nestjs-prisma";
import { Server, Socket } from "socket.io";
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private prisma;
    constructor(prisma: PrismaService);
    server: Server;
    defaultGroup: string;
    pageSize: number;
    users: string[];
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    getOnlineUsers(client: Socket): Promise<void>;
    getMessages(client: Socket, { page }: {
        page: number;
    }): Promise<(import(".prisma/client").Message & {
        user: {
            username: string;
            avatar: string;
            role: string;
        };
    })[]>;
    createMessage(client: Socket, { message, type, userId, size, page, }: {
        message: string;
        type: string;
        userId: string;
        size: string;
        page: number;
    }): Promise<void>;
    getActiveUser(): Promise<any[]>;
}
