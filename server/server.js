// I din serverfil (t.ex. server.js)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Score from "./models/scoreModel.js";
import wordRoutes from "./word.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: "./server/.env" });
console.log("MONGO_URI:", process.env.MONGO_URI);

connectDB();

const app = express();
const PORT = process.env.PORT || 5080;

app.use(express.json());
app.use(cors());

// Existerande route för ord
app.use("/api/word", wordRoutes);

// Ställ in EJS som templatemotor
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// POST-Route: Skapa ett nytt highscore-objekt (nu med "time")
app.post("/api/scores", async (req, res) => {
  console.log("Received score data:", req.body); // Kontrollera vad som skickas in
  // Ta emot fälten: användarnamn, time och guesses
  const { username, time, guesses } = req.body;
  try {
    const newScore = new Score({ username, time, guesses });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (err) {
    console.error("Error when saving score:", err);
    res.status(500).json({ message: "Could not save your score", error: err.message });
  }
});

// GET-route: Returnera de bästa highscore (sorterade på tid, lägsta tid är bäst)
app.get("/api/scores", async (req, res) => {
  try {
    // Sortera på "time" i stigande ordning och begränsa till 5 resultat
    const scores = await Score.find().sort({ time: 1 }).limit(5);
    res.status(200).json(scores);
  } catch (err) {
    console.error("Error getting scores:", err.message);
    res.status(500).json({ message: "Could not get scores" });
  }
});

// SSR-route för highscore-sida med EJS
app.get("/highscore", async (req, res) => {
  try {
    const scores = await Score.find().sort({ time: 1 }).limit(5);
    res.render("highscore", { scores });
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).send("Error retrieving highscore");
  }
});

// Testroute för '/'
app.get("/", (req, res) => {
  res.send("Hello from express!");
});

app.listen(PORT, () => {
  console.log(`Served at http://localhost:${PORT}`);
});
