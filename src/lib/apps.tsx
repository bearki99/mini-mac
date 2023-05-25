import React from "react";
import type { AppsData } from "./type";
import LinkWeb from "@/components/linkWeb";
const apps: AppsData[] = [
  {
    id: "launchpad",
    title: "Launchpad",
    img: "/img/icons/launchpad.png",
  },
  {
    id: "vscode",
    title: "VSCode",
    width: 860,
    height: 560,
    img: "/img/icons/vscode.png",
    content: (
      <LinkWeb src="https://github1s.com/ljq0226/turbomac" title="VSCode" />
    ),
  },
];

export default apps;
