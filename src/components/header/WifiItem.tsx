import React, { ReactNode } from "react";
import { Wifi } from "lucide-react";
import { useControlStore } from "../../store";
import { cn } from "./Battery";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}

const WifiItem: React.FC<IProps> = () => {
  const wifi = useControlStore((s) => s.wifi);
  const wifiSwitch = useControlStore((s) => s.wifiSwitch);
  return (
    <div className="flex p-2 space-x-2 h-1/3" onClick={() => wifiSwitch(!wifi)}>
      <div
        className={cn(
          "w-[2rem] h-[2rem] rounded-full flex-center",
          wifi ? "bg-blue-600" : "bg-gray-200"
        )}
      >
        {<Wifi size={16} color={wifi ? "white" : "black"} />}
      </div>
      <div className="space-y-1 leading-3">
        <p>{"Wi-Fi"}</p>
        <p>{wifi ? "On" : "Off"}</p>
      </div>
    </div>
  );
};
export default memo(WifiItem);
WifiItem.displayName = "WifiItem";
