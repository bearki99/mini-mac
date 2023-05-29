import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}

const Camera: React.FC<IProps> = () => {
  return <div>Camera</div>;
};
export default memo(Camera);
Camera.displayName = "Camera";
