import { socketUrl } from "@/utils/url";
import { io, Socket } from "socket.io-client";

class MyServer {
  static myServer: MyServer;
  socket: Socket;
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
