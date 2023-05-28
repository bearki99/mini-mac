import React from "react";
import { EarIcon} from "lucide-react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { memo } from "react";
interface IProps {
  sound: number;
  setSound: (val: number) => void;
}

const SoundSlider: React.FC<IProps> = (props) => {
  const { sound, setSound } = props;
  return (
    <div className="flex flex-col p-2 m-2 rounded-[13px] bg-white/50">
      <div className="flex w-full slider">
        <div className="flex items-center justify-center bg-gray-100 border-gray-300 rounded-l-full w-7 h-7">
          <EarIcon size={16} color="black" />
        </div>
        <Slider
          min={1}
          max={100}
          value={sound}
          tooltip={false}
          orientation="horizontal"
          onChange={(v: number) => setSound(v)}
          className="w-full"
        />
      </div>
    </div>
  );
};
export default memo(SoundSlider);
SoundSlider.displayName = "SoundSlider";
