import React, { ReactNode, useState } from "react";
import { memo } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "./Battery";
interface IProps {
  children?: ReactNode;
  bg?: string;
  dark?: boolean;
  setDark?: (val: boolean) => void;
  brightness: number;
  setBrightness: (val: number) => void;
}

const ProtectMode: React.FC<IProps> = (props) => {
  const [state, setState] = useState(false);
  const { bg, dark, brightness, setBrightness } = props;
  return (
    <div
      className={`flex p-3 py-4 rounded-[13px] h-16 border shadow ${bg}`}
      onClick={() => {
        setState(!state);
        state ? setBrightness(brightness * 2) : setBrightness(brightness / 2);
      }}
    >
      <div
        className={cn(
          "flex-center w-8 h-8  text-center  rounded-full",
          state ? "bg-blue-600" : "bg-gray-200"
        )}
      >
        {state ? (
          <Eye size={16} color={state ? "white" : "black"} />
        ) : (
          <EyeOff size={16} color={state ? "white" : "black"} />
        )}
      </div>
      <h2
        className={`align-middle py-[5px] pl-2 whitespace-nowrap font-medium text-md ${
          dark ? "text-white" : "text-black"
        }`}
      >
        Eye Protection
      </h2>
    </div>
  );
};
export default memo(ProtectMode);
ProtectMode.displayName = "ProtectMode";
