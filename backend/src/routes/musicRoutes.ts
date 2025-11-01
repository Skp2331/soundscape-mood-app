import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const mood = req.query.mood || "chill";

  try {
    const rapidApiKey = process.env.RAPIDAPI_KEY;
    const rapidApiHost = process.env.RAPIDAPI_HOST;

    console.log("🎧 Fetching from RapidAPI with host:", rapidApiHost);
    console.log("🔑 RAPIDAPI_KEY loaded:", !!rapidApiKey);

    if (!rapidApiKey || !rapidApiHost) {
      return res.status(500).json({ error: "Missing RapidAPI credentials" });
    }

    const response = await axios.get(
      `https://${rapidApiHost}/search?q=${mood}`,
      {
        headers: {
          "x-rapidapi-key": rapidApiKey,
          "x-rapidapi-host": rapidApiHost,
        },
      }
    );

    const tracks = response.data.data || [];
    console.log(`🎵 Found ${tracks.length} tracks for ${mood}`);

    res.json(tracks);
  } catch (error: any) {
    console.error("❌ Music fetch failed:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
