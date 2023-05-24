import React, { ReactNode, useState } from "react";
import { memo } from "react";
import { cn } from "./Battery";
interface IProps {
  children?: ReactNode;
  title: string;
  Icon?: any;
}

const BluetoothItem: React.FC<IProps> = (props) => {
    const {title, Icon} = props;
    const [bluetooth, setBluetooth] = useState(false);
    return (
      <div className="flex p-2 space-x-2 h-1/3" onClick={() => setBluetooth(!bluetooth)}>
        <div
          className={cn(
            "w-[2rem] h-[2rem] rounded-full flex-center",
            bluetooth ? "bg-blue-600" : "bg-gray-200"
          )}
        >
          {<Icon size={16} color={bluetooth ? "white" : "black"} />}
        </div>
        <div className="space-y-1 leading-3">
          <p>{title}</p>
          <p>{bluetooth ? "On" : "Off"}</p>
        </div>
      </div>
    );
};
export default memo(BluetoothItem);
BluetoothItem.displayName = "BluetoothItem";
