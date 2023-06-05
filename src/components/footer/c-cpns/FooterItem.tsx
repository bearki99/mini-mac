import React, { useRef, useEffect, useState} from "react";
import { memo } from "react";
import type { MotionValue } from "framer-motion";
import { motion } from "framer-motion";
import type { AppsData } from "@/lib/type";
import useDockHoverAnimation from "@/hooks/useDockHoverAnimation";
import { useLaunchpadStore, useAppsStore } from "@/store";
interface IProps {
  app: AppsData;
  mouseX: MotionValue;
  openApp: (id: string) => void;
  isOpen: (id: string) => boolean;
  setShowLaunchpad: (v: boolean) => void;
  dockSize: number;
  dockMag: number;
}

const FooterItem: React.FC<IProps> = (props) => {
  const { app, mouseX, openApp, dockSize, dockMag, isOpen } = props;
  const imgRef = useRef<HTMLImageElement>(null);
  const { width } = useDockHoverAnimation(mouseX, imgRef, dockSize, dockMag);
  const bannedApp: string[] = [];
  const show = useLaunchpadStore((s) => s.show);
  const setShow = useLaunchpadStore((s) => s.setShow);
  const removeMinimizeApps = useAppsStore((s) => s.removeMinimizeApps);
  const miniMizeApps = useAppsStore((s) => s.minimizeApps);
  const [id, setID] = useState('');
  

  const dockItemClick = () => {
    if (app.id === "launchpad") {
      setShow(!show);
    } else if (!bannedApp.includes(app.id) && app.id !== 'github' && app.id !== 'email') {
      const isMinimize = miniMizeApps.includes(app.id);
      if (isMinimize) {
        removeMinimizeApps(app.id);
        return;
      }
      if (app.id === "turbochat") id ? openApp("turbochat") : openApp("login");
      else openApp(app.id);
    } else if (app.id === "email") {
    }
  };
  useEffect(() => {
    setID({ ...JSON.parse(localStorage.getItem("userInfo") as string) }.id);
  }, []);
  return (
    <>
      {app.id !== "login" && (
        <li
          id={`dock-${app.id}`}
          onClick={dockItemClick}
          className="flex flex-col items-center justify-end mb-1 transition duration-150 ease-in origin-bottom"
        >
          <p className="absolute px-3 py-1 text-sm text-black rounded-md tooltip bg-gray-300/80">
            {app.title}
          </p>
          {app.link ? (
            <a href={app.link} target="_blank" rel="noreferrer">
              <motion.img
                className="w-12 rounded-md appLink"
                ref={imgRef}
                src={app.img}
                alt={app.title}
                title={app.title}
                draggable={false}
                style={{ width, willChange: "width" }}
              />
            </a>
          ) : (
            <motion.img
              className="w-12 rounded-md appLink"
              ref={imgRef}
              src={app.img}
              alt={app.title}
              title={app.title}
              draggable={false}
              style={{ width, willChange: "width" }}
            />
          )}
          <div
            className={`h-1 w-1 m-0 rounded-full bg-white/40 ${
              isOpen(app.id) || bannedApp.includes(app.id) ? "" : "invisible"
            }`}
          />
        </li>
      )}
    </>
  );
};
export default memo(FooterItem);
FooterItem.displayName = "FooterItem";
