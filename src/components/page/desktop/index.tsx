import { useAppsStore } from "@/store";
import { AnimatePresence } from "framer-motion";
import React, { ReactNode, Suspense } from "react";
import { memo } from "react";
import apps from "@/lib/apps";
import Window from "../window";
interface IProps {
  children?: ReactNode;
}

const DeskTop: React.FC<IProps> = () => {
  // 展示需要显示的应用
  const showApps = useAppsStore((s) => s.showApps);
  const renderApps = () => {
    return showApps.map((id) => {
      const appInfo = apps.filter((app) => app.id === id)[0];
      return (
        <Window key={appInfo.id} app={appInfo}>
          {appInfo.content}
        </Window>
      );
    });
  };
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <AnimatePresence>{renderApps()}</AnimatePresence>
      </Suspense>
    </>
  );
};
export default memo(DeskTop);
DeskTop.displayName = "DeskTop";
