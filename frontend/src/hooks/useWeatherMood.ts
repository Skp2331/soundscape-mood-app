import { useEffect } from "react";
import { useSoundScapeStore } from "../store/useSoundScapeStore";

export const useWeatherMood = () => {
  const { fetchWeatherMood } = useSoundScapeStore();

  useEffect(() => {
    fetchWeatherMood();
  }, []);
};
