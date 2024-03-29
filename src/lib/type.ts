export interface AppsData {
  id: string;
  title: string;
  img: string;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  content?: JSX.Element;
  link?: string;
}

export interface TerminalData {
  id: string;
  title: string;
  type: string;
  content?: JSX.Element | string;
  children: TerminalData[];
}
