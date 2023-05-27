import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}

const Window: React.FC<IProps> = () => {
  return <div>Window</div>;
};
export default memo(Window);
Window.displayName = "Window";
