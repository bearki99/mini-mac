import { create } from "zustand";
interface ActiveUser {
  id: string;
  avatar: string;
  role: string;
  username: string;
}
interface useChatState {
  messages: any;
  // judge the new message is or not sent by you
  sentFlag: boolean;
  activeUsers: ActiveUser[];
  page: number;
  setSentFlag: (v: boolean) => void;
  setMessages: (v: ActiveUser[]) => void;
  setActiveUsers: (v: ActiveUser[]) => void;
  setPage: (v: number) => void;
}

const useChatStore = create<useChatState>((set) => ({
  messages: [],
  sentFlag: false,
  activeUsers: [],
  page: 1,
  setActiveUsers: (v: ActiveUser[]) =>
    set((s) => ({
      activeUsers: v,
    })),
  setMessages: (v: any[]) =>
    set((s) => ({
      messages: v,
    })),
  setSentFlag: (v: boolean) =>
    set((s) => ({
      sentFlag: v,
    })),
  setPage: (v: number) =>
    set((s) => ({
      page: v,
    })),
}));
export default useChatStore;
