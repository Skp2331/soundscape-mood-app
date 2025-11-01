import { Play, Heart } from "lucide-react";
import { useSoundScapeStore } from "../store/useSoundScapeStore";
import { useState, useRef } from "react";

export default function MusicCard({ track }) {
  const { favorites, toggleFavorite } = useSoundScapeStore();
  const isFavorite = favorites.some((t) => t.id === track.id);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 flex flex-col items-center">
      <img
        src={track.album?.cover_medium}
        alt={track.title}
        className="rounded-xl mb-3 w-full object-cover"
      />
      <p className="font-semibold text-center">{track.title}</p>
      <p className="text-gray-500 text-sm mb-2">{track.artist?.name}</p>

      <div className="flex gap-3 mt-2">
        <button
          onClick={togglePlay}
          className="bg-blue-500 text-white px-3 py-2 rounded-full flex items-center gap-2"
        >
          <Play size={18} /> Play
        </button>
        <button
          onClick={() => toggleFavorite(track)}
          className={`px-3 py-2 rounded-full border ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700"
          }`}
        >
          <Heart size={18} />
        </button>
      </div>

      <audio ref={audioRef} src={track.preview}></audio>
    </div>
  );
}
