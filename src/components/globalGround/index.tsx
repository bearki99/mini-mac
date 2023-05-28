import React, { ReactNode, useRef, useEffect, useState } from "react";
import ContextMenu from "../contextMenu";
import { useAlertStore, useThemeStore } from "@/store";
import AlertMessage from "../alertMessage";
import { memo } from "react";
interface IProps {
  children: ReactNode;
}

const GlobalGround: React.FC<IProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [brightness] = useThemeStore((s) => [s.brightness]);
  const useAlert = useAlertStore((s) => s.useAlert);
  const [menu, setMenuStyle] = useState(false);
  const [pagePosition, setPagePosition] = useState({
    pageX: -999,
    pageY: -999,
  });
  const bgRef = useRef(null);
  const contextMenu = (e: MouseEvent) => {
    setMenuStyle(true);
    setPagePosition({ pageX: e.pageX, pageY: e.pageY });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAlert("success", "Welcome to my Mac!");
    // 禁用window区域右键默认菜单弹窗
    window.oncontextmenu = function (e) {
      e.preventDefault();
    };
    const desktop: any = bgRef.current;
    desktop.addEventListener("contextmenu", contextMenu);
    return () => {
      desktop.removeEventListener("contextmenu", contextMenu);
    };
  }, [useAlert]);
  return (
    <div
      className="relative flex flex-col w-full h-full overflow-hidden bg-center bg-cover"
      ref={bgRef}
      style={{
        // backgroundImage: `url(${wallpapers.github})`,
        filter: `brightness( ${(brightness as number) * 0.7 + 50}%)`,
      }}
    >
      <AlertMessage />
      {children}
      {menu && (
        <ContextMenu setMenuStyle={setMenuStyle} pagePosition={pagePosition} />
      )}
    </div>
  );
};
export default memo(GlobalGround);
GlobalGround.displayName = "GlobalGround";
