import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  guesses: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Score", ScoreSchema);
