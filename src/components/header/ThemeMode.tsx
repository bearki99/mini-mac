import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
  bg: string;
  dark: boolean;
  setDark: (val: boolean) => void;
}

const ThemeMode: React.FC<IProps> = () => {
  return <div>ThemeMode</div>;
};
export default memo(ThemeMode);
ThemeMode.displayName = "ThemeMode";
