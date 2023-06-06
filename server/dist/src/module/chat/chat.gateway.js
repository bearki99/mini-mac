"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const nestjs_prisma_1 = require("nestjs-prisma");
const socket_io_1 = require("socket.io");
const Constant_1 = require("../../common/Constant");
let ChatGateway = class ChatGateway {
    constructor(prisma) {
        this.prisma = prisma;
        this.defaultGroup = Constant_1.PUBLIC_ROOM;
        this.pageSize = Constant_1.PAGINATION;
        this.users = [];
    }
    handleConnection(client) {
        client.join(this.defaultGroup);
        this.getOnlineUsers(client);
        this.getMessages(client, { page: 1 });
    }
    handleDisconnect(client) {
        client.leave(this.defaultGroup);
        this.getOnlineUsers(client);
    }
    async getOnlineUsers(client) {
        const data = await this.getActiveUser();
        const orderData = data.sort((a, b) => b.role.length - a.role.length);
        client.emit('onlineUsers', orderData);
        client.to(Constant_1.PUBLIC_ROOM).emit('onlineUsers', orderData);
    }
    async getMessages(client, { page }) {
        const length = await this.prisma.message.count();
        const take = page * this.pageSize;
        const skip = (length - take < 0) ? 0 : (length - take);
        const messages = await this.prisma.message.findMany({
            include: {
                user: {
                    select: {
                        username: true,
                        avatar: true,
                        role: true,
                    },
                },
            },
            skip,
            take,
        });
        client.emit('getMessages', messages);
        return messages;
    }
    async createMessage(client, { message, type, userId, size, page }) {
        await this.prisma.message.create({
            data: {
                userId,
                roomId: Constant_1.PUBLIC_ROOM,
                content: message,
                type,
                size,
            },
        });
        const length = await this.prisma.message.count();
        const take = page * this.pageSize;
        const skip = (length - take < 0) ? 0 : (length - take);
        const messages = await this.prisma.message.findMany({
            include: {
                user: {
                    select: {
                        username: true,
                        avatar: true,
                        role: true,
                    },
                },
            },
            skip,
            take,
        });
        client.emit('getMessages', messages);
        client.to(Constant_1.PUBLIC_ROOM).emit('getMessages', messages);
    }
    async getActiveUser() {
        const sockets = await this.server.fetchSockets();
        const userIdArr = sockets.map(item => item.handshake.query.id);
        const uniqueUserIdArr = Array.from(new Set(userIdArr));
        const realUser = uniqueUserIdArr.filter(item => item !== undefined);
        const res = [];
        for (const userId of realUser) {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                    role: true,
                },
            });
            res.push(user);
        }
        return res;
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('onlineUsers'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getOnlineUsers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getMessages'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getMessages", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "createMessage", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(80, {
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map