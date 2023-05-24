import React, { ReactNode } from "react";
import { memo } from "react";
import { Moon, Sun } from "lucide-react";
interface IProps {
  children?: ReactNode;
  bg: string;
  dark: boolean;
  setDark: (val: boolean) => void;
}

const ThemeMode: React.FC<IProps> = (props) => {
  const { bg, dark, setDark } = props;
  return (
    <div
      className={`flex p-3 py-4 rounded-[13px] h-16 border shadow ${bg}`}
      onClick={() => setDark(!dark)}
    >
      <div
        className={`w-8 h-8 flex-center rounded-full ${
          dark ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        {dark ? <Moon size={16} /> : <Sun size={16} />}
      </div>
      <h2
        className={`align-middle py-[5px] pl-2 font-medium text-md ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {dark ? "Dark Mode" : "Light Mode"}
      </h2>
    </div>
  );
};
export default memo(ThemeMode);
ThemeMode.displayName = "ThemeMode";
