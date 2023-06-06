import { Socket } from "socket.io-client";
import { create } from "zustand";
interface useSocketStates {
  socket: Socket | null;
  setSocket: (v: Socket) => void;
}

const useSocketStore = create<useSocketStates>((set) => ({
  socket: null,
  setSocket: (v: Socket) =>
    set((_) => ({
      socket: v,
    })),
}));

export default useSocketStore;
