import { useSoundScapeStore } from "../store/useSoundScapeStore";

const moods = ["chill", "happy", "focus", "party", "calm", "lofi"];

export default function MoodSelector() {
  const { fetchMusic } = useSoundScapeStore(); // ✅ Correct name

  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
        Choose a Mood 🎧
      </h2>
      <div className="flex flex-wrap gap-3">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => fetchMusic(mood)} // ✅ Correct function
            className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </button>
        ))}
      </div>
    </section>
  );
}
