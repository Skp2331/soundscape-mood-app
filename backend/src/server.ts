import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weatherRoutes";
import musicRoutes from "./routes/musicRoutes";

dotenv.config();
console.log("🔑 OPENWEATHER_API_KEY:", process.env.OPENWEATHER_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/weather", weatherRoutes);
app.use("/api/music", musicRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
