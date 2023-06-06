import { useThemeStore } from "@/store";
import React, { ReactNode } from "react";
import { memo, useRef } from "react";
interface IProps {
  children?: ReactNode;
}

const ChatWindow: React.FC<IProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dark = useThemeStore((s) => s.dark);
  const bg = dark ? "bg-[#1a1a1a]" : "bg-[#f2f2f2]";
  return <div>ChatWindow</div>;
};
export default memo(ChatWindow);
ChatWindow.displayName = "ChatWindow";
