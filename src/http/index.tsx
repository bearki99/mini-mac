import { io, Socket } from "socket.io-client";
import myAxios from "./myAxios";
import MyServer from "@/socket";
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

  // 获取用户的信息
  async getUser(_id: string): Promise<any> {
    const res = await myAxios({
      method: "get",
      url: `user?=id=${_id}`,
    });
    return res;
  },

  // 获取好友列表
  async getFriendList(): Promise<any> {
    const res = await myAxios({
      method: "get",
      url: "friend/list",
    });
    return res;
  },

  // 获取好友申请列表
  async getWaitConfirmFriend(): Promise<any> {
    const res = myAxios({
      method: "get",
      url: "friend/waitConfirm",
    });
    return res;
  },

  async createGroup(data: { name: string; notes?: string }): Promise<any> {
    const res = await myAxios({
      method: "put",
      url: "group/create",
      data,
    });
    return res;
  },

  async getGroup(_id: string) {
    const res = await myAxios({
      method: "get",
      url: `group?_id=${_id}`,
    });
    return res;
  },

  async getGroupList(): Promise<any> {
    const res = await myAxios({
      method: "get",
      url: `group/list`,
    });
    return res;
  },

  async addFriend(data: { friendId: string }): Promise<any> {
    const res = (await myAxios({
      method: "put",
      url: "friend",
      data,
    })) as any;
    return res;
  },

  async agreeFriend(data: { friendId: string }): Promise<any> {
    const res = (await myAxios({
      method: "post",
      url: "friend",
      data,
    })) as any;
    return res;
  },

  async joinGroup(data: { groupId: string }): Promise<any> {
    const res = (await myAxios({
      method: "put",
      url: "group",
      data,
    })) as any;
    return res;
  },

  async agreeGroup(data: { groupId: string; userId: string }): Promise<any> {
    const res = (await myAxios({
      method: "post",
      url: "group",
      data,
    })) as any;
    return res;
  },

  async getWaitConfirmGroup(): Promise<any> {
    const res = (await myAxios({
      method: "get",
      url: `group/waitConfirm`,
    })) as any;
    return res;
  },
  async getInfoList(data: any): Promise<any> {
    const res = (await myAxios({
      method: "post",
      url: "message/messageList",
      data,
    })) as any;
    return res;
  },
  //发送消息，data参数：{targetId: _id, targetType: number}
  async sendMessage(data: any): Promise<any> {
    const res = (await myAxios({
      method: "put",
      url: "message",
      data,
    })) as any;
    return res;
  },
  async getMessage(data: any): Promise<any> {
    const res = (await myAxios({
      method: "post",
      url: "message",
      data,
    })) as any;
    return res;
  },
};
