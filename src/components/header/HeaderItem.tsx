import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
  clickHandler?: (value: boolean) => void;
  value?: boolean;
  Icon?: React.ReactNode;
}
const HeaderItem = ({
  Icon,
  clickHandler = () => {},
  value = false,
}: IProps) => {
  return (
    <div
      className="px-1 rounded hover:bg-gray-300"
      onClick={() => clickHandler(!value)}
    >
      {Icon}
    </div>
  );
};
export default memo(HeaderItem);
HeaderItem.displayName = "HeaderItem";
