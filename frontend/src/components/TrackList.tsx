import { useSoundScapeStore } from "../store/useSoundScapeStore";
import MusicCard from "./MusicCard";
import { useState, useEffect } from "react";

export default function TrackList() {
  const { tracks, mood } = useSoundScapeStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mood) setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [mood, tracks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10 text-indigo-600">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!Array.isArray(tracks) || tracks.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-300 mt-6">
        {mood
          ? `Fetching ${mood} tracks or none found...`
          : "Select a mood to get recommendations!"}
      </p>
    );
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
      {tracks.map((track, index) => (
        <MusicCard key={track.id || index} track={track} />
      ))}
    </section>
  );
}
