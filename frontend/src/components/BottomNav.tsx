import { Home, Heart, Sun, Moon } from "lucide-react";
import { useSoundScapeStore } from "../store/useSoundScapeStore";

export default function TopNav() {
  const { theme, toggleTheme, setView, currentView } = useSoundScapeStore();

  return (
    <header className="hidden md:flex justify-between items-center py-4 px-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <h1 className="text-xl font-semibold text-indigo-600">SoundScape</h1>

      <div className="flex items-center gap-6">
        <button
          onClick={() => setView("home")}
          className={`text-sm ${
            currentView === "home"
              ? "text-indigo-500 font-semibold"
              : "text-gray-700 dark:text-gray-300 hover:text-indigo-400"
          }`}
        >
          <Home size={18} className="inline mr-1" />
          Home
        </button>

        <button
          onClick={() => setView("favorites")}
          className={`text-sm ${
            currentView === "favorites"
              ? "text-indigo-500 font-semibold"
              : "text-gray-700 dark:text-gray-300 hover:text-indigo-400"
          }`}
        >
          <Heart size={18} className="inline mr-1" />
          Favorites
        </button>

        <button
          onClick={toggleTheme}
          className="text-gray-700 dark:text-gray-300 hover:text-indigo-400"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
}
