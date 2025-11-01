import { useSoundScapeStore } from "../store/useSoundScapeStore";
import MusicCard from "./MusicCard";

export default function FavoritesView() {
  const { favorites } = useSoundScapeStore();

  if (!favorites.length)
    return (
      <p className="text-gray-600 dark:text-gray-300 mt-6">
        You haven’t added any favorites yet ❤️
      </p>
    );

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
      {favorites.map((track) => (
        <MusicCard key={track.id} track={track} />
      ))}
    </section>
  );
}
