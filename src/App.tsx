import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import githubDay from "./public/img/ui/wallpaper-day.jpg";
import githubNight from "./public/img/ui/wallpaper-night.jpg";
import { useAppsStore, useThemeStore } from "./store";
import GlobalGround from "./components/globalGround";
import Page from "./components/page";
import Launchpad from "./components/launchpad";

function App() {
  const [brightness, dark] = useThemeStore((state) => [
    state.brightness,
    state.dark,
  ]);
  const [max] = useAppsStore((state) => [state.max]);
  return (
    <GlobalGround>
      <div
        className="App overflow-hidden bg-center bg-cover"
        style={{
          backgroundImage: `url(${dark ? githubNight : githubDay})`,
          width: "100vw",
          height: "100vh",
          filter: `brightness( ${(brightness as number) * 0.7 + 50}%)`,
        }}
      >
        {!max && <Header />}
        <Page />
        <Launchpad />
        <Footer />
      </div>
    </GlobalGround>
  );
}

export default App;
