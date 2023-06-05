import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}

const Chat: React.FC<IProps> = () => {
  return <div>Chat</div>;
};
export default memo(Chat);
Chat.displayName = "Chat";
