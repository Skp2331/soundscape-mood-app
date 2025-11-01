import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useSoundScapeStore } from "../store/useSoundScapeStore";

export default function Player() {
  const {
    tracks,
    currentTrack,
    setCurrentTrack,
    isPlaying,
    togglePlay,
    addFavorite,
    favorites,
  } = useSoundScapeStore();

  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🔁 Sync playback state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio
        .play()
        .catch((err) => console.warn("Audio play interrupted:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // 📊 Update progress bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [currentTrack]);

  // ⏭ Handle track end → move to next
  const handleEnded = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack?.id);
    if (currentIndex !== -1 && tracks.length > 0) {
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentTrack(tracks[nextIndex]);
    }
  };

  // ⏮ Previous track
  const handlePrev = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack?.id);
    if (currentIndex !== -1 && tracks.length > 0) {
      const prevIndex =
        currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
      setCurrentTrack(tracks[prevIndex]);
    }
  };

  // ⏭ Next track
  const handleNext = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack?.id);
    if (currentIndex !== -1 && tracks.length > 0) {
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentTrack(tracks[nextIndex]);
    }
  };

  if (!currentTrack) return null;

  const isFavorite = favorites.some((f) => f.id === currentTrack.id);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-14 md:bottom-4 left-1/2 -translate-x-1/2 
                 bg-white dark:bg-gray-900 rounded-2xl shadow-xl 
                 p-4 flex items-center gap-4 w-[95%] md:w-[600px] 
                 border border-gray-200 dark:border-gray-700 z-50"
    >
      {/* 🎵 Album Art */}
      <img
        src={currentTrack.album?.cover_medium}
        alt={currentTrack.title}
        className="w-12 h-12 rounded-lg shadow-md object-cover"
      />

      {/* 🎶 Track Info + Progress */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold truncate">
          {currentTrack.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {currentTrack.artist?.name}
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded mt-2">
          <div
            className="h-1 bg-indigo-500 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* ⏯️ Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <SkipBack size={18} />
        </button>

        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-indigo-500 text-white hover:bg-indigo-600"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <button
          onClick={handleNext}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <SkipForward size={18} />
        </button>
      </div>

      {/* ❤️ Favorite Button */}
      <button
        onClick={() => addFavorite(currentTrack)}
        className={`p-2 rounded-full transition-colors ${
          isFavorite
            ? "text-red-500"
            : "text-gray-500 hover:text-red-400 dark:hover:text-red-400"
        }`}
      >
        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
      </button>

      {/* 🎧 Audio Element */}
      <audio ref={audioRef} src={currentTrack.preview} onEnded={handleEnded} />
    </motion.div>
  );
}
