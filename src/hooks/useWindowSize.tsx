import { useEffect, useState } from "react";
export default function useWindowSize() {
  let width = 800,
    height = 600;
  if (typeof window !== "undefined") {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  const [state, setState] = useState({
    winWidth: width,
    winHeight: height,
  });
  useEffect(() => {
    const handler = () => {
      setState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
      });
    };
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);
  return state;
}
