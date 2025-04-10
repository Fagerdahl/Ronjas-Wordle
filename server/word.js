//Random word 
import express from "express";
import Word from "./models/wordModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const length = parseInt(req.query.length) || 5;
  try {
    const words = await Word.find({ length });
    if (!words || words.length === 0) {
      return res.json({ word: "apple" });
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    res.json({ word: words[randomIndex].word });
  } catch (err) {
    res.status(500).json({ message: "Error fetching word" });
  }
});

export default router;

