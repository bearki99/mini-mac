import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}

const Footer: React.FC<IProps> = () => {
  return <div>Footer</div>;
};
export default memo(Footer);
Footer.displayName = "Footer";
