import type { AppsData } from "./type";
import LinkWeb from "@/components/linkWeb";
import ChatGPT from "@/components/chatgpt";
import Camera from "@/components/camera";
import Terminal from "@/components/terminal"
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
    content: <LinkWeb src="https://github1s.com/" title="VSCode" />,
  },
  {
    id: "chatgpt",
    title: "ChatGPT",
    width: 440,
    height: 580,
    img: "/img/icons/chatgpt.png",
    content: <ChatGPT />,
  },
  {
    id: 'facetime',
    title: 'FaceTime',
    img: 'img/icons/facetime.png',
    height: 530,
    content: <Camera/>,
  },
  {
    id: "terminal",
    title: "Terminal",
    width: 600,
    height: 540,
    img: "/img/icons/terminal.png",
    content: <Terminal />,
  },
  {
    id: "email",
    title: "Mail",
    img: "/img/icons/mail.png",
    content: <></>,
  },
  {
    id: "github",
    title: "Github",
    img: "/img/icons/github.png",
    link: "https://github.com/",
    content: <></>,
  },
];

export default apps;
