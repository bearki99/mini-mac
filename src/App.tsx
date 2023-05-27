import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import githubImage from "./public/img/ui/github.jpg";
import { useThemeStore } from "./store";
import GlobalGround from "./components/globalGround";
import Page from "./components/page";

function App() {
  const [brightness] = useThemeStore((state) => [state.brightness]);
  return (
    <GlobalGround>
      <div
        className="App overflow-hidden bg-center bg-cover"
        style={{
          backgroundImage: `url(${githubImage})`,
          width: "100vw",
          height: "100vh",
          filter: `brightness( ${(brightness as number) * 0.7 + 50}%)`,
        }}
      >
        <Header></Header>
        <Page />
        <Footer />
      </div>
    </GlobalGround>
  );
}

export default App;
