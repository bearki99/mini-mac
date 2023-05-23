import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import githubImage from "./public/img/ui/github.jpg";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${githubImage})`,
        width: "100vw",
        height: "100vh",
        backgroundPosition: "center center",
        backgroundSize: "contain",
      }}
    >
      <Header></Header>
      <Footer />
    </div>
  );
}

export default App;
