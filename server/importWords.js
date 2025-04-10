// server/routes/word.js
import express from "express";
import Word from "../models/wordModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const length = parseInt(req.query.length) || 5;

  try {
    // Använd aggregation för att slumpa ett ord med rätt längd
    const randomWordArray = await Word.aggregate([
      { $match: { length: length } },
      { $sample: { size: 1 } }
    ]);
    if (randomWordArray.length === 0) {
      return res.json({ word: "apple" });
    }
    res.json({ word: randomWordArray[0].word });
  } catch (err) {
    console.error("Error fetching word:", err);
    res.status(500).json({ message: "Error fetching word" });
  }
});

export default router;
