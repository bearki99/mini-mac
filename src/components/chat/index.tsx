import {
  useChatStore,
  useSocketStore,
  useThemeStore,
  useUserStore,
} from "@/store";
import React, { ReactNode, useEffect } from "react";
import { memo } from "react";
import { io } from "socket.io-client";
import Chatwindow from "./c-cpns/chatwindow";
import Login from "./c-cpns/login";
interface IProps {
  children?: ReactNode;
}

const Chat: React.FC<IProps> = () => {
  const setMessages = useChatStore((s) => s.setMessages);
  const setActiveUsers = useChatStore((s) => s.setActiveUsers);
  const [socket, setSocket] = useSocketStore((s) => [s.socket, s.setSocket]);
  const dark = useThemeStore((s) => s.dark);
  let isLogin = localStorage.getItem("userInfo") === undefined;
  const [userInfo, setUserInfo] = useUserStore((s) => [
    s.userInfo,
    s.setUserInfo,
  ]);
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo") as string));
    const id = { ...JSON.parse(localStorage.getItem("userInfo") as string) }.id;
    const host = "http://localhost:80/";
    const newSocket = io(host, {
      query: {
        id,
      },
    });
    setSocket(newSocket);
  }, []);
  useEffect(() => {
    if (socket) {
      socket.connect();
      socket.on("connect", () => {});
      socket.on("getMessages", (data) => {
        if (data) setMessages(data);
      });
      socket.on("onlineUsers", (data) => {
        if (data) setActiveUsers(data);
      });
      socket.on("disconnect", () => {
        // do something
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);
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
