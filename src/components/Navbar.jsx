import { Link, useLocation } from "react-router-dom";
import { House, Moon, Sun, Workflow } from "lucide-react";

function Navbar({ isDark, toggleTheme }) {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <nav
      className={`flex w-full items-center border transition-colors duration-200 ${
        isHomePage
          ? `absolute left-1/2 top-4 z-20 w-70 max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full px-3 py-1.5 shadow-lg backdrop-blur-5xl min-[375px]:w-75 min-[425px]:w-[320px] min-[640px]:w-105 md:top-4 md:w-115 md:px-4 md:py-1 lg:top-4 lg:w-[calc(100%-2rem)] lg:max-w-2xl lg:px-8 lg:py-2 ${
              isDark
                ? "border-white/10 bg-gray-900/40 text-gray-100"
                : "border-gray-300/70 bg-white/40 text-gray-900"
            }`
          : `border-b px-5 py-1 md:px-6 ${
              isDark
                ? "border-gray-700 bg-gray-900 text-gray-100"
                : "border-gray-400 bg-gray-200 text-gray-900"
            }`
      }`}
    >
      <Link
        to="/"
        aria-label="JSON Graph - Home"
        className="flex items-center gap-2"
      >
        <Workflow
          className={`shrink-0 lg:size-6.25 ${
            isDark ? "text-[#BB8493]" : "text-[#704264]"
          }`}
        />

        <h1 className="text-base font-bold lg:text-xl">JSON Graph</h1>
      </Link>

      <div className="ml-auto flex items-center gap-1">
        <Link
          to="/"
          aria-label="Home"
          title="Home"
          className={`rounded-full p-2 transition-colors ${
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-300"
          }`}
        >
          <House size={18} className="lg:size-5.5" />
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Light Mode" : "Dark Mode"}
          title={isDark ? "Light Mode" : "Dark Mode"}
          className={`rounded-full p-2 transition-colors ${
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-300"
          }`}
        >
          {isDark ? (
            <Sun size={18} className="lg:size-5.5" />
          ) : (
            <Moon size={18} className="lg:size-5.5" />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
