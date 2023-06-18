import { create } from "zustand";
import request from "@/http/index";

const useMessageStore = create((set, get) => ({
  message: {
    messageList: [],
    inChatRoom: false,
    from: "",
    id: "",
    type: "user",
  },
  saveMessage: () => {
    localStorage.setItem("message", JSON.stringify((get() as any).message));
  },
  unreadCount: () => {
    let count: number = 0;
    (get() as any).message.messageList.forEach((item: any) => {
      // count += item.unreadCount;
    });
    return count;
  },
  async initMessage() {
    const messageString = localStorage.getItem("message") || "";
    if (messageString) {
      const message = JSON.parse(messageString);
      try {
        let { data: messageList } = await request.getInfoList(
          message.messageList
        );
        messageList = messageList!.map((item: any, index: number) => {
          item.unreadCount = message.messageList[index].unreadCount || 0;
          return item;
        });
        set({
          message: {
            messageList: messageList || [],
            inChatRoom: false,
          },
        }, true);
      } catch (error) {
        set({ message: defaultMessage }, true);
      }
      return;
    }
    set({ message: defaultMessage }, true);
  },
  newSave: (obj: any) => {
    set({
      message: {
        messageList: obj,
        inChatRoom: false,
      },
    }, true);
  },
}));

const defaultMessage = {
  messageList: [],
  unreadCount: 0,
  inChatRoom: false,
};

export default useMessageStore;
