import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSoundScapeStore } from "./store/useSoundScapeStore";
import MoodSelector from "./components/MoodSelector";
import TrackList from "./components/TrackList";
import Player from "./components/Player";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import FavoritesView from "./components/FavoritesView";

function App() {
  // ✅ Include currentMood for dynamic background
  const { fetchWeatherMood, currentView, theme, currentMood } = useSoundScapeStore();

  // ✅ Mood → Gradient color mapping
  const moodGradients: Record<string, string> = {
    happy: "from-yellow-200 to-orange-300",
    chill: "from-blue-200 to-indigo-300",
    focus: "from-green-200 to-teal-300",
    calm: "from-cyan-100 to-blue-200",
    party: "from-pink-300 to-purple-400",
  };

  // ✅ Pick gradient based on current mood
  const currentGradient =
    moodGradients[currentMood as keyof typeof moodGradients] ||
    "from-gray-100 to-gray-200";

  // ✅ Apply theme and fetch weather-based mood
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    fetchWeatherMood();
  }, [theme]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${currentGradient} 
      dark:from-gray-800 dark:to-gray-900 
      text-gray-900 dark:text-gray-100 
      transition-colors duration-700`}
    >
      {/* 🌐 Top Navigation (Desktop) */}
      <TopNav />

      {/* 🌤 Main Page Section */}
      <motion.main
        key={currentView}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-4 max-w-5xl mx-auto pb-20"
      >
        {currentView === "home" ? (
          <>
            <MoodSelector />
            <TrackList />
          </>
        ) : (
          <FavoritesView />
        )}
      </motion.main>

      {/* 📱 Bottom Navigation (Mobile) */}
      <BottomNav />

      {/* 🎧 Music Player */}
      <Player />
    </div>
  );
}

export default App;
