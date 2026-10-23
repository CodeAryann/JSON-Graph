import { Link } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";

function Home({ isDark }) {
  const backgroundStyle = {
    backgroundColor: isDark ? "#020617" : "#ffffff",
    backgroundImage: `
      linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
      radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
    `,
    backgroundSize: "40px 40px, 40px 40px, 100% 100%",
  };

  return (
    <main
      className={`relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-8 transition-colors duration-200 md:flex-row md:gap-6 md:px-8 md:pt-16 lg:gap-10 lg:px-16 ${
        isDark ? "text-gray-100" : "text-gray-900"
      }`}
    >
      {/* Grid and radial-glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={backgroundStyle}
      />

      {/* Hero text */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center text-center md:w-1/2 md:items-start md:text-left">
        <div
          className={`mb-5 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium lg:gap-2 lg:px-3 lg:py-1.5 lg:text-sm ${
            isDark
              ? "border-indigo-400/20 bg-indigo-400/10 text-[#90e0ef]"
              : "border-indigo-200 bg-indigo-50 text-[#0466c8]"
          }`}
        >
          <Sparkles
            size={14}
            className={`shrink-0 lg:size-4 ${
              isDark ? "text-amber-300" : "text-amber-500"
            }`}
          />
          <span>JSON visualization made simple</span>
        </div>

        <h1 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
          Turn JSON into an{" "}
          <span className="bg-linear-to-r from-[#49243E] via-[#704264] to-[#BB8493] bg-clip-text text-transparent">
            Interactive Visual Graph
          </span>
        </h1>

        <p
          className={`mt-5 max-w-lg text-base leading-7 md:text-lg ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Explore complex JSON structures through an interactive graph.
          Understand objects, arrays, and their relationships at a glance.
        </p>

        <Link
          to="/editor"
          className="mt-5 flex w-fit items-center gap-1 rounded-full border-0 bg-[#D5F365] px-5 py-3 text-sm font-bold text-[#063B00] transition-all duration-300 active:scale-[0.97] lg:gap-1 lg:px-8.25 lg:py-4 lg:text-base"
        >
          Go to Editor
          <ChevronRight size={18} className="lg:size-5" />
        </Link>
      </div>

      {/* JSON visualization preview */}
      <div className="relative z-10 mt-10 flex w-full justify-center md:mt-0 md:w-1/2">
        <div
          className={`w-full max-w-5xl overflow-hidden rounded-4xl border p-2 shadow-2xl ${
            isDark
              ? "border-white/10 bg-gray-900/30 shadow-black/30"
              : "border-gray-200/80 bg-white/40 shadow-gray-900/10"
          }`}
        >
          <img
            src={isDark ? "/Dark_img.png" : "/Light_img.png"}
            alt="JSONGraph visualization preview"
            className="block h-62.5 w-full rounded-xl object-contain md:h-87.5 lg:h-100"
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
