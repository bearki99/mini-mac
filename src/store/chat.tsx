import { create } from "zustand";
import request from "@/http/index";

const useChatStore = create((set) => ({
  friendList: [] as any[],
  groupList: [] as any[],
  waitConfirmFriend: [] as any[],
  waitConfirmGroup: [] as any[],
  updateFriendList: async () => {
    try {
      const res = await request.getFriendList();
      set({ friendList: res.data! });
    } catch (error) {}
  },
  updateGroupList: async () => {
    try {
      const res = await request.getGroupList();
      set({ groupList: res.data! });
    } catch (error) {}
  },
  updateWaitConfirmFriend: async () => {
    try {
      const res = await request.getWaitConfirmFriend();
      set({ waitConfirmFriend: res.data! });
    } catch (error) {}
  },
  updateWaitConfirmGroup: async () => {
    try {
      const res = await request.getWaitConfirmGroup();
      set({ waitConfirmGroup: res.data! });
    } catch (error) {}
  },
}));

export default useChatStore;
