import MyServer from "@/socket";
import { io, Socket } from "socket.io-client";
import myAxios from "./myAxios";
const { socket } = MyServer.getInstance();

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // 登录相关逻辑，登录成功时更新当前socket

  async login(data?: { name: string; pwd: string }): Promise<any> {
    const res = await myAxios({
      method: "post",
      url: "user",
      data,
    });
    socket.emit("login", res.data._id);
    return res;
  },

  // 注册相关逻辑
  async register(data: {
    name: string;
    pwd: string;
    checkPwd: string;
    email?: string;
  }): Promise<any> {
    const res = await myAxios({
      method: "put",
      url: "user",
      data,
    });
    return res;
  },

  //   寻找用户/群组逻辑
  async searchUser(data: {
    keyword: string;
    skip?: number;
    limit?: number;
  }): Promise<any> {
    const res = await myAxios({
      method: "post",
      url: "user/search",
      data,
    });
    return res;
  },

  async searchGroup(data: {
    keyword: string;
    skip?: number;
    limit?: number;
  }): Promise<any> {
    const res = await myAxios({
      method: "post",
      url: "group/search",
      data,
    });
    return res;
  },
};
