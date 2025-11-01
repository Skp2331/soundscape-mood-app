import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const lat = 12.9716; // default to Bangalore
    const lon = 77.5946;

    const apiKey = process.env.OPENWEATHER_API_KEY;
    console.log("🔍 Using API key:", apiKey);

    if (!apiKey) {
      return res.status(500).json({ error: "Missing OpenWeather API key" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const weather = response.data;

    const condition = weather.weather?.[0]?.main?.toLowerCase() || "clear";
    let mood = "calm";

    if (condition.includes("rain")) mood = "lofi";
    else if (condition.includes("cloud")) mood = "chill";
    else if (condition.includes("clear")) mood = "happy";
    else if (condition.includes("thunder")) mood = "party";
    else if (condition.includes("snow")) mood = "focus";

    res.json({ weather: condition, mood });
  } catch (error: any) {
    console.error("❌ Weather fetch failed:", error.message);
    res.status(500).json({
      error: "Failed to fetch weather data",
      details: error.message,
    });
  }
});

export default router;
