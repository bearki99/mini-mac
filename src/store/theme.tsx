import { create } from "zustand";
//  对于主题状态的管理
interface themeState {
  dark: boolean;
  brightness: number;
  sound: number;
  color: string;
  setDark: (value: boolean) => void;
  setBrightness: (value: number) => void;
  setSound: (value: number) => void;
  setColor: (value: string) => void;
}

const useThemeStore = create<themeState>((set) => ({
  dark: false,
  brightness: 70,
  sound: 80,
  color: "#5388fc",
  setDark: (value) => set(() => ({ dark: value })),
  setBrightness: (value) => set(() => ({ brightness: value })),
  setSound: (value) => set(() => ({ sound: value })),
  setColor: (value) => set(() => ({ color: value })),
}));

export default useThemeStore;
