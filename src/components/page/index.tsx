import React, { ReactNode } from "react";
import { memo } from "react";
import Desktop from "./desktop";
interface IProps {
  children?: ReactNode;
}

const Page: React.FC<IProps> = () => {
  return (
    <>
      <Desktop />
    </>
  );
};
export default memo(Page);
Page.displayName = "Page";
