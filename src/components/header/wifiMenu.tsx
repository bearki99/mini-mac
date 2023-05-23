import React, { ReactNode, useRef } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
  dark: boolean;
  wifi: boolean;
  wifiMenuSwitch: (value: boolean) => void;
  wifiSwitch: (value: boolean) => void;
}

const WifiMenu = ({ dark, wifi, wifiSwitch, wifiMenuSwitch }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`absolute w-40 h-10 px-4 flex justify-between items-center rounded-md -left-28 top-7 ${
        dark ? "bg-black/40 text-white/80" : "bg-white/80 text-black"
      }`}
    >
      <div className="font-medium ">Wi-Fi</div>
    </div>
  );
};
export default memo(WifiMenu);
WifiMenu.displayName = "WifiMenu";
