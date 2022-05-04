import { useEffect, useState } from "react";
import Display from "./pages/Display";
import Header from "./components/Header";
import "./styles/app.scss";
import Preferences from "./pages/Preferences";
import { usePreferences } from "./lib/preferences";

type Page = "display" | "preferences";

function App() {
  const [page, setPage] = useState<Page>("display");
  const preferences = usePreferences();

  const switchPage = () => {
    if (page === "display") setPage("preferences");
    else setPage("display");
  };

  useEffect(() => {
    const font = preferences.get<string>("font", "");

    if (font.length > 0) {
      // Apply saved font
      document.body.style.fontFamily = font + ",sans-serif";
    }
  }, []);

  return (
    <div className="App">
      <Header onClick={switchPage} />
      {page === "display" ? <Display /> : <Preferences onReturn={switchPage} />}
    </div>
  );
}

export default App;
