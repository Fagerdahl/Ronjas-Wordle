import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  guesses: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Score", scoreSchema);
