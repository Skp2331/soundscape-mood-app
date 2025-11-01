import { Sun, Moon, Heart } from "lucide-react";
import { useSoundScapeStore } from "../store/useSoundScapeStore";

export default function TopNav() {
  const { theme, toggleTheme, setView } = useSoundScapeStore();

  return (
    <header className="hidden md:flex justify-between items-center px-6 py-4 backdrop-blur-md bg-white/30 dark:bg-gray-800/30 shadow-sm">
      <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">SoundScape</h1>
      <nav className="flex items-center gap-4">
        <button
          onClick={() => setView("home")}
          className="hover:text-indigo-500 transition"
        >
          Home
        </button>
        <button
          onClick={() => setView("favorites")}
          className="hover:text-indigo-500 transition flex items-center gap-1"
        >
          <Heart size={18} /> Favorites
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </nav>
    </header>
  );
}
