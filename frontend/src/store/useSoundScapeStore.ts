import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useSoundScapeStore = create(
  persist(
    (set, get) => ({
      // 🌤 App state
      tracks: [],
      favorites: [],
      currentTrack: null,
      currentTrackIndex: 0,
      isPlaying: false,
      theme: "light",
      currentView: "home",

      // 🌈 UI Actions
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          document.documentElement.classList.toggle("dark", newTheme === "dark");
          return { theme: newTheme };
        }),

      setView: (view) => set({ currentView: view }),

      // 🎧 Music Actions
      setTracks: (tracks) => set({ tracks }),

      setCurrentTrack: (track) => set({ currentTrack: track, isPlaying: true }),

      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

      nextTrack: () => {
        const { currentTrackIndex, tracks } = get();
        if (tracks.length > 0) {
          const nextIndex = (currentTrackIndex + 1) % tracks.length;
          set({
            currentTrackIndex: nextIndex,
            currentTrack: tracks[nextIndex],
            isPlaying: true,
          });
        }
      },

      prevTrack: () => {
        const { currentTrackIndex, tracks } = get();
        if (tracks.length > 0) {
          const prevIndex =
            currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
          set({
            currentTrackIndex: prevIndex,
            currentTrack: tracks[prevIndex],
            isPlaying: true,
          });
        }
      },

      // ❤️ Favorites
      toggleFavorite: (track) => {
        const { favorites } = get();
        const exists = favorites.find((t) => t.id === track.id);
        if (exists) {
          set({ favorites: favorites.filter((t) => t.id !== track.id) });
        } else {
          set({ favorites: [...favorites, track] });
        }
      },

      // 🌦 Weather-based mood fetch
      fetchWeatherMood: async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/weather");
          const mood = res.data.mood || "chill";
          console.log("🎵 Weather-based mood:", mood);
          await get().fetchMusic(mood);
        } catch (error) {
          console.error("❌ Failed to fetch weather mood:", error);
        }
      },

      // 🎵 Music fetch
      fetchMusic: async (mood) => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/music?mood=${mood}`
          );
          if (res.data && res.data.length > 0) {
            set({
              tracks: res.data,
              currentTrack: res.data[0],
              currentTrackIndex: 0,
            });
            console.log(`✅ Loaded ${res.data.length} tracks for mood: ${mood}`);
          }
        } catch (error) {
          console.error("❌ Music fetch failed:", error);
        }
      },
    }),
    {
      name: "soundscape-storage", // localStorage key
      partialize: (state) => ({
        favorites: state.favorites,
        theme: state.theme,
      }),
    }
  )
);
