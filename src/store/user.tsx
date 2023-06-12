
import { create } from "zustand";

interface useUserStates {
  userID: string;
  userName: string;
  setUserName: (v: string) => void;
}
const useUserStore = create<useUserStates>((set) => ({
  userID: "",
  userName: "",
  setUserName: (v: string) =>
    set((_) => ({
      userName: v,
    })),
}));

export default useUserStore;
