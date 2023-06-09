import {
  useChatStore,
  useSocketStore,
  useUserStore,
} from "@/store";
import React, { ReactNode, useEffect } from "react";
import { memo } from "react";
import { io } from "socket.io-client";
import Chatwindow from "./c-cpns/chatwindow";
interface IProps {
  children?: ReactNode;
}

const Chat: React.FC<IProps> = () => {
  const [socket, setSocket] = useSocketStore((s) => [s.socket, s.setSocket]);
  const [setUserInfo] = useUserStore((s) => [
    s.setUserInfo,
  ]);
  return (
    <>
      <div className="flex h-full backdrop-blur-sm">
        {socket !== null && socket !== undefined && <Chatwindow />}
      </div>
    </>
  );
};
export default memo(Chat);
Chat.displayName = "Chat";
