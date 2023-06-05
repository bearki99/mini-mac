import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}

const Safari: React.FC<IProps> = () => {
  return (
    <div className="w-full h-full bg-[#343540] rounded-lg shadow-lg">
     <div className="pt-6"></div>
      Safari
    </div>
  );
};
export default memo(Safari);
Safari.displayName = "Safari";
