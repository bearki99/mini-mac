import React, { ReactNode, useRef } from "react";
import { memo } from "react";
import useClickAway from "ahooks/lib/useClickAway";
import { useThemeStore, useControlStore } from "../../store";
import whiteApple from "../../public/img/icons/apple-white.png";
import blackApple from "../../public/img/icons/apple-black.png";
import { Wifi, WifiOff, ArrowLeftRight } from "lucide-react";
import HeaderItem from "./HeaderItem";
import WifiMenu from "./wifiMenu";
import Battery from "./Battery";
import ControlerCenter from "./ControlerCenter";
import CurrentTime from "./currentTime";
interface IProps {
  children?: ReactNode;
}

const Header: React.FC<IProps> = () => {
  const [dark, setDark, brightness, setBrightness, sound, setSound] =
    useThemeStore((state) => [
      state.dark,
      state.setDark,
      state.brightness,
      state.setBrightness,
      state.sound,
      state.setSound,
    ]);
  const [
    wifi,
    wifiSwitch,
    showWifiMenu,
    wifiMenuSwitch,
    showControlCenter,
    controlCenterSwitch,
  ] = useControlStore((state) => [
    state.wifi,
    state.wifiSwitch,
    state.showWifiMenu,
    state.wifiMenuSwitch,
    state.showControlCenter,
    state.controlCenterSwitch,
  ]);
  const backgroundImage = dark ? `url(${whiteApple})` : `url(${blackApple})`;
  const wifiRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  useClickAway(() => wifiMenuSwitch(false), wifiRef);
  useClickAway(() => {
    controlCenterSwitch(false);
  }, controlRef);
  return (
    <>
      <div
        className={`w-full h-8 px-2  top-0  z-50 text-sm backdrop-blur-2xl shadow transition select-none
       flex justify-between font-medium ${
         dark ? "text-white" : "text-black"
       }`}
       style={{
        backgroundColor: 'rgb(243 244 246 / 0.3)'
       }}
      >
        {/* apple icon */}
        <div className=" flex justify-center w-[30px] items-center  relative  hover:bg-gray-400 ">
          <div
            style={{
              backgroundImage: backgroundImage,
              width: "70%",
              height: "70%",
              backgroundPosition: "center center",
              backgroundSize: "100% 100%",
            }}
          />
        </div>
        {/* flex empty block */}
        <div className="flex-1"></div>
        {/* right */}
        <div className="flex items-center justify-end h-full space-x-2">
          {/* wifi模块 */}
          <div className="relative" ref={wifiRef}>
            {wifi ? (
              <HeaderItem
                clickHandler={wifiMenuSwitch}
                value={showWifiMenu}
                Icon={<Wifi size={16} color={dark ? "#fff" : "#000"} />}
              />
            ) : (
              <HeaderItem
                clickHandler={wifiMenuSwitch}
                value={showWifiMenu}
                Icon={<WifiOff size={16} color={dark ? "#fff" : "#000"} />}
              />
            )}
            {showWifiMenu && (
              <WifiMenu
                wifi={wifi}
                wifiSwitch={wifiSwitch}
                wifiMenuSwitch={wifiMenuSwitch}
                dark={dark}
              />
            )}
          </div>
          {/* 电池模块 */}
          <Battery dark={dark} />
          {/* 控制面板模块 */}
          <div className="relative">
            <div ref={controlRef}>
              <HeaderItem
                clickHandler={controlCenterSwitch}
                value={showControlCenter}
                Icon={
                  <ArrowLeftRight size={16} color={dark ? "#fff" : "#000"} />
                }
              />
              {showControlCenter && (
                <ControlerCenter
                  dark={dark}
                  setDark={setDark}
                  brightness={brightness}
                  setBrightness={setBrightness}
                  sound={sound}
                  setSound={setSound}
                  controlCenterSwitch={controlCenterSwitch}
                />
              )}
            </div>
          </div>
          {/* 日期显示模块 */}
          <CurrentTime dark={dark} />
        </div>
      </div>
    </>
  );
};
export default memo(Header);
Header.displayName = "Header";
