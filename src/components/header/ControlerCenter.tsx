import React from "react";
import { memo } from "react";
import WifiItem from "./WifiItem";
import { Bluetooth, Expand } from "lucide-react";
import BluetoothItem from "./BluetoothItem";
import FullScreenItem from "./FullScreenItem";
import ThemeMode from "./ThemeMode";
import ProtectMode from "./ProtectMode";
import LightSlider from "./LightSlider";
import SoundSlider from "./SoundSlider";
interface IProps {
  dark: boolean;
  brightness: number;
  sound: number;
  setBrightness: (value: number) => void;
  setSound: (value: number) => void;
  setDark: (value: boolean) => void;
  controlCenterSwitch: (value: boolean) => void;
}

const ControlerCenter = ({
  dark,
  setDark,
  brightness,
  setBrightness,
  sound,
  setSound,
  controlCenterSwitch,
}: IProps) => {
  const bg = dark ? "bg-[#2d3440]/90 border-gray-500" : "bg-white/50";

  return (
    <div
      className={`absolute p-3 select-none rounded-[13px] w-80 h-76 top-7 -left-64 flex flex-col shadow ${
        dark ? "bg-[#1a2133]/90 " : "bg-white/40"
      }`}
    >
      <div className="flex w-full ">
        <div
          className={`flex flex-col mr-3 rounded-[13px] border shadow w-40 h-36 ${bg}`}
        >
          {/* Wifi/蓝牙/切换全屏 */}
          <WifiItem />
          <BluetoothItem title="Bluetooth" Icon={Bluetooth} />
          <FullScreenItem title="FullScreen" Icon={Expand} />
        </div>

        <div className="flex flex-col w-40 h-3 space-y-3 shadow">
          {/* Change Mode */}
          <ThemeMode bg={bg} dark={dark} setDark={setDark} />
          <ProtectMode
            bg={bg}
            dark={dark}
            setDark={setDark}
            brightness={brightness}
            setBrightness={setBrightness}
          />
        </div>
      </div>
      {/* 调整亮度和音量 */}
      <div
        className={`flex flex-col justify-center rounded-[13px] border shadow h-36 ${bg} mt-4`}
      >
        {/* 调整亮度滚动条 */}
        <LightSlider light={brightness} setLight={setBrightness} />
        {/* 调整音量滚动条 */}
        <SoundSlider sound={sound} setSound={setSound} />
      </div>
    </div>
  );
};
export default memo(ControlerCenter);
ControlerCenter.displayName = "ControlerCenter";
