🎵 SoundScape – Music Mood Explorer

A modern full-stack web app that recommends music based on your mood and weather.
Built for the SDE Intern (Frontend) 36-hour assessment challenge.

🚀 Features

🎧 Music Recommendations – powered by Deezer (via RapidAPI)

🌤 Weather-Aware Moods – detects your location’s weather and suggests playlists

❤️ Favorites System – save and view favorite tracks anytime

🌙 Light / Dark Mode Toggle

📱 Responsive Design – optimized for mobile and desktop with smooth transitions

⚡ State Management via Zustand

🌀 Smooth Animations using Framer Motion

🛠 Tech Stack
Layer	Technology
Frontend	React, TypeScript, TailwindCSS, Zustand, Framer Motion
Backend	Node.js, Express, TypeScript
APIs	OpenWeatherMap API, Deezer API (via RapidAPI)
Other Tools	Axios, Lucide Icons, Vite
⚙️ Setup Instructions
1️⃣ Clone the repository
git clone <your-repo-url>
cd soundscape

2️⃣ Setup the Backend
cd backend
npm install


Create a .env file inside /backend:

PORT=5000
OPENWEATHER_API_KEY=your_openweather_api_key
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=deezerdevs-deezer.p.rapidapi.com


Then run:

npm run dev


✅ You should see:

Server running on port 5000

3️⃣ Setup the Frontend
cd ../frontend
npm install
npm run dev


Visit → http://localhost:5173

🌈 How It Works

The app fetches your current weather using OpenWeather API.

It determines your mood (e.g., chill, happy, lofi, calm).

It fetches recommended tracks from Deezer API based on that mood.

You can play previews, mark favorites, and toggle themes.

🧠 Folder Structure
soundscape/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── weatherRoutes.ts
│   │   │   └── musicRoutes.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── store/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── README.md


⚡ Environment Variables

Variable	Description
PORT	Backend server port
OPENWEATHER_API_KEY	API key from OpenWeatherMap

RAPIDAPI_KEY	API key from RapidAPI – Deezer

RAPIDAPI_HOST	Default: deezerdevs-deezer.p.rapidapi.com

💡 Future Enhancements

🎵 Integrate Spotify API for full-length tracks

📍 Add manual location selection

🧠 Use AI-based sentiment analysis for mood detection

👨‍💻 Author

Som Kumar Pawar
📍 India
💼 Aspiring Full-Stack Developer

🏁 Conclusion

SoundScape is a sleek, responsive web app that merges music, mood, and weather to create a unique experience.
It showcases API integration, state management, and frontend excellence — ideal for a frontend SDE assessment submission.