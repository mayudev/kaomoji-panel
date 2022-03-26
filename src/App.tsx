import React, { useState } from "react";
import Display from "./pages/Display";
import Header from "./components/Header";
import "./styles/app.scss";
import Preferences from "./pages/Preferences";

type Page = "display" | "preferences";

function App() {
  const [page, setPage] = useState<Page>("display");

  const switchPage = () => {
    if (page === "display") setPage("preferences");
    else setPage("display");
  };

  return (
    <div className="App">
      <Header onClick={switchPage} />
      {page === "display" ? <Display /> : <Preferences />}
    </div>
  );
}

export default App;
