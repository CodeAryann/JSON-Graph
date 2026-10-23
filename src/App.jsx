import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Navbar from "./components/Navbar";

function App() {
  const [isDark, setIsDark] = useState(false);

  function toggleTheme() {
    setIsDark((previousTheme) => !previousTheme);
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar isDark={isDark} toggleTheme={toggleTheme} />
                <Home isDark={isDark} />
              </>
            }
          />

          <Route
            path="/editor"
            element={
              <div className="flex h-dvh flex-col overflow-hidden">
                <Navbar isDark={isDark} toggleTheme={toggleTheme} />
                <Editor isDark={isDark} />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
