import useWindowSize from "@/hooks/useWindowSize";
import { AppsData } from "@/lib/type";
import { useAppsStore } from "@/store";
import { useLocalStorageState } from "ahooks";
import React, { ReactNode, useEffect, useState, useRef } from "react";
import { memo } from "react";
import { motion } from "framer-motion";
import type { DragOptions } from "@neodrag/react";
import { useDraggable } from "@neodrag/react";
import { cn } from "@/components/header/Battery";
import Trafficheader from "../trafficheader";
interface IProps {
  app: AppsData;
  children: ReactNode;
}
interface IPos {
  x: number;
  y: number;
}
const Window: React.FC<IProps> = (props) => {
  const { app, children } = props;
  const draggableRef = useRef(null);
  const ZINDEX = 15;
  // 获取当前App窗口大小
  const { winWidth, winHeight } = useWindowSize();
  const isRotate = winWidth < 767;
  // 获取store
  const [max, setMax, focus, setFocus, minimizeApps, addMinimizeApps] =
    useAppsStore((s) => [
      s.max,
      s.setMax,
      s.focus,
      s.setFocus,
      s.minimizeApps,
      s.addMinimizeApps,
    ]);
  const [box, setBox] = useState({
    width: 0,
    height: 0,
  });
  const [position, setPosition] = useState({
    x: max
      ? 0
      : (isRotate ? winHeight : winWidth) * (Math.random() * 0.2 + 0.05),
    y: max
      ? 0
      : (isRotate ? winWidth : winHeight) * (Math.random() * 0.2 + 0.05),
  });
  // 获取App原本的位置
  const [lastPosition, setLastPosition] = useLocalStorageState(
    "LAST_POSITION",
    { defaultValue: position }
  );
  // 判断是否需要缩小
  const minimizeFlag = minimizeApps.includes(app.id);
  const handleMax = () => {
    setMax(app.id);
    setBox({
      width: isRotate ? winHeight : winWidth,
      height: isRotate ? winWidth : winHeight,
    });
    setLastPosition(position);
    setPosition({ x: 0, y: 0 });
  };
  const handleMin = () => {
    setMax("");
    setBox({
      width: Math.min(winWidth, app.width ? app.width : 540),
      height: Math.min(winHeight, app.height ? app.height : 450),
    });
    setPosition(lastPosition as IPos);
  };
  const options: DragOptions = {
    position,
    onDrag: ({ offsetX, offsetY }) =>
      setPosition({
        x: isRotate ? offsetY : offsetX,
        y: isRotate ? offsetX : offsetY,
      }),
    bounds: { bottom: -500, top: 32, left: -600, right: -600 },
    handle: ".window-header",
    cancel: ".traffic-lights",
    disabled: !!max,
  };
  useDraggable(draggableRef, options);
  useEffect(() => {
    setBox({
      width: max ? winWidth : Math.min(winWidth, app.width ? app.width : 540),
      height: max
        ? winHeight
        : Math.min(winHeight, app.height ? app.height : 450),
    });
    setFocus(app.id);
  }, [app.height, app.id, app.width, max, setFocus, winHeight, winWidth]);
  return (
    <motion.div
      ref={draggableRef}
      className={cn("absolute rounded-xl")}
      style={{
        width: `${box.width}px`,
        height: `${box.height}px`,
        zIndex: max ? 100 : focus === app.id ? ZINDEX + 1 : ZINDEX,
        visibility: minimizeFlag ? "hidden" : "visible",
      }}
      onClick={() => setFocus(app.id)}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      exit={{ opacity: 0, dur: 2000 }}
    >
      <motion.header
        className="absolute z-10 flex w-full bg-transparent h-7 window-header rounded-t-xl"
        onDoubleClick={max ? handleMin : handleMax}
        initial={{ opacity: 0.3, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <Trafficheader
          id={app.id}
          handleMax={handleMax}
          handleMini={handleMin}
          handleMinimize={() => addMinimizeApps(app.id)}
        />
      </motion.header>
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0.3, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
export default memo(Window);
Window.displayName = "Window";
