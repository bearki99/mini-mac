import { socketUrl } from "@/utils/url";
import { io, Socket } from "socket.io-client";

class MyServer {
  static myServer: MyServer;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  constructor() {
    this.socket = io(`${socketUrl}`, {
      transports: ["websocket"],
    });
  }
  //   单例模式运用
  static getInstance() {
    if (!MyServer.myServer) {
      MyServer.myServer = new MyServer();
    }
    return MyServer.myServer;
  }
}

export default MyServer;

interface ServerToClientEvents {
  receiveMessage: (data: MessageInfo) => void;
  receiveLiveMessage: (data: MessageInfo) => void;
  receiveApply: (data: User | Group) => void;
}

interface ClientToServerEvents {
  login: (_id: string) => void;
  initSocketRoom: (data: string[], type: string) => void;
}

interface MessageInfo {
  _id?: string;
  userId?: string;
  targetId?: string;
  targetType?: number;
  message: string;
  messageType?: number;
  time?: string;
  user?: User;
}

interface User extends Item {
  pwd: string;
  email: string;
  sex: number;
  state?: number;
  token?: string;
  birth?: string;
  phone?: string;
  friendState?: number;
  isApplicant?: boolean;
}

interface Item {
  _id: string;
  name: string;
  time: string;
  imgSrc?: string;
  notes?: string;
}

interface Group extends Item {
  userId: string;
  groupState?: number;
  creator?: User;
  userCount?: number;
}
